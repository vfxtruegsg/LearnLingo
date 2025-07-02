import Navigation from "../Navigation/Navigation.jsx";
import css from "./Layout.module.css";

const Layout = () => {
  return (
    <header>
      <div className={`${css.layoutContainer} container`}>
        <div className={css.logoContainer}>
          <img src="/ukraine.svg" alt="LernLingo logo" width={28} height={28} />
          <h2 className={css.logo}>LearnLingo</h2>
        </div>
        <Navigation />
        <div className={css.buttonContainer}>
          <button className={`${css.logInBtn} btn`}>
            <img src="/logIn.svg" alt="Log In image" width={20} height={20} />
            Log in
          </button>

          <button className={`${css.registerBtn} btn`}>Registration</button>
        </div>
      </div>
    </header>
  );
};

export default Layout;
