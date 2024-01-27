import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/not-found";
import MainLayout from "./layout/MainLayout";
import { MainPage } from "./pages/main";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="main" element={<MainPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
