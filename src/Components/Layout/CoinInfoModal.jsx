import { Divider, Flex, Tag, Typography } from "antd";
import CoinInfo from "./CoinInfo";

export default function CoinInfoModal({ coin }) {
  return (
    <>
      <CoinInfo coin={coin} withSymbol />
      <Divider />
      <Typography.Paragraph>
        <Typography.Text strong>
          hour:{" "}
          <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
            {coin.priceChange1h}
          </Tag>
          <Divider />
          day:{" "}
          <Tag color={coin.priceChange1d > 0 ? "green" : "red"}>
            {coin.priceChange1d}
          </Tag>
          <Divider /> week:{" "}
          <Tag color={coin.priceChange1w > 0 ? "green" : "red"}>
            {coin.priceChange1w}
          </Tag>
        </Typography.Text>
      </Typography.Paragraph>
    </>
  );
}
