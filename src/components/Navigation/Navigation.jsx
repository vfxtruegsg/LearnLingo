import css from "./Navigation.module.css";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const buildActiveLink = ({ isActive }) => {
    return clsx(isActive && css.isActive);
  };

  return (
    <nav className={css.navContainer}>
      <NavLink className={buildActiveLink} to="/">
        Home
      </NavLink>
      <NavLink className={buildActiveLink} to="/teachers">
        Teachers
      </NavLink>
    </nav>
  );
};

export default Navigation;
