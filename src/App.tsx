import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/not-found";
import MainLayout from "./layout/MainLayout";
import { MainPage } from "./pages/main";
import { PostPage } from "./pages/post";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="main" element={<MainPage />} />
        <Route path="posts/:id" element={<PostPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
