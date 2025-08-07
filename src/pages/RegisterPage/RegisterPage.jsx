import { Navigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import { useSelector } from "react-redux";
import RegistrationForm from "../../components/RegisterForm/RegistrationForm";
import { selectIsLoggedIn } from "../../redux/authorization/selectors";

export default function RegisterPage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.section}>
        <div className={styles.registrationBox}>
          <h2 className={styles.hedline}>Register</h2>
          <p className={styles.text}>
            Join our community of mindfulness and wellbeing!
          </p>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
