import axios from "axios";
import css from "./Teachers.module.css";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader.jsx";
import toast from "react-hot-toast";
import TeacherCard from "../../components/TeacherCard/TeacherCard.jsx";

const Teachers = () => {
  const [allTeachers, setAllTeachers] = useState([]); // Все учителя
  const [visibleTeachers, setVisibleTeachers] = useState([]); // Видимые
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://learnlingo-7165b-default-rtdb.firebaseio.com/.json"
        );

        const data = response.data;

        if (Array.isArray(data)) {
          setAllTeachers(data);
          setVisibleTeachers(data.slice(0, 4));
        } else {
          toast.error("Данные с сервера некорректны.");
        }
      } catch (err) {
        console.error(err.message);
        toast.error("Ошибка при загрузке учителей.");
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
