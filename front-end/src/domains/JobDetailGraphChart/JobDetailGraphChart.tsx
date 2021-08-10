import { ComponentProps } from "react";
import { ChartConfiguration } from "chart.js/auto";
import { Chart } from "../../components";
import { ParsedLog } from "../../__fixtures__";
import * as Utils from "../../components/Chart/utils";

interface JobDetailGraphChartProps extends Omit<ComponentProps<typeof Chart>, "config"> {
  data: ParsedLog[];
}

const JobDetailGraphChart = ({ data, ...rest }: JobDetailGraphChartProps) => {
  const labels = data.map(({ currentEpoch }) => currentEpoch);
  const accuracyList = data.map(({ accuracy }) => accuracy);
  const lossList = data.map(({ loss }) => loss);

  const config: ChartConfiguration<"line", number[], number> = {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Accuracy",
          data: accuracyList,
          borderColor: Utils.CHART_COLORS.blue,
          backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
          yAxisID: "accuracyY",
        },
        {
          label: "Loss",
          data: lossList,
          borderColor: Utils.CHART_COLORS.red,
          backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
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
            color: Utils.CHART_COLORS.blue,
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
            color: Utils.CHART_COLORS.red,
          },
        },
      },
    },
  };

  return <Chart {...rest} config={config} />;
};

export default JobDetailGraphChart;
