import styles from './HomePage.module.css';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsError, selectIsLoading } from '../../redux/homeData/selectors';
import { useEffect } from 'react';
import { fetchHomeArticles, fetchTopCreators } from '../../redux/homeData/operations';
import { Loader } from '../../components/Loader/Loader';
import PopularArticles from '../../components/PopularArticles/PopularArticles';
import TopCreators from '../../components/TopCreators/TopCreators';

export default function HomePage() {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(fetchHomeArticles()) }, [dispatch]);
    useEffect(() => { dispatch(fetchTopCreators()) }, [dispatch]);
    const isLoading = useSelector(selectIsLoading);
    const isError = useSelector(selectIsError);
    return (
        isLoading ? <Loader /> :
        <div className={styles.container}>
            <Hero />
            <About />
            <PopularArticles />
            <TopCreators />
        </div>
    )
}
