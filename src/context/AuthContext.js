import { useEffect, useState, useContext, createContext } from "react";
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { auth } from "../FirebaseConfig";

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
    }
    const register = (email, password, name, bornday, carnet, image) => {
        createUserWithEmailAndPassword(email, password)
    }
    const logout = () => {
        signOut(auth)
    }

    return (
        <AuthContext.Provider value={(user, loading, login, register, logout)}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);