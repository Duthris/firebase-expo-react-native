import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
    sendEmailVerification,
    sendPasswordResetEmail,
} from 'firebase/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getFirestore, collection, doc, set } from 'firebase/firestore';
import store from "./store";
import { logout as logoutHandle } from './store/auth';
import { setUserData, showToast } from "./constants/utils";
import { openModal } from "./store/modal";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from "@env";
import * as Localization from 'expo-localization';

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.languageCode = Localization.locale.slice(0, 2);
export const db = getFirestore(app);
export const storage = getStorage(app);


export const register = async (displayName, email, password) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, {
            displayName
        });
        showToast('You have successfully signed up!', 'success', 'top');
        return user;
    } catch (error) {
        switch (error.code) {
            case 'auth/email-already-in-use':
                showToast('Email already in use!', 'error', 'top');
                break;
            case 'auth/invalid-email':
                showToast('Invalid mail format!', 'error', 'top');
                break;
            case 'auth/weak-password':
                showToast('Password must be longer than 6 characters!', 'error', 'top');
                break;
            default:
                showToast(error.message.slice(10), 'error', 'top');
                console.log(error.message);
                break;
        }
    }
}

export const login = async (email, password) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        showToast(`Welcome ${user.displayName}!`, 'success', 'top');
        return user;
    } catch (error) {
        switch (error.code) {
            case 'auth/user-not-found':
                showToast('A user with this email does not exist!', 'error', 'top');
                break;
            case 'auth/wrong-password':
                showToast('Wrong password!', 'error', 'top');
                break;
            case 'auth/invalid-email':
                showToast('Invalid Email!', 'error', 'top');
                break;
            case 'auth/user-disabled':
                showToast('Your account has been disabled!', 'error', 'top');
                break;
            default:
                showToast(error.message.slice(10), 'error', 'top');
                break;

        }
    }
}

export const logout = async () => {
    try {
        await signOut(auth);
        showToast('You have successfully logged out!', 'success', 'top');
        return true;
    } catch (error) {
        showToast(error.message.slice(10), 'error', 'top');
    }
}

export const update = async (data) => {
    try {
        await updateProfile(auth.currentUser, data);
        auth.currentUser.reload();
        showToast('Your profile has been updated!', 'success', 'top');
    } catch (error) {
        switch (error.code) {
            case 'auth/requires-recent-login':
                showToast('You must have recently signed in to update your profile!', 'error', 'top');
                break;
            default:
                showToast(error.message.slice(10), 'error', 'top');
                break;
        }
    }
}

export const updatePass = async (password) => {
    try {
        await updatePassword(auth.currentUser, password);
        showToast('Your password has been updated!', 'success', 'top');
    } catch (error) {
        switch (error.code) {
            case 'auth/requires-recent-login':
                showToast('You must have recently signed in!', 'error', 'top');
                setTimeout(() => {
                    store.dispatch(openModal({
                        name: 're-auth-modal'
                    }));
                }, 700);
                break;
            default:
                showToast(error.message.slice(10), 'error', 'top');
                break;
        }
    }
}

export const reAuth = async (password) => {
    try {
        const credential = await EmailAuthProvider.credential(auth.currentUser.email, password);
        const { user } = await reauthenticateWithCredential(auth.currentUser, credential);
        showToast('Re-authentication is successfull!', 'success', 'top');
        return user;
    } catch (error) {
        switch (error.code) {
            case 'auth/wrong-password':
                showToast('Wrong password!', 'error', 'top');
                break;
            default:
                showToast(error.message.slice(10), 'error', 'top');
                break;
        }
    }
}

export const verify = async () => {
    try {
        await sendEmailVerification(auth.currentUser);
        showToast(`Verification email sent to ${auth.currentUser.email}!`, 'success', 'top');
        console.log(auth.useDeviceLanguage());
    } catch (error) {
        showToast(error.message.slice(10), 'error', 'top');
    }
}

export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        showToast(`Password reset email sent to ${email}!`, 'success', 'top');
        return true;
    } catch (error) {
        switch (error.code) {
            case 'auth/invalid-email':
                showToast('Invalid Email!', 'error', 'top');
                break;
            default:
                showToast(error.message.slice(10), 'error', 'top');
                break;
        }
    }
}

export const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `images/${imageName}`);
    uploadBytes(storageRef, blob);
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        setUserData();
    } else {
        store.dispatch(logoutHandle());
    }
})

export default app;