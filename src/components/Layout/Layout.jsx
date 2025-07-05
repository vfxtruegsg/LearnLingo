import Navigation from "../Navigation/Navigation.jsx";
import css from "./Layout.module.css";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.js";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import toast from "react-hot-toast";

const Layout = () => {
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Successfully logout!");

    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <header>
      <div className={`${css.layoutContainer} container`}>
        <div className={css.logoContainer}>
          <img src="/ukraine.svg" alt="LernLingo logo" width={28} height={28} />
          <h2 className={css.logo}>LearnLingo</h2>
        </div>
        <Navigation />
        <div className={css.buttonContainer}>
          {user ? (
            <button onClick={handleLogout} className={`${css.logoutBtn} btn`}>
              Log out
            </button>
          ) : (
            <>
              <button
                onClick={() => setLoginOpen(true)}
                className={`${css.logInBtn} btn`}
              >
                <img src="/logIn.svg" alt="Log In" width={20} height={20} />
                Log in
              </button>
              <LoginModal
                isOpen={loginOpen}
                onRequestClose={() => setLoginOpen(false)}
              />

              <button
                onClick={() => setRegisterOpen(true)}
                className={`${css.registerBtn} btn`}
              >
                Registration
              </button>
              <RegisterModal
                isOpen={registerOpen}
                onRequestClose={() => setRegisterOpen(false)}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Layout;
