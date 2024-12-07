import { Layout, Typography } from "antd";
import CryptoContext from "../../context/crypto_context";
import { useState, useContext } from "react";
import PortfolioChart from "./PortfolioChart";
import AssetsTable from "./AssetsTable";

const contentStyle = {
  minHeight: "calc(100vh - 70px)",
  backgroundColor: "#6E848E",
  textAlign: "center",
  padding: "1rem",
  color: "#fff",
};

export default function AppContent() {
  const { assets, crypto } = useContext(CryptoContext);

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={1} style={{ color: "#fff", textAlign: "left" }}>
        Портфолио:{" "}
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, v) => (acc += v), 0)
          .toFixed(2)}{" "}
        $
      </Typography.Title>

      {/*     */}

      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
}
