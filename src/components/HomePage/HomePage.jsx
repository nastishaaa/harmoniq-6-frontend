import About from "../About/About.jsx";
import Header from "../Header/Header.jsx";
import Hero from "../Hero/Hero.jsx";
import PopularArticles from "../PopularArticles/PopularArticles.jsx";
import Footer from "../Footer/Footer.jsx";
import CreateArticlePage from "../../pages/CreateArticlePage/CreateArticlePage.jsx";

const Home = () => {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <About />
        <PopularArticles />
        {/* <CreateArticlePage/> */}
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default Home;
