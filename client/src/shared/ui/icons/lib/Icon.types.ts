import type { FC, SVGProps } from "react";
import type { icons } from "./Icon.constants";

export type IconName = keyof typeof icons;

export type TIconComponent = FC<{
  name: IconName;
  className?: string;
}> &
  Omit<SVGProps<SVGSVGElement>, "ref">;
