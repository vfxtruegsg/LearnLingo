import { useState } from "react";
import css from "./TeacherCard.module.css";

const TeacherCard = ({ data }) => {
  const [showDetails, setShowDetails] = useState(false);

  const readMoreClick = () => {
    setShowDetails(true);
  };

  return (
    <li className={css.teacherListItem}>
      <div className={css.teacherImageContainer}>
        <img
          className={css.teacherImage}
          src={data.avatar_url}
          alt="Teacher avatar"
        />
        <img
          className={css.isOnlineImage}
          src="/isOnline.svg"
          alt="Is online indicator image"
          width={12}
          height={12}
        />
      </div>
      <div>
        <div className={css.firstInformation}>
          <p style={{ fontWeight: 500, color: "#8a8a89", marginRight: 192 }}>
            Languages
          </p>

          <ul className={css.languagesInfo}>
            <li>
              <img
                src="/bookOpen.svg"
                alt="Book image"
                width={16}
                height={16}
              />
              <p style={{ fontWeight: 500, lineHeight: 1 / 0.5 }}>
                Lessons online
              </p>
            </li>
            <li>
              <p style={{ fontWeight: 500, lineHeight: 1.5 }}>
                Lessons done: {data.lessons_done}
              </p>
            </li>
            <li>
              <img src="/star.svg" alt="Star image" width={16} height={16} />
              <p style={{ fontWeight: 500, lineHeight: 1.5 }}>
                Rating: {data.rating}
              </p>
            </li>
            <li>
              <p style={{ fontWeight: 500, lineHeight: 1.5 }}>
                Price / 1 hour:{" "}
                <span style={{ color: "#38cd3e" }}>{data.price_per_hour}$</span>
              </p>
            </li>
          </ul>

          <button>
            <img src="/heart.svg" alt="Heart image" width={26} height={26} />
          </button>
        </div>
        <h2 className={css.teacherName}>
          {data.name} {data.surname}
        </h2>
        <div style={{ marginBottom: 16 }}>
          <p>
            <span className={css.globInfType}>Speaks:</span>{" "}
            <span style={{ textDecoration: "underline" }}>
              {data.languages.join(", ")}
            </span>
          </p>
          <p>
            <span className={css.globInfType}>Lesson info:</span>{" "}
            {data.lesson_info}
          </p>
          <p>
            <span className={css.globInfType}>Conditions:</span>{" "}
            {data.conditions.map((item) => item)}
          </p>
        </div>

        {!showDetails && (
          <button onClick={readMoreClick} className={css.readMoreBtn}>
            Read more
          </button>
        )}

        {showDetails && (
          <p style={{ maxWidth: 968, marginBottom: 32 }}>{data.experience}</p>
        )}

        {showDetails && (
          <ul>
            {data.reviews.map((item, index) => (
              <li key={index} className={css.reviewItem}>
                <div className={css.reviewerInformation}>
                  <img
                    className={css.reviewerImage}
                    src={data.avatar_url}
                    alt="Teacher avatar"
                  />
                  <div>
                    <p style={{ color: "#8a8a89" }}>{item.reviewer_name}</p>
                    <div className={css.ratingBlock}>
                      <img
                        src="/star.svg"
                        alt="Star image"
                        width={16}
                        height={16}
                      />
                      <p>{item.reviewer_rating}.0</p>
                    </div>
                  </div>
                </div>
                <p style={{ fontWeight: "500" }}>{item.comment}</p>
              </li>
            ))}
          </ul>
        )}

        <div className={css.levelLangContainer}>
          {data.levels.map((item, index) => (
            <div key={index} className={css.levelLang}>
              #{item}
            </div>
          ))}
        </div>

        {showDetails && (
          <button className={css.bookTrialBtn}>Book trial lesson</button>
        )}
      </div>
    </li>
  );
};

export default TeacherCard;
