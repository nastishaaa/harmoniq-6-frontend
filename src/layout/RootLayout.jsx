import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Loader } from "../components/Loader/Loader";
import { ModalErrorSave } from "../components/ModalErrorSave/ModalErrorSave";

export default function RootLayout() {
  
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <ModalErrorSave />

      <Footer />
    </>
  );
}
