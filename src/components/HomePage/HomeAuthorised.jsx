// Компонент обгортка, що вміщає в себе основні
//  блоки(компоненти) сторінки авторизованого юзера:
// - Header - хедер сторінки
// - Main - основний контент сторінки, що буде
//  змінюватись в залежності від маршруту 
//  (однаковий для неавторизованого та авторизованого 
//     користувача). Main складається з таких
//      компонентів: Hero, About, PopularArticles, Creators.
// - Footer - підвал сайту. 

import About from "../About/About.jsx";
import Header from "../Header/Header.jsx";
import Hero from "../Hero/Hero.jsx";
import PopularArticles from "../PopularArticles/PopularArticles.jsx";
import Creators from "../Creators/Creators.jsx";
import Footer from "../Footer/Footer.jsx";

const HomeAuthorised = () => {
  return (
    <>
      <Header/>
      <main>
        <Hero/>
        <About/>
        <PopularArticles/>
        <Creators/>

      </main>

      <Footer/>
    </>
  );
};

export default HomeAuthorised;