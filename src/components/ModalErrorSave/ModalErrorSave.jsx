import clsx from "clsx";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalErrorSaveOpen } from "../../redux/global/slice";
import { isModalErrorSaveOpen } from "../../redux/global/selectors";

import styles from "./ModalErrorSave.module.css";

export const ModalErrorSave = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(isModalErrorSaveOpen);

  const bodySelector = document.querySelector("body");

  isModalOpen
    ? (bodySelector.style.overflow = "hidden")
    : (bodySelector.style.overflow = "auto");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch(setIsModalErrorSaveOpen(false));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      dispatch(setIsModalErrorSaveOpen(false));
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return createPortal(
    <div
      className={clsx(styles.wrapper, isModalOpen && styles.wrapperOpen)}
      onClick={() => dispatch(setIsModalErrorSaveOpen(false))}
    >
      <div
        className={clsx(styles.modal, isModalOpen && styles.modalOpen)}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          onClick={() => dispatch(setIsModalErrorSaveOpen(false))}
        >
          <img src="src/assets/icons/close.svg" alt="Close icon" />
        </button> 
        <p className={styles.title}>Error while saving</p>
        <p className={styles.caption}>
          To save this article, you need to authorize first
        </p>
        <div className={styles.buttonsContainer}>
          <Link
            to={"/login"}
            className={clsx(styles.button, styles.buttonLogin)}
          >
            Login
          </Link>
          <Link
            to={"/register"}
            className={clsx(styles.button, styles.buttonRegister)}
          >
            Register
          </Link>
        </div>
      </div>
    </div>,
    document.getElementById("modals")
  );
};
