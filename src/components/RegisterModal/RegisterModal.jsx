import React, { useEffect } from "react";
import Modal from "react-modal";
import * as yup from "yup";
import css from "./RegisterModal.module.css";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "../../firebase/firebase";
import toast from "react-hot-toast";

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

const RegisterModal = ({ isOpen, onRequestClose }) => {
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

  const onSubmit = async ({ name, email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });

      toast.success("Registered successfully!");
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
        <h2 className={css.title}>Registration</h2>
        <p className={css.description}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className={css.input}
            style={{ marginBottom: 18 }}
            placeholder="Name"
            {...register("name")}
          />

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
            Sign Up
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default RegisterModal;
