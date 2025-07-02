import { CircleLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.wrapper}>
      <CircleLoader size={150} color="#f4c550" />
    </div>
  );
};

export default Loader;
