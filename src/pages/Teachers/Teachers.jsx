import axios from "axios";
import css from "./Teachers.module.css";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader.jsx";

const Teachers = () => {
  const [teachersData, setTeachersData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://learnlingo-7165b-default-rtdb.firebaseio.com/.json"
        );

        setTeachersData(response.data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <section>
      <div className="container"></div>
    </section>
  );
};

export default Teachers;
