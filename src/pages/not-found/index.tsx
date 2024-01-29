import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.content}>
      <Result
        status="404"
        title="404"
        subTitle="Извините, скорее всего такой страницы не существует"
        extra={
          <Button type="primary" onClick={() => navigate("/picasso-test")}>
            Перейти на главную
          </Button>
        }
      />
    </section>
  );
};

export default NotFoundPage;
