import { CryptoContextProvider } from "./context/crypto_context";
import AppContent from "./Components/Layout/Content";
import AppHeader from "./Components/Layout/Header";
import AppSider from "./Components/Layout/Sider";
import { Layout } from "antd";

export default function App() {
  return (
    <CryptoContextProvider>
      <Layout>
        <AppHeader />
        <Layout>
          <AppSider />
          <AppContent />
        </Layout>
      </Layout>
    </CryptoContextProvider>
  );
}
