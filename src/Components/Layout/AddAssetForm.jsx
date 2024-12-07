import { useContext, useState, useRef } from "react";
import CryptoContext from "../../context/crypto_context";
import CoinInfo from "./CoinInfo";
import {
  Select,
  Space,
  Flex,
  Typography,
  Divider,
  Form,
  Button,
  Input,
  InputNumber,
  DatePicker, 
  Result,
} from "antd";

//

const validateMessages = {
  required: "${label} is required",
  type: {
    number: "${label} is not valid number",
  },
  number: { range: "${label} must be between ${min} and ${max}" },
};

export default function AddAssetForm({ onClose }) {
  const [form] = Form.useForm();
  const { crypto, addAsset } = useContext(CryptoContext);
  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef();
  //

  if (submitted) {
    return (
      <Result
        status="success"
        title="Новый ассет добавлен"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price} on ${assetRef.current.date}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{ width: "300px", height: "40px" }}
        // open={select}
        showSearch={true}
        dropdownStyle={{ color: "red", backgroundColor: "lightGrey" }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Select coin"
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
    );
  }

  //

  function onFinish(values) {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    setSubmitted(true);
    addAsset(newAsset);
  }

  function handleAmountChange(value) {
    let price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }

  function handlePriceChange(value) {
    let amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  }

  //

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      {/* coin name */}

      <CoinInfo coin={coin} />
      <Divider />

      {/* coin name */}

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber onChange={handleAmountChange} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Date & Time" name="Date & Time">
        <DatePicker showTime style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Button
          style={{ backgroundColor: "#F67F54", width: "90px" }}
          type="primary"
          htmlType="submit"
        >
          Принять
        </Button>
      </Form.Item>
    </Form>
  );
}
