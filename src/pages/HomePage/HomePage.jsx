import styles from "./HomePage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectIsError, selectIsLoading } from "../../redux/homeData/selectors";
import { useEffect } from "react";
import { fetchHomeArticles } from "../../redux/homeData/operations";
import { Loader } from "../../components/Loader/Loader";
import { selectIsLoggedIn } from "../../redux/register/selector.js";
import HomeAuthorised from "../../components/HomePage/HomeAuthorised.jsx";
import Home from "../../components/HomePage/HomePage.jsx";

export default function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHomeArticles());
  }, [dispatch]);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isError) return <div>Error</div>;
  if (isLoading) return <Loader />;

  return isLoggedIn ? (
    <HomeAuthorised />
  ) : (
    <div className={styles.container}>
      <Home />
    </div> // треба додати Creators
  );
}
