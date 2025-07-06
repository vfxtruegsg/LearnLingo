import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { auth } from "../../firebase/firebase";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import css from "./Favorites.module.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        toast.error("Please log in to view your favorites.");
        setFavorites([]);
        setIsLoading(false);
        return;
      }

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
        toast.error("Failed to load favorites.");
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRemoveFavorite = (teacherId) => {
    setFavorites((prev) => prev.filter((t) => t.id !== teacherId));
  };

  return isLoading ? (
    <Loader />
  ) : (
    <section style={{ padding: "32px 0", backgroundColor: "#f8f8f8" }}>
      <div className="container">
        {favorites.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: 18 }}>
            You have no favorite teachers yet.
          </p>
        ) : (
          <ul className={css.teacherList}>
            {favorites.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                data={teacher}
                onRemove={handleRemoveFavorite}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Favorites;
