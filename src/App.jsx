import Layout from "./components/Layout/Layout.jsx";
import Loader from "./components/Loader/Loader.jsx";
import Modal from "react-modal";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Teachers = lazy(() => import("./pages/Teachers/Teachers.jsx"));
const Favorites = lazy(() => import("./pages/Favorites/Favorites.jsx"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound.jsx"));

Modal.setAppElement("#root");

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Layout />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Suspense>
    </>
  );
}

export default App;
