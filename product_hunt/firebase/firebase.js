import app from 'firebase/app';
import firebaseConfig from "./config";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig)
    }
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  // Creates an account
  async createAccount(name, email, password) {
    const newAccount = await this.auth.createUserWithEmailAndPassword(email, password);
    
    return await newAccount.user.updateProfile({
      displayName : name
    });
  }

  // LogIn
  async logIn(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  // Log off
  async signOut() {
    await this.auth.signOut();
  }
}

const firebase = new Firebase();

export default firebase;
