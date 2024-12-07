import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useContext } from "react";
import CryptoContext from "../../context/crypto_context";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AssetsTable() {
  const { assets } = useContext(CryptoContext);

  const data = {
    labels: assets.map((a) => a.name),
    datasets: [
      {
        label: "$",
        data: assets.map((a) => a.totalAmount),
        backgroundColor: [
          "red",
          "rgba(54, 162, 235, 1)",
          "rgba(225, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(225, 159, 64, 1)",
        ],
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        width: 500,
        marginBottom: "1rem",
        justifyContent: "center",
      }}
    >
      <Pie data={data} />
    </div>
  );
}
