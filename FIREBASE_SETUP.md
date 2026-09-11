# CareLoop Firebase setup

1. In Firebase Console, add a Web app and copy its configuration into `firebase-config.js`.
2. Enable **Authentication → Sign-in method → Email/Password**.
3. Create a Cloud Firestore database.
4. Publish `firestore.rules` from the Firebase console, or run `firebase deploy --only firestore:rules` after configuring Firebase CLI.
5. Serve the app through HTTP(S); Firebase Auth does not work reliably from `file://`.

## Roles and collections

- `users/{uid}`: account profile with `patient`, `caretaker`, `relative`, or `doctor` role.
- `careLinks/{patientId_memberId}`: links a caretaker, relative, or doctor to a patient. A patient must approve the link by setting `status` to `active`.
- `patients/{patientId}/gameReports`: score, accuracy, duration, level, attempts, hints, completion, and timestamp.
- `patients/{patientId}/assessments`: the nine randomized questions, answers, categories, score, and timestamp.
- `patients/{patientId}/chatHistory`: patient/AI messages. Only an actively linked caretaker can delete these records.
- `patients/{patientId}/stories`: readable patient stories.
- `patients/{patientId}/private/emergency`: emergency contacts, medical notes, allergies, blood group, and preferred hospital.
- `questionBank`: optional server-managed question bank. The app includes 30 offline questions in `question-bank.js`.

## Caretaker-led account flow

1. A caretaker signs up first and creates a patient dashboard.
2. CareLoop generates a caretaker ID and one-time `PAT-` invite code.
3. The patient signs up with both values; this activates the caretaker-patient link.
4. After the patient has registered, the caretaker creates `REL-` relative invitations or `DOC-` doctor invitations.
5. The relative or doctor signs up with that invitation and receives access only to the linked patient.

Patient photographs are compressed to a small profile image and saved with the Firestore patient profile. Firebase Storage is not required for the current implementation. `storage.rules` therefore keeps Storage locked.

The API key in a Firebase web configuration is not an administrator secret. Access is protected by Authentication and the included Firestore rules. Never add a service-account private key to this frontend.
