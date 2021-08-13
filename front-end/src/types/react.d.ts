// eslint-disable-next-line react/no-typos
import "react";

declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: PropsWithChildren<P>, ref: ForwardedRef<T>) => ReactElement | null
  ): (props: PropsWithoutRef<P> & RefAttributes<T>) => ReactElement | null;
}
