import React, { useEffect } from "react";
import Modal from "react-modal";
import * as yup from "yup";
import css from "./LoginModal.module.css";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "../../firebase/firebase";
import toast from "react-hot-toast";

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const LoginModal = ({ isOpen, onRequestClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("noScroll");
    } else {
      document.documentElement.classList.remove("noScroll");
    }

    return () => {
      document.documentElement.classList.remove("noScroll");
    };
  }, [isOpen]);

  const onSubmit = async ({ email, password }) => {
    try {
      if (errors.email?.message) return toast.error(errors.email?.message);

      if (errors.password?.message)
        return toast.error(errors.password?.message);

      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Logged in!");

      onRequestClose();

      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong, please try again later!");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div className={css.container}>
        <button onClick={onRequestClose} className={css.close}>
          <img src="/x.svg" alt="Close modal image" width={32} height={32} />
        </button>
        <h2 className={css.title}>Log In</h2>
        <p className={css.description}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 24 }}>
          <input
            className={css.input}
            style={{ marginBottom: 18 }}
            placeholder="Email"
            {...register("email")}
          />

          <input
            className={css.input}
            style={{ marginBottom: 40 }}
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {/* <p className={css.error}>{errors.password?.message}</p> */}

          <button className={css.button} type="submit">
            Log In
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;
