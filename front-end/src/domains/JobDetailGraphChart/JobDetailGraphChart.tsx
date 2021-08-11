import { ComponentProps, useRef } from "react";
import ChartClass, { ChartConfiguration } from "chart.js/auto";
import { Chart, Button } from "../../components";
import { ButtonPanel } from "./JobDetailGraphChart.styled";
import { ParsedLog } from "../../types";

interface JobDetailGraphChartProps extends Omit<ComponentProps<typeof Chart>, "config"> {
  data: Readonly<ParsedLog[]>;
}

const accuracyColor = "rgb(3, 105, 161)";
const accuracyBackgroundColor = "rgba(3, 105, 161, 0.5)";
const lossColor = "rgb(185, 28, 28)";
const lossBackgroundColor = "rgba(185, 28, 28, 0.5)";

const JobDetailGraphChart = ({ data, ...rest }: JobDetailGraphChartProps) => {
  const chartRef = useRef<ChartClass<"line", number[], number> | null>(null);

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
      spanGaps: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        title: {
          display: true,
          text: "Accuracy - Loss Chart",
        },
        zoom: {
          limits: {
            accuracyY: { min: 0, max: 1 },
            lossY: { min: 0, max: 1 },
          },
          zoom: {
            wheel: {
              enabled: true,
              speed: 0.2,
            },
            drag: {
              enabled: true,
            },
            mode: "x",
          },
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

  const resetZoom = () => chartRef.current?.resetZoom();

  return (
    <>
      <Chart {...rest} config={config} ref={chartRef} />
      <ButtonPanel>
        <Button color="primary" onClick={resetZoom}>
          Reset Zoom
        </Button>
      </ButtonPanel>
    </>
  );
};

export default JobDetailGraphChart;
