import {
  Layout,
  Card,
  Statistic,
  List,
  Typography,
  Spin,
  Tag,
  Flex,
} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useContext } from "react";
import bigFirstLetter from "../../utils/big";
import CryptoContext from "../../context/crypto_context";

const siderStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#3A535C",
  padding: "1rem",
  // display: "flex",
};

export default function AppSider() {
  const { loading, assets } = useContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <>
      <Layout.Sider width="25%" style={siderStyle}>
        {assets.map((asset) => (
          <Card key={asset.id} style={{ marginBottom: "1rem" }}>
            <Statistic
              title={bigFirstLetter(asset.id)}
              value={asset.totalAmount}
              precision={2}
              valueStyle={{ color: asset.grow ? "green" : "#cf1322" }}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="$"
            />

            <List
              size="small"
              dataSource={[
                {
                  title: "Total profit:",
                  value: asset.totalProfit.toFixed(2) + " $",
                  withTag: true,
                },
                { title: "Asset amount:", value: asset.amount, isPlain: true },
                // {
                //   title: "Difference:",
                //   value: asset.growPercent + " %",
                // },
              ]}
              renderItem={(item) => (
                <List.Item
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography.Text>{item.title}</Typography.Text>

                  {item.withTag && (
                    <Tag
                      style={{ fontWeight: "400" }}
                      color={asset.grow ? "green" : "red"}
                    >
                      {asset.growPercent + " %"}
                    </Tag>
                  )}

                  {item.isPlain && (
                    <Typography.Text type="default">
                      {item.value}
                    </Typography.Text>
                  )}

                  {!item.isPlain && (
                    <Typography.Text
                      style={{ fontWeight: "400" }}
                      type={asset.grow ? "success" : "danger"}
                    >
                      {item.value}
                    </Typography.Text>
                  )}
                </List.Item>
              )}
            />
          </Card>
        ))}
      </Layout.Sider>
    </>
  );
}
