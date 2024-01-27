import { Layout, Typography } from "antd";
import { Outlet } from "react-router-dom";

import styles from "./MainLayout.module.css";

const { Header, Content, Footer } = Layout;
const { Text, Title } = Typography;

const MainLayout = () => {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.layout__header}>
        <Title style={{ margin: 0 }}>Тестовое задание ПИКАССО</Title>
      </Header>
      <Layout className={styles.layout__content}>
        <Content className={styles.layout__section}>
          <Outlet />
        </Content>
      </Layout>
      <Footer className={styles.layout__footer}>
        <Text type="secondary">© Дмитрий Платонов</Text>
        <Text type="secondary">2024г.</Text>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
