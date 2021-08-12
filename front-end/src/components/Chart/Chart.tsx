import { forwardRef, HTMLAttributes, useRef, ForwardedRef } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import {
  Chart as ChartClass,
  ChartConfiguration,
  ChartType,
  LineElement,
  PointElement,
  LineController,
  LinearScale,
  CategoryScale,
  Tooltip,
  Title,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

ChartClass.register(
  LineElement,
  PointElement,
  LineController,
  LinearScale,
  CategoryScale,
  Tooltip,
  Title,
  zoomPlugin
);

interface ChartProps<TType extends ChartType, TData, TLabel>
  extends HTMLAttributes<HTMLCanvasElement> {
  config: ChartConfiguration<TType, TData, TLabel>;
}

const Chart = <TType extends ChartType, TData, TLabel>(
  props: ChartProps<TType, TData, TLabel>,
  ref: ForwardedRef<ChartClass<TType, TData, TLabel> | null>
) => {
  const { config, ...rest } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useDeepCompareEffect(() => {
    const ctx = canvasRef.current;

    if (ctx == null) {
      return;
    }

    const chart = new ChartClass(ctx, config);

    if (typeof ref === "function") {
      ref(chart);
    } else if (ref != null) {
      // eslint-disable-next-line no-param-reassign
      ref.current = chart;
    }

    // eslint-disable-next-line consistent-return
    return () => {
      chart.destroy();
    };
  }, [config]);

  return <canvas ref={canvasRef} {...rest} />;
};

export default forwardRef(Chart);
