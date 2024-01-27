import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="center-page">
        <Result
          status="404"
          title="404"
          subTitle="Извините, скорее всего такой страницы не существует"
          extra={
            <Button type="primary" onClick={() => navigate("/")}>
              Перейти на главную
            </Button>
          }
        />
      </section>
    </>
  );
};

export default NotFoundPage;
