import css from "./Teachers.module.css";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader.jsx";
import toast from "react-hot-toast";
import TeacherCard from "../../components/TeacherCard/TeacherCard.jsx";
import { getDatabase, ref, get } from "firebase/database";

const Teachers = () => {
  const [allTeachers, setAllTeachers] = useState([]);
  const [visibleTeachers, setVisibleTeachers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setIsLoading(true);

        const db = getDatabase();
        const teachersRef = ref(db, "teachers");
        const snapshot = await get(teachersRef);

        if (snapshot.exists()) {
          const data = snapshot.val();

          const array = Array.isArray(data) ? data : Object.values(data);

          setAllTeachers(array);
          setVisibleTeachers(array.slice(0, 4));
        } else {
          toast.error("You currently have no teachers saved.");
        }
      } catch (error) {
        console.error("Error loading teachers:", error);
        toast.error("Something went wrong...");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleLoadMore = () => {
    const nextCount = visibleCount + 4;
    setVisibleTeachers(allTeachers.slice(0, nextCount));
    setVisibleCount(nextCount);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <section style={{ backgroundColor: "#f8f8f8", padding: "32px 0" }}>
      <div className="container">
        <ul className={css.teacherList}>
          {visibleTeachers.map((teacher, index) => (
            <TeacherCard key={index} data={teacher} />
          ))}
        </ul>

        {visibleCount < allTeachers.length && (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button onClick={handleLoadMore} className={css.loadMoreButton}>
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Teachers;
