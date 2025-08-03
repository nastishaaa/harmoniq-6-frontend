import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerThunk } from '../../redux/register/operation';
import styles from './RegisterPage.module.css';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  EyeIcon from '../../assets/icons/EyeOffIcon.svg';
import EyeOffIcon from '../../assets/icons/EyeIcon.svg';




const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Too short!')
    .max(32, 'Too long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email format')
    .min(5, 'Too short!')
    .max(64, 'Too long!')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too short!')
    .max(64, 'Too long!')
    .matches(
      /^(?=.*[A-Z])(?=.*\d).{6,18}$/,
      'Password must be 6-18 characters, with at least one capital letter and one number'
    )
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const togglePassword = () => setShowPassword(prev => !prev);       
  const toggleConfirm = () => setShowConfirm(prev => !prev);
    const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    const { name, email, password } = values; 
    const resultAction = await dispatch(registerThunk({ name, email, password }));

    if (registerThunk.fulfilled.match(resultAction)) {
      toast.success('Registration successful!');
      resetForm();
       navigate('/photo');
    
    } else {
      const { status, message } = resultAction.payload || {};
      if (status === 400) {
  toast.error(message || 'Invalid form data');
}
      else if (status === 409) {
        toast.error('Email in use!')
      } else {
        toast.error(message || 'Something went wrong');
      }
    }
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
          <label htmlFor="name" className={styles.label}>Enter your name</label>
          <Field type="text" name="name" id="name"  className={`${styles.field} ${errors.name && touched.name ? styles.errorField : ''}`} />
          <ErrorMessage name="name" component="div" className={styles.error} />
        </div>
        <div className={styles.inputbox}>
          <label htmlFor="email" className={styles.label}>Enter your email address</label>
          <Field type="email" name="email" id="email"  placeholder="email@gmail.com" className={`${styles.field} ${errors.name && touched.name ? styles.errorField : ''}`} />
          <ErrorMessage name="email" component="div" className={styles.error} />
          </div>
         <div className={styles.inputbox}>
         <label htmlFor="password" className={styles.label}>Create a strong password</label>
         <div className={styles.inputWrapper }>
         <Field
      type={showPassword ? 'text' : 'password'}
      name="password"
      id="password"
      placeholder="*********"
      className={`${styles.field} ${errors.name && touched.name ? styles.errorField : ''}`}/>
             <button
      type="button"
      onClick={togglePassword}
      className={styles.eyeButton}
      aria-label="Toggle password visibility">
               <img src={showPassword ? EyeOffIcon : EyeIcon} alt="Toggle password visibility" className={styles.eyeIcon} />
               {/*  <svg className={styles.eyeIcon} >
                  <use href={`/public/eye-symbol-defs.svg#${showPassword ? 'icon-eye-icon-off-xs' : 'icon-eye-icon-xs'}`} />
                </svg>    */}          
    </button>
  </div>
  <ErrorMessage name="password" component="div" className={styles.error} />
</div>

<div className={styles.inputbox}>
  <label htmlFor="confirmPassword" className={styles.label}>Repeat your password</label>
  <div className={styles.inputWrapper }>
    <Field
      type={showConfirm ? 'text' : 'password'}
      name="confirmPassword"
      id="confirmPassword"
       placeholder="*********"
     className={`${styles.field} ${errors.name && touched.name ? styles.errorField : ''}`}
    />
    <button
      type="button"
      onClick={toggleConfirm}
      className={styles.eyeButton}
      aria-label="Toggle password visibility" >       
       <img src={showConfirm ? EyeOffIcon : EyeIcon} alt="Toggle password visibility" className={styles.eyeIcon} />          
    </button>
  </div>
  <ErrorMessage name="confirmPassword" component="div" className={styles.error} />
</div>
        <button type="submit" className={styles.button}>
          Create account
        </button>
         <span className={styles.linkbox}>
           Already have an account?
        <Link to="/login" className={styles.link}> Log In!</Link>
          </span>
        </Form>
          )}
    </Formik>
  );
};

export default RegistrationForm;



 