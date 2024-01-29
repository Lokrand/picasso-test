/* eslint-disable react-refresh/only-export-components */
import { Route, Routes } from "react-router-dom";
import RootLayout from "./layout";
import MainPage from "../pages/main";
import PostPage from "../pages/post";
import NotFoundPage from "../pages/not-found";
import { withProviders } from "./providers";

import "./styles/normalize.css";

const App = () => {
  return (
    <Routes>
      <Route path="/picasso-test/" element={<RootLayout />}>
        <Route path="" element={<MainPage />} />
        <Route path="posts/:id" element={<PostPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default withProviders(App);
