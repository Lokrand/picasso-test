/* eslint-disable react-refresh/only-export-components */
import { Route, Routes } from "react-router-dom";
import RootLayout from "./layout";
import { MainPage } from "../pages/main";
import { PostPage } from "../pages/post";
import NotFoundPage from "../pages/not-found";
import "./styles/normalize.css";
import { withProviders } from "./providers";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="" element={<MainPage />} />
        <Route path="posts/:id" element={<PostPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default withProviders(App);
