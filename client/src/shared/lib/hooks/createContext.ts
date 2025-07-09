import { createContext as createReactContext, use, createElement } from "react";
import type {
  Context as ReactContext,
  FC,
  PropsWithChildren,
  ReactNode,
} from "react";

type Hook<Name extends string, Context> = {
  [K in `use${Name}`]: () => Context;
};

type ContextProvider<Name extends string, Props> = {
  [K in `${Name}Provider`]: FC<PropsWithChildren<Props>>;
};

type Context<Name extends string, Context> = {
  [K in `${Name}Context`]: ReactContext<Context | null>;
};

// oxlint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (props: any) => any;

export function createContext<Name extends string, Builder extends AnyFunction>(
  name: Name,
  useBuildProps: Builder
) {
  type ContextValue = ReturnType<Builder>;
  type BuilderProps = Parameters<Builder>[0];

  const NewContext = createReactContext<ContextValue | null>(null);

  const Provider: FC<PropsWithChildren<BuilderProps>> = ({
    children,
    ...props
  }): ReactNode => {
    const value = useBuildProps(props);

    return createElement(NewContext.Provider, { value }, children);
  };
  Provider.displayName = `${name}Provider`;

  const useHook = () => {
    const context = use(NewContext);
    if (context === null) {
      throw new Error(`use${name} must be used within a ${name}Provider`);
    }
    return context;
  };

  return {
    [`${name}Context`]: NewContext,
    [`${name}Provider`]: Provider,
    [`use${name}`]: useHook,
  } as Context<Name, ContextValue> &
    ContextProvider<Name, BuilderProps> &
    Hook<Name, ContextValue>;
}
