import axios from "axios";
import css from "./Teachers.module.css";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader.jsx";
import toast from "react-hot-toast";
import TeacherCard from "../../components/TeacherCard/TeacherCard.jsx";

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
        toast.error("Something went wrong! Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  console.log(teachersData);

  return isLoading ? (
    <Loader />
  ) : (
    <section>
      <div className="container">
        <ul>
          {teachersData.map((item, index) => (
            <TeacherCard key={index} data={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Teachers;
