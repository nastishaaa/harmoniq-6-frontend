import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import * as Yup from "yup";
import { useState } from "react";
import EyeIcon from "../../assets/icons/EyeOffIcon.svg";
import EyeOffIcon from "../../assets/icons/EyeIcon.svg";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../redux/register/slice.js";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Too short!")
    .max(32, "Too long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email format")
    .min(5, "Too short!")
    .max(64, "Too long!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Too short!")
    .max(64, "Too long!")
    .matches(
      /^(?=.*[A-Z])(?=.*\d).{6,18}$/,
      "Password must be 6-18 characters, with at least one capital letter and one number"
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirm = () => setShowConfirm((prev) => !prev);
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    const { name, email, password } = values;

    dispatch(setUserData({ name, email, password }));
    resetForm();
    navigate("/photo");

    // if (registerThunk.fulfilled.match(resultAction)) {
    //   toast.success("Registration successful!");

    //   console.log("Форма відправлена успішно! Дані:", values);
    // } else {
    //   toast.error(
    //     resultAction.payload || "Something went wrong during registration."
    //   );
    // }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form autoComplete="off" className={styles.form}>
          <div className={styles.inputbox}>
            <label htmlFor="name" className={styles.label}>
              Enter your name
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              className={`${styles.field} ${
                errors.name && touched.name ? styles.errorField : ""
              }`}
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.inputbox}>
            <label htmlFor="email" className={styles.label}>
              Enter your email address
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="email@gmail.com"
              className={`${styles.field} ${
                errors.name && touched.name ? styles.errorField : ""
              }`}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.inputbox}>
            <label htmlFor="password" className={styles.label}>
              Create a strong password
            </label>
            <div className={styles.inputWrapper}>
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="*********"
                className={`${styles.field} ${
                  errors.name && touched.name ? styles.errorField : ""
                }`}
              />
              <button
                type="button"
                onClick={togglePassword}
                className={styles.eyeButton}
                aria-label="Toggle password visibility"
              >
                <img
                  src={showPassword ? EyeOffIcon : EyeIcon}
                  alt="Toggle password visibility"
                  className={styles.eyeIcon}
                />
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.inputbox}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Repeat your password
            </label>
            <div className={styles.inputWrapper}>
              <Field
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="*********"
                className={`${styles.field} ${
                  errors.name && touched.name ? styles.errorField : ""
                }`}
              />
              <button
                type="button"
                onClick={toggleConfirm}
                className={styles.eyeButton}
                aria-label="Toggle password visibility"
              >
                <img
                  src={showConfirm ? EyeOffIcon : EyeIcon}
                  alt="Toggle password visibility"
                  className={styles.eyeIcon}
                />
              </button>
            </div>
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className={styles.error}
            />
          </div>

          <button type="submit" className={styles.button}>
            Register
          </button>

          <span className={styles.linkbox}>
            Already have an account?
            <Link to="/login" className={styles.link}>
              Log In!
            </Link>
          </span>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
