
import * as Yup from "yup";
import clsx from "clsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations.js"; 

import css from "./LoginForm.module.css";

import { Eye, EyeClosed } from "./icons.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Too Short!At least 8 characters').max(20, 'Too Long!').required('Required'),
  });


  
export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); //to redirectafter login
  const [passwordEye, setPasswordEye] = useState(false);

  const handlePasswordClick = () => {
    setPasswordEye((prev) => !prev);
  };

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(login(values)).unwrap();
      actions.resetForm();
      navigate("/");
    } catch (error) {
      console.error(error);
      // const errorMessage = () => toast("Login");
        const errorMessage = error?.response?.data?.message || error.message || "Login failed";

      // shows the same message for both fields
      actions.setFieldError("email", errorMessage);
      actions.setFieldError("password", errorMessage);

      // makes fields "touched" to make the frame red
      actions.setTouched({ email: true, password: true }, false);
      toast.error(errorMessage);
    }
  };

return (
  <div className={css.containerLoginForm}>
    <h2 className={css.loginHeader}>Login</h2>
    <Formik validationSchema={loginSchema} initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
      <Form className={css.formLoginForm} autoComplete='off'>
        
        <label className={css.labelLoginForm}>Enter your email address
           <Field name="email">
              {({ field, meta }) => (
                <>
                  <input
                    {...field}
                    type="email"
                    placeholder="email@gmail.com"
                    className={clsx(
                      css.fieldLoginForm,
                      meta.touched && meta.error && css.errorInput
                    )}
                  />
                  <div className={css.errorFixed}>
                    {meta.touched && meta.error ? meta.error : "\u00A0"}
                  </div>
                </>
              )}
          </Field>
            </label>
          
          <label htmlFor='password' className={css.labelLoginForm}>  Enter a password
          <div className={css.label}>
              <Field name="password">
                {({ field, meta }) => (
                  <>
                    <input
                      {...field}
                      type={passwordEye ? "text" : "password"}
                      placeholder="*********"
                      className={clsx(
                        css.fieldLoginForm,
                        meta.touched && meta.error && css.errorInput
                      )}
                  />
                  {/* we keep the height of the block to avoid "jumping" "\u00A0" */}
                    <div className={css.errorFixed}>
                      {meta.touched && meta.error ? meta.error : "\u00A0"}
                    </div>
                  </>
                )}
              </Field>
             <button
              type="button"
              className={css.eyeButton}
                onClick={handlePasswordClick}
                aria-label={passwordEye ? "Hide password" : "Show password"}
            >
                {passwordEye ? <Eye /> : <EyeClosed />}
            </button>
             </div>
        </label>
          <button type="submit" className={css.loginButton}>
            Login
          </button>
        </Form>
    </Formik>
      <p className={css.descriptionRedirect}>
      Don't have an account? 
      <NavLink className={css.linkRedirect} to="/register">
      Register
      </NavLink>  
       {/* <CreateLink
          className={css.linkRedirect}
          text="Register"
          to="/api/auth/register"
        /> */}
    </p>
     </div>
  );
}



 	// TO do:

// -how to make it send to backend?
// adaptive design
  

// По результату валідації:
// - у разі наявності помилок валідації - біля відповідних полів форми потрібно вивести повідомлення з суттю помилки і заблокувати відправку запиту з форми на backend.
// - у разі, якщо всі значення валідні, - дані слід відправити на backend.
// - якщо backend повернув помилку - необхідно її обробити і відобразити користувачеві у вигляді пуш-повідомлення.
// - якщо запит на backend пройшов успішно і дані про користувача отримано - необхідно реалізувати автоматичну авторизацію і переадресувати користувача на приватну сторінку HomeAuthorised	
// Посилання "Register" слід реалізувати як компонент Link, використовуючи бібліотеку react-router-dom click, який перенаправляє користувача на RegisterPage