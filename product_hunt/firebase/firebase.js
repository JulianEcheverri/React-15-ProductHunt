import app from 'firebase/app';
import firebaseConfig from './config';

class Firebase {
    constructor(){
        // Initialize Firebase
        if (!app.getApps.length) {
            app.initializeApp(firebaseConfig);
        }
    }
}

const firebase = new Firebase();

export default firebase;