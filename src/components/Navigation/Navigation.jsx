import css from "./Navigation.module.css";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const Navigation = () => {
  const buildActiveLink = ({ isActive }) => {
    return clsx(isActive && css.isActive);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, []);

  return (
    <nav className={css.navContainer}>
      <NavLink className={buildActiveLink} to="/">
        Home
      </NavLink>
      <NavLink className={buildActiveLink} to="/teachers">
        Teachers
      </NavLink>
      {user && (
        <NavLink className={buildActiveLink} to="/favorites">
          Favorites
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
