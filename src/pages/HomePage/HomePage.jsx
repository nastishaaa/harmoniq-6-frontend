import styles from './HomePage.module.css';
import Hero from '../../components/Hero/Hero';

export default function HomePage() {
    return (
        <div className={styles.container}>
            <Hero />
        </div>
    )
}
