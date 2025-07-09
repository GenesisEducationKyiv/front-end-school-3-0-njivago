import { Provider } from "urql";
import { graphqlClient } from "shared/lib/api";
import type { PropsWithChildren } from "react";

export const UrqlProvider = ({ children }: PropsWithChildren) => (
  <Provider value={graphqlClient}>{children}</Provider>
);
