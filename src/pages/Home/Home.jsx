import { NavLink } from "react-router-dom";
import css from "./Home.module.css";
import { meta } from "@eslint/js";

const Home = () => {
  const girlImg = new URL("../../images/girlImage.png", import.meta.url);
  const macBookImg = new URL("../../images/MacBook.png", import.meta.url);

  return (
    <section className={css.homePageContainer}>
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <div className={css.globalInfContainer}>
            <h1 className={css.header}>
              Unlock your potential with <br /> the best{" "}
              <span className={css.highlighted}>language</span> tutors
            </h1>
            <p>
              Embark on an Exciting Language Journey with Expert Language <br />
              Tutors: Elevate your language proficiency to new heights by
              <br />
              connecting with highly qualified and experienced tutors.
            </p>
            <NavLink to="/teachers" className={`${css.getStartBtn} btn`}>
              Get started
            </NavLink>
          </div>
          <div className={css.imageContainer}>
            <img
              style={{ position: "absolute", top: 80, left: 114 }}
              src={girlImg}
              alt="Girl image"
              width={339}
              height={339}
            />
            <img
              style={{ position: "absolute", left: 104, bottom: 0 }}
              src={macBookImg}
              alt="MacBook image"
              width={361}
              height={176}
            />
          </div>
        </div>

        <ul className={css.advantagesList}>
          <li className={css.advantagesItems}>
            <p className={css.quantity}>32,000 +</p>
            <p className={css.description}>Experienced tutors</p>
          </li>
          <li className={css.advantagesItems}>
            <p className={css.quantity}>300,000 +</p>
            <p className={css.description}>5-star tutor reviews</p>
          </li>
          <li className={css.advantagesItems}>
            <p className={css.quantity}>120 +</p>
            <p className={css.description}>Subjects taught</p>
          </li>
          <li className={css.advantagesItems}>
            <p className={css.quantity}>200 +</p>
            <p className={css.description}>Tutor nationalities</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Home;
