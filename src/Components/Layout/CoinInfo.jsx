import { Typography, Flex } from "antd";

export default function CoinInfo({ coin, withSymbol }) {
  return (
    <Flex align="center">
      <img src={coin.icon} alt={coin.name} style={{ width: "40px" }} />
      <Typography.Title
        level={2}
        style={{
          marginBottom: "0px",
          marginLeft: "0.5rem",
        }}
      >
        {withSymbol && coin.symbol} {coin.name}
      </Typography.Title>
    </Flex>
  );
}
