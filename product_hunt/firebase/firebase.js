import firebaseConfig from './config';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from 'firebase/app';

// Add the Firebase products that you want to use
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// see= https://firebase.google.com/docs/auth/web/password-auth#web-v9

class Firebase {

    constructor() {
       // Initialize Firebase
       this.firebaseApp = initializeApp(firebaseConfig);
       this.auth = getAuth();
    }

    // Creates an account
    async createAccount(name, email, password) {
        const newAccount = await createUserWithEmailAndPassword(this.auth, email, password);
        return await updateProfile(this.auth.currentUser, {
            displayName: name,
        });
    }
}

const firebase = new Firebase();

export default firebase;