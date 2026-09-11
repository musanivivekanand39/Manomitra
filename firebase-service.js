import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged, deleteUser } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';
import { getFirestore, doc, setDoc, addDoc, getDoc, getDocs, deleteDoc, collection, collectionGroup, query, where, orderBy, serverTimestamp, arrayUnion, increment } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';

const cfg=window.CARELOOP_FIREBASE_CONFIG||{};
const configured=cfg.apiKey&&!cfg.apiKey.startsWith('YOUR_');
let auth=null,db=null,currentProfile=null;
let resolveReady;const ready=new Promise(r=>resolveReady=r);
if(configured){
  const app=initializeApp(cfg);auth=getAuth(app);db=getFirestore(app);
  onAuthStateChanged(auth,async user=>{currentProfile=user?(await getDoc(doc(db,'users',user.uid))).data()||null:null;const detail={user,profile:currentProfile};resolveReady(detail);window.dispatchEvent(new CustomEvent('care-firebase-auth',{detail}))});
}else resolveReady({user:null,profile:null});
const must=()=>{if(!configured)throw new Error('Firebase is not configured yet. Add your web configuration to firebase-config.js.');};
const uid=()=>auth?.currentUser?.uid;
async function requireRole(role){must();if(!uid())throw new Error('Sign in again before making this change.');let snap=await getDoc(doc(db,'users',uid()));if(!snap.exists())throw new Error('This Authentication account has no Manomitra user profile. Sign out and create the account again.');let actual=snap.data().role;if(actual==='caregiver')actual='caretaker';if(actual==='health')actual='doctor';if(actual!==role)throw new Error(`This action requires a ${role} account. Current role: ${actual||'missing'}.`);currentProfile={...snap.data(),role:actual};return currentProfile}
async function signUp({email,password,name,role,caretakerId,inviteCode}){
  must();
  email=email.trim().toLowerCase();name=name.trim();inviteCode=inviteCode?.trim().toUpperCase();
  if(role==='patient'&&(!caretakerId||!inviteCode))throw new Error('Caretaker ID and patient invite code are required.');
  if(['relative','doctor'].includes(role)&&!inviteCode)throw new Error('A caretaker invite code is required.');
  let c;
  try{c=await createUserWithEmailAndPassword(auth,email,password)}
  catch(error){
    if(error.code!=='auth/email-already-in-use')throw error;
    c=await signInWithEmailAndPassword(auth,email,password);
    const existing=await getDoc(doc(db,'users',c.user.uid));
    if(existing.exists()){await signOut(auth);throw new Error('An account already exists for this email. Use Login instead.')}
  }
  try{
    let invite=null,inviteRef=null;
    if(role==='patient'){
      inviteRef=doc(db,'patientInvites',inviteCode.trim().toUpperCase());const s=await getDoc(inviteRef);
      if(!s.exists()||s.data().caretakerId!==caretakerId.trim()||s.data().status!=='available')throw new Error('The caretaker ID or patient invite code is invalid.');invite=s.data();
    }
    if(['relative','doctor'].includes(role)){
      inviteRef=doc(db,'relativeInvites',inviteCode);const s=await getDoc(inviteRef);
      if(!s.exists())throw new Error('This caretaker invite code does not exist. Check every letter and number.');invite=s.data();
      if(invite.status!=='available')throw new Error('This caretaker invite code has already been used or cancelled. Ask the caretaker for a new code.');
      if(invite.memberRole&&invite.memberRole!==role)throw new Error(`This code is for a ${invite.memberRole} account, not a ${role} account.`);
      if(!invite.patientId||!invite.caretakerId)throw new Error('This invitation is incomplete. Ask the caretaker to create a new invitation.');
      if(invite.email&&invite.email.trim().toLowerCase()!==email)throw new Error(`Use the invited email address: ${invite.email}`);
    }
    const profile={name,email,role,createdAt:serverTimestamp()};
    if(role==='patient'){
      profile.caretakerId=invite.caretakerId;profile.patientDraftId=invite.patientDraftId;
      await setDoc(doc(db,'users',c.user.uid),profile);
      await setDoc(doc(db,'careLinks',`${c.user.uid}_${invite.caretakerId}`),{patientId:c.user.uid,memberId:invite.caretakerId,memberRole:'caretaker',status:'active',createdAt:serverTimestamp()});
      await setDoc(doc(db,'patientProfiles',invite.patientDraftId),{patientId:c.user.uid,status:'active'},{merge:true});
      await setDoc(inviteRef,{status:'claimed',claimedBy:c.user.uid,claimedAt:serverTimestamp()},{merge:true});
    } else if(['relative','doctor'].includes(role)){
      profile.patientId=invite.patientId;profile.caretakerId=invite.caretakerId;profile.inviteCode=inviteCode;
      await setDoc(doc(db,'users',c.user.uid),profile);
      await setDoc(doc(db,'careLinks',`${invite.patientId}_${c.user.uid}`),{patientId:invite.patientId,memberId:c.user.uid,caretakerId:invite.caretakerId,memberName:name,memberEmail:email,memberRole:role,status:'active',inviteCode,createdAt:serverTimestamp()});
      await setDoc(inviteRef,{status:'claimed',claimedBy:c.user.uid,claimedAt:serverTimestamp()},{merge:true});
    } else await setDoc(doc(db,'users',c.user.uid),profile);
    currentProfile={...profile,createdAt:null};return {user:c.user,profile:currentProfile};
  }catch(error){await deleteUser(c.user).catch(()=>{});throw error}
}
async function signIn(email,password){must();const c=await signInWithEmailAndPassword(auth,email,password),snap=await getDoc(doc(db,'users',c.user.uid));if(!snap.exists()){await signOut(auth);throw new Error('This login exists in Authentication but has no Manomitra profile in Firestore. Create a new account in Manomitra.')}currentProfile=snap.data();if(currentProfile.role==='caregiver'||currentProfile.role==='health'){currentProfile.role=currentProfile.role==='caregiver'?'caretaker':'doctor';await setDoc(doc(db,'users',c.user.uid),{role:currentProfile.role},{merge:true})}return {user:c.user,profile:currentProfile}}
async function savePatientRecord(kind,data,patientId=uid()){must();if(!patientId)throw new Error('Sign in first');return addDoc(collection(db,'patients',patientId,kind),{...data,patientId,createdAt:serverTimestamp()})}
async function linkedPatientIds(){must();let ids=[];const snap=await getDocs(query(collection(db,'careLinks'),where('memberId','==',uid()),where('status','==','active')));snap.forEach(d=>ids.push(d.data().patientId));return ids}
async function loadReports(patientId){must();const snap=await getDoc(doc(db,'patients',patientId,'gameReports','summary'));if(!snap.exists())return [];const data=snap.data();return data.sessions||[data.lastSession||data]}
async function loadAssessments(patientId){must();const snap=await getDocs(query(collection(db,'patients',patientId,'assessments'),orderBy('createdAt','desc')));return snap.docs.map(d=>({id:d.id,...d.data()}))}
async function loadChat(patientId){must();const snap=await getDocs(query(collection(db,'patients',patientId,'chatHistory'),orderBy('createdAt','asc')));return snap.docs.map(d=>({id:d.id,...d.data()}))}
async function loadPatientNotifications(patientId){must();const [snap,conversationSnap]=await Promise.all([getDocs(query(collection(db,'patients',patientId,'notifications'),orderBy('createdAt','desc'))),getDoc(doc(db,'patients',patientId,'private','conversation'))]);const conversation=conversationSnap.exists()?conversationSnap.data():{},readIds=conversation.readMessageIds||[],patientMessages=snap.docs.map(d=>({id:d.id,...d.data(),read:d.data().read===true||readIds.includes(d.id)})),replies=(conversation.replies||[]).map((reply,index)=>({id:reply.id||`reply-${index}`,...reply,senderRole:'caretaker',read:true}));return [...patientMessages,...replies].sort((a,b)=>String(b.timestamp||'').localeCompare(String(a.timestamp||'')))}
async function replyToPatient(patientId,message){await requireRole('caretaker');const items=await loadPatientNotifications(patientId),unreadIds=items.filter(item=>item.senderRole!=='caretaker'&&item.read!==true&&!String(item.id).startsWith('reply-')).map(item=>item.id),reply={id:`reply-${Date.now()}`,patientId,message:message.trim(),senderRole:'caretaker',read:true,timestamp:new Date().toISOString()};const update={replies:arrayUnion(reply),updatedAt:serverTimestamp()};if(unreadIds.length)update.readMessageIds=arrayUnion(...unreadIds);return setDoc(doc(db,'patients',patientId,'private','conversation'),update,{merge:true})}
async function loadPatientProfile(patientId){must();const snap=await getDocs(query(collection(db,'patientProfiles'),where('patientId','==',patientId)));return snap.empty?null:{id:snap.docs[0].id,...snap.docs[0].data()}}
async function linkedPatientProfiles(){const ids=await linkedPatientIds(),profiles=await Promise.all(ids.map(loadPatientProfile));return profiles.filter(Boolean)}
async function loadEmergency(patientId){must();const snap=await getDoc(doc(db,'patients',patientId,'private','emergency'));return snap.exists()?snap.data():null}
async function deleteChat(patientId,chatId){must();if(currentProfile?.role!=='caretaker')throw new Error('Only the patient’s caretaker can delete chat history.');await deleteDoc(doc(db,'patients',patientId,'chatHistory',chatId))}
async function patientLinks(){must();const snap=await getDocs(query(collection(db,'careLinks'),where('patientId','==',uid())));return snap.docs.map(d=>({id:d.id,...d.data()}))}
async function approveLink(id,approved=true){must();await setDoc(doc(db,'careLinks',id),{status:approved?'active':'rejected',reviewedAt:serverTimestamp()},{merge:true})}
async function createPatientProfile(data){await requireRole('caretaker');const photoUrl=data.photoData||data.defaultAvatar||'default-profile-woman.svg',draft=await addDoc(collection(db,'patientProfiles'),{...data,photoData:null,photoUrl,caretakerId:uid(),status:'awaiting_patient_signup',createdAt:serverTimestamp()}),code=`PAT-${draft.id.slice(0,6).toUpperCase()}`;await setDoc(doc(db,'patientProfiles',draft.id),{inviteCode:code},{merge:true});await setDoc(doc(db,'patientInvites',code),{patientDraftId:draft.id,caretakerId:uid(),status:'available',createdAt:serverTimestamp()});return {id:draft.id,code,caretakerId:uid(),photoUrl}}
async function caretakerPatients(){await requireRole('caretaker');const snap=await getDocs(query(collection(db,'patientProfiles'),where('caretakerId','==',uid())));return snap.docs.map(d=>({id:d.id,...d.data()}))}
async function createRelativeInvite(patientId,name,email,memberRole='relative'){await requireRole('caretaker');let prefix=memberRole==='doctor'?'DOC':'REL',code=`${prefix}-${Math.random().toString(36).slice(2,8).toUpperCase()}`;await setDoc(doc(db,'relativeInvites',code),{patientId,caretakerId:uid(),name,email,memberRole,status:'available',createdAt:serverTimestamp()});return code}
async function savePatientSettings(patientId,data){must();return setDoc(doc(db,'patients',patientId,'private','settings'),{...data,updatedBy:uid(),updatedAt:serverTimestamp()},{merge:true})}
async function loadOwnPatientProfile(){must();let profile=currentProfile||(await getDoc(doc(db,'users',uid()))).data();if(!profile?.patientDraftId)return null;let snap=await getDoc(doc(db,'patientProfiles',profile.patientDraftId));return snap.exists()?{id:snap.id,...snap.data()}:null}
window.CareFirebase={configured,ready,get user(){return auth?.currentUser},get profile(){return currentProfile},signUp,signIn,signOut:()=>{must();return signOut(auth)},resetPassword:e=>{must();return sendPasswordResetEmail(auth,e)},createPatientProfile,caretakerPatients,createRelativeInvite,savePatientSettings,loadOwnPatientProfile,loadPatientProfile,linkedPatientProfiles,saveGame:d=>{must();return setDoc(doc(db,'patients',uid(),'gameReports','summary'),{patientId:uid(),sessions:arrayUnion(d),sessionCount:increment(1),lastSession:d,updatedAt:serverTimestamp()},{merge:true})},saveAssessment:d=>savePatientRecord('assessments',d),saveNotification:d=>savePatientRecord('notifications',d),saveEmergency:(d,patientId=uid())=>{must();return setDoc(doc(db,'patients',patientId,'private','emergency'),{...d,updatedAt:serverTimestamp()},{merge:true})},saveStory:(d,patientId=uid())=>savePatientRecord('stories',d,patientId),saveChat:d=>savePatientRecord('chatHistory',d),linkedPatientIds,loadReports,loadAssessments,loadChat,loadPatientNotifications,replyToPatient,loadEmergency,deleteChat,patientLinks,approveLink};
