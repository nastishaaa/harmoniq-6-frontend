import styles from './HomePage.module.css';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';

export default function HomePage() {
    return (
        <div className={styles.container}>
            <Hero />
            <About />
        </div>
    )
}
