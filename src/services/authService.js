import firebase, { auth, firestore } from "../config/firebase.config";

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const signup = async ({ email, password }) => {
  return await auth.createUserWithEmailAndPassword(email, password);
};

export const signin = async ({ email, password }) =>
  await auth.signInWithEmailAndPassword(email, password);

export const signOut = async () => await auth.signOut();

export const forgotPassword = async ({ email }) =>
  await auth.sendPasswordResetEmail(email);

export const currentUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`/users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        photoURL: photoURL || "",
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating user", err);
    }
  }

  return userRef;
};
