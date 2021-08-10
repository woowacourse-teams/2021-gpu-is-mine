import { HTMLAttributes, useRef } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import ChartClass, { ChartConfiguration, ChartType } from "chart.js/auto";

interface ChartProps<TType extends ChartType, TData, TLabel>
  extends HTMLAttributes<HTMLCanvasElement> {
  config: ChartConfiguration<TType, TData, TLabel>;
}

const Chart = <TType extends ChartType, TData, TLabel>({
  config,
  ...rest
}: ChartProps<TType, TData, TLabel>) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useDeepCompareEffect(() => {
    const ctx = ref.current;

    if (!ctx) {
      return;
    }

    const chart = new ChartClass(ctx, config);

    // eslint-disable-next-line consistent-return
    return () => {
      chart.destroy();
    };
  }, [config]);

  return <canvas ref={ref} {...rest} />;
};

export default Chart;
