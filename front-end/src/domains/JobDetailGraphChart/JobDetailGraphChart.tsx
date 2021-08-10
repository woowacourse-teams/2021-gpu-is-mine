import { ComponentProps } from "react";
import { ChartConfiguration } from "chart.js/auto";
import { Chart } from "../../components";
import { ParsedLog } from "../../__fixtures__";

interface JobDetailGraphChartProps extends Omit<ComponentProps<typeof Chart>, "config"> {
  data: ParsedLog[];
}

const JobDetailGraphChart = ({ data, ...rest }: JobDetailGraphChartProps) => {
  const labels = data.map(({ currentEpoch }) => currentEpoch);
  const accuracyList = data.map(({ accuracy }) => accuracy);
  const lossList = data.map(({ loss }) => loss);

  const accuracyColor = "rgb(3, 105, 161)";
  const accuracyBackgroundColor = "rgba(3, 105, 161, 0.5)";
  const lossColor = "rgb(185, 28, 28)";
  const lossBackgroundColor = "rgba(185, 28, 28, 0.5)";

  const config: ChartConfiguration<"line", number[], number> = {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Accuracy",
          data: accuracyList,
          borderColor: accuracyColor,
          backgroundColor: accuracyBackgroundColor,
          yAxisID: "accuracyY",
        },
        {
          label: "Loss",
          data: lossList,
          borderColor: lossColor,
          backgroundColor: lossBackgroundColor,
          yAxisID: "lossY",
        },
      ],
    },
    options: {
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        title: {
          display: true,
          text: "Accuracy - Loss Chart",
        },
      },
      scales: {
        accuracyY: {
          title: {
            display: true,
            text: "Accuracy",
          },
          max: 1,
          position: "left",
          ticks: {
            color: accuracyColor,
          },
        },
        lossY: {
          title: {
            display: true,
            text: "Loss",
          },
          min: 0,
          position: "right",
          ticks: {
            color: lossColor,
          },
        },
      },
    },
  };

  return <Chart {...rest} config={config} />;
};

export default JobDetailGraphChart;
