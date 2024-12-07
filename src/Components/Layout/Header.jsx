import {
  Layout,
  Select,
  Space,
  Button,
  Modal,
  Drawer,
  Card,
  Statistic,
} from "antd";
import { useContext, useEffect, useState } from "react";
import CryptoContext from "../../context/crypto_context";
import CoinInfoModal from "./CoinInfoModal";
import AddAssetForm from "./AddAssetForm";

const headerStyle = {
  justifyContent: "space-between",
  backgroundColor: "#323D42",
  textAlign: "center",
  display: "flex",
  padding: "1rem",
  height: "70px",
  width: "100%",
  color: "#fff",
};

export default function AppHeader() {
  const { crypto } = useContext(CryptoContext);
  const [select, setSelect] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  function handeleSelect(value) {
    console.log(value);
    setCoin(crypto.find((coin) => coin.id === value));
    setModal(true);
  }

  function handleAddAsset() {
    setDrawer(true);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ height: "2.5rem", width: "350px" }}
        open={select}
        dropdownStyle={{ color: "red", backgroundColor: "lightGrey" }}
        value="press / to open"
        onSelect={handeleSelect}
        onClick={() => setSelect((prev) => !prev)}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: "20px" }} src={option.data.icon} />
            {option.data.label}
          </Space>
        )}
      />

      <Button
        style={{
          fontSize: "100",
          fontWeight: "bold",
          color: "black",
          backgroundColor: "#F2F2EB",
          height: "2.5rem",
          width: "10rem",
        }}
        type="primary"
        onClick={handleAddAsset}
      >
        Add asset
      </Button>

      <Modal footer={null} open={modal} onCancel={() => setModal(false)}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        destroyOnClose={true}
        width={500}
        title="Add Asset"
        open={drawer}
        onClose={() => setDrawer(false)}
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}
