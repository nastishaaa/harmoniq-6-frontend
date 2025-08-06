import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import HeaderAuth from "../components/HeaderAuth/HeaderAuth";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Loader } from "../components/Loader/Loader";
import { ModalErrorSave } from "../components/ModalErrorSave/ModalErrorSave";
import { selectIsLoggedIn } from "../redux/authorization/selectors";

export default function RootLayout() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const style = {
    display: "flex",
    flexDirection: "column",
    minHeight: "95vh",
  };
  const mainContentStyle = {
    flexGrow: 1,
  };

  return (
    <>
      <div style={style}>
        {isLoggedIn ? <HeaderAuth /> : <Header />}
        <main style={mainContentStyle}>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </main>
        <ModalErrorSave />

        <Footer />
      </div>
    </>
  );
}
