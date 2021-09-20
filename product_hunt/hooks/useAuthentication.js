import React, { useEffect, useState } from "react";
// Firebase
import firebase from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function useAuthentication() {
    const [userAuth, setUserAuth] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserAuth(user);
            } else {
                setUserAuth(null);
            }
        });
        return () => unsuscribe();
    }, []);

    return userAuth;
}

export default useAuthentication;
