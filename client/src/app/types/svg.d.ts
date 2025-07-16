declare module "*.svg?react" {
  import type { FC, SVGProps } from "react";

  const Icon: FC<SVGProps<SVGSVGElement>>;

  export default Icon;
}
