import { Navigate } from 'react-router-dom'; 
import { selectIsLoggedIn } from '../../redux/register/selector';
import styles from './RegisterPage.module.css';
import { useSelector } from 'react-redux';
import RegistrationForm from './RegistrationForm';




export default function RegisterPage() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    if (isLoggedIn) {
        return <Navigate to='/' />
    }
    return (
        <div className={styles.section}>
            <h2 className={styles.hedline}>Register</h2>
            <p className={styles.text}>Join our community of mindfulness and wellbeing!</p>
            <RegistrationForm />
            
        </div>
    );
}
