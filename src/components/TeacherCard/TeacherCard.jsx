import css from "./TeacherCard.module.css";

const TeacherCard = ({ data }) => {
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
          <div>
            <p style={{ fontWeight: 500, color: "#8a8a89", marginBottom: 8 }}>
              Languages
            </p>
            <h2 style={{ fontSize: 24, lineHeight: 1 }}>
              {data.name} {data.surname}
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
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
                  <span style={{ color: "#38cd3e" }}>
                    {data.price_per_hour}$
                  </span>
                </p>
              </li>
            </ul>
            <button>
              <img src="/heart.svg" alt="Heart image" width={26} height={26} />
            </button>
          </div>
        </div>
        <div>
          <p>Speaks: {data.languages.map((item) => item)}</p>
          <p>Lesson info: {data.lesson_info}</p>
          <p>Conditions: {data.conditions.map((item) => item)}</p>
          <button>Read more</button>
        </div>
        <div className={css.levelLangContainer}>
          {data.levels.map((item, index) => (
            <div key={index} className={css.levelLangBtn}>
              #{item}
            </div>
          ))}
        </div>
      </div>
    </li>
  );
};

export default TeacherCard;
