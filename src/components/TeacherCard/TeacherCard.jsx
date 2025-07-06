import css from "./TeacherCard.module.css";
import BookingModal from "../BookingModal/BookingModal.jsx";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.js";
import toast from "react-hot-toast";
import { getDatabase, ref, set, remove, get } from "firebase/database";

const TeacherCard = ({ data, onRemove }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const teacherKey = data.id
    ? data.id
    : `${data.name}_${data.surname}`.toLowerCase().replace(/\s/g, "_");

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const db = getDatabase();
        const snapshot = await get(
          ref(db, `favorites/${user.uid}/${teacherKey}`)
        );
        if (snapshot.exists()) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkFavoriteStatus();
  }, [teacherKey]);

  const handleToggleFavorite = async () => {
    const user = auth.currentUser;

    if (!user) {
      toast.error("Please log in to your account!");
      return;
    }

    const db = getDatabase();
    const favoriteRef = ref(db, `favorites/${user.uid}/${teacherKey}`);

    try {
      if (isFavorite) {
        await remove(favoriteRef);
        setIsFavorite(false);
        toast.success("Removed from favorites");

        if (onRemove) onRemove(teacherKey);
      } else {
        const teacherToSave = {
          id: teacherKey,
          name: data.name,
          surname: data.surname,
          avatar_url: data.avatar_url,
          rating: data.rating,
          price_per_hour: data.price_per_hour,
          languages: data.languages,
          conditions: data.conditions,
          reviews: data.reviews,
          levels: data.levels,
        };

        await set(favoriteRef, teacherToSave);
        setIsFavorite(true);
        toast.success("Added to favorites");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const bookTrialModal = async () => {
    const user = auth.currentUser;

    if (!user) {
      toast.error("Please log in to your account!");
      return;
    }

    setIsOpen(true);
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
              <img src="/bookOpen.svg" alt="Book" width={16} height={16} />
              <p>Lessons online</p>
            </li>
            <li>
              <p>Lessons done: {data.lessons_done}</p>
            </li>
            <li>
              <img src="/star.svg" alt="Star" width={16} height={16} />
              <p>Rating: {data.rating}</p>
            </li>
            <li>
              <p>
                Price / 1 hour:{" "}
                <span style={{ color: "#38cd3e" }}>{data.price_per_hour}$</span>
              </p>
            </li>
          </ul>

          <button onClick={handleToggleFavorite}>
            <img
              src={isFavorite ? "/likeHeart.svg" : "/heart.svg"}
              alt="Favorite"
              width={26}
              height={26}
            />
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
          <button
            onClick={() => setShowDetails(true)}
            className={css.readMoreBtn}
          >
            Read more
          </button>
        )}

        {showDetails && (
          <>
            <p style={{ maxWidth: 968, marginBottom: 32 }}>{data.experience}</p>

            <ul>
              {data.reviews.map((item, index) => (
                <li key={index} className={css.reviewItem}>
                  <div className={css.reviewerInformation}>
                    <img
                      className={css.reviewerImage}
                      src={data.avatar_url}
                      alt="Reviewer avatar"
                    />
                    <div>
                      <p style={{ color: "#8a8a89" }}>{item.reviewer_name}</p>
                      <div className={css.ratingBlock}>
                        <img
                          src="/star.svg"
                          alt="Star"
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

            <div className={css.levelLangContainer}>
              {data.levels.map((item, index) => (
                <div key={index} className={css.levelLang}>
                  #{item}
                </div>
              ))}
            </div>

            <button onClick={bookTrialModal} className={css.bookTrialBtn}>
              Book trial lesson
            </button>
          </>
        )}

        <BookingModal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          teacher={data}
        />
      </div>
    </li>
  );
};

export default TeacherCard;
