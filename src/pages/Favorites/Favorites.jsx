import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { auth } from "../../firebase/firebase";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import css from "./Favorites.module.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = auth.currentUser;

      try {
        const db = getDatabase();
        const snapshot = await get(ref(db, `favorites/${user.uid}`));

        if (snapshot.exists()) {
          const data = snapshot.val();
          const favoritesArray = Object.values(data);
          setFavorites(favoritesArray);
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
        toast.error("Failed to load favorites");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  console.log(favorites);

  return (
    <section style={{ padding: "32px 0", backgroundColor: "#f8f8f8" }}>
      <div className="container">
        {isLoading ? (
          <Loader />
        ) : favorites.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: 18 }}>
            You have no favorites yet.
          </p>
        ) : (
          <ul className={css.teacherList}>
            {favorites.map((teacher, index) => (
              <TeacherCard key={index} data={teacher} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Favorites;
