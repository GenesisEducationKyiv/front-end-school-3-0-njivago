import { icons } from "../lib/Icon.constants";
import type { TIconComponent } from "../lib/Icon.types";

export const Icon: TIconComponent = ({ name, className, ...props }) => {
  const IconComponent = icons[name];

  return <IconComponent className={className} {...props} />;
};
