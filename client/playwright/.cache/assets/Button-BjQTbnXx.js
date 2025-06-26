import { j as jsxRuntimeExports, d as cn } from './index-CPQPU9RC.js';
import { c as compilerRuntimeExports } from './compiler-runtime-CCnkACVM.js';

const CheckIcon = "data:image/svg+xml,%3csvg%20fill='none'%20stroke='currentColor'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='2'%20d='M5%2013l4%204L19%207'/%3e%3c/svg%3e";

const CrossIcon = "data:image/svg+xml,%3csvg%20fill='none'%20stroke='currentColor'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='2'%20d='M6%2018L18%206M6%206l12%2012'/%3e%3c/svg%3e";

const InfoIcon = "data:image/svg+xml,%3csvg%20fill='none'%20stroke='currentColor'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='2'%20d='M13%2016h-1v-4h-1m1-4h.01M21%2012a9%209%200%2011-18%200%209%209%200%200118%200z'/%3e%3c/svg%3e";

const WarningIcon = "data:image/svg+xml,%3csvg%20fill='none'%20stroke='currentColor'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='2'%20d='M12%209v2m0%204h.01m-6.938%204h13.856c1.54%200%202.502-1.667%201.732-3L13.732%204c-.77-1.333-2.694-1.333-3.464%200L3.34%2016c-.77%201.333.192%203%201.732%203z'/%3e%3c/svg%3e";

const icons = {
  check: CheckIcon,
  cross: CrossIcon,
  info: InfoIcon,
  warning: WarningIcon
};

const Icon = (t0) => {
  const $ = compilerRuntimeExports.c(8);
  let className;
  let name;
  let props;
  if ($[0] !== t0) {
    ({
      name,
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = name;
    $[3] = props;
  } else {
    className = $[1];
    name = $[2];
    props = $[3];
  }
  const IconComponent = icons[name];
  let t1;
  if ($[4] !== IconComponent || $[5] !== className || $[6] !== props) {
    t1 = /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className, ...props });
    $[4] = IconComponent;
    $[5] = className;
    $[6] = props;
    $[7] = t1;
  } else {
    t1 = $[7];
  }
  return t1;
};

const Button = (t0) => {
  const $ = compilerRuntimeExports.c(31);
  let children;
  let className;
  let icon;
  let props;
  let t1;
  let t2;
  let t3;
  let testId;
  if ($[0] !== t0) {
    ({
      variant: t1,
      size: t2,
      children,
      className,
      testId,
      icon,
      iconPosition: t3,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = children;
    $[2] = className;
    $[3] = icon;
    $[4] = props;
    $[5] = t1;
    $[6] = t2;
    $[7] = t3;
    $[8] = testId;
  } else {
    children = $[1];
    className = $[2];
    icon = $[3];
    props = $[4];
    t1 = $[5];
    t2 = $[6];
    t3 = $[7];
    testId = $[8];
  }
  const variant = t1 === void 0 ? "primary" : t1;
  const size = t2 === void 0 ? "md" : t2;
  const iconPosition = t3 === void 0 ? "left" : t3;
  const isIconVariant = variant === "icon";
  const t4 = variant === "primary";
  const t5 = variant === "secondary";
  const t6 = variant === "outline";
  const t7 = size === "sm" && !isIconVariant;
  const t8 = size === "md" && !isIconVariant;
  const t9 = size === "lg" && !isIconVariant;
  const t10 = isIconVariant && size === "sm";
  const t11 = isIconVariant && size === "md";
  const t12 = isIconVariant && size === "lg";
  let t13;
  if ($[9] !== className || $[10] !== isIconVariant || $[11] !== t10 || $[12] !== t11 || $[13] !== t12 || $[14] !== t4 || $[15] !== t5 || $[16] !== t6 || $[17] !== t7 || $[18] !== t8 || $[19] !== t9) {
    t13 = cn("inline-flex items-center justify-center rounded-xl font-medium transition-colors", {
      "bg-primary text-white hover:bg-primary/90": t4,
      "bg-muted text-text hover:bg-muted/90": t5,
      "border border-subtext/20 text-text hover:bg-muted": t6,
      "p-2 text-text hover:bg-muted": isIconVariant,
      "px-3 py-1.5 text-sm": t7,
      "px-4 py-2": t8,
      "px-6 py-3 text-lg": t9,
      "h-8 w-8": t10,
      "h-10 w-10": t11,
      "h-12 w-12": t12
    }, className);
    $[9] = className;
    $[10] = isIconVariant;
    $[11] = t10;
    $[12] = t11;
    $[13] = t12;
    $[14] = t4;
    $[15] = t5;
    $[16] = t6;
    $[17] = t7;
    $[18] = t8;
    $[19] = t9;
    $[20] = t13;
  } else {
    t13 = $[20];
  }
  let t14;
  if ($[21] !== children || $[22] !== icon || $[23] !== iconPosition || $[24] !== isIconVariant) {
    t14 = isIconVariant ? icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: icon, className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: icon, className: cn("h-4 w-4", {
        "order-first mr-2": iconPosition === "left",
        "order-last ml-2": iconPosition === "right"
      }) }),
      children
    ] });
    $[21] = children;
    $[22] = icon;
    $[23] = iconPosition;
    $[24] = isIconVariant;
    $[25] = t14;
  } else {
    t14 = $[25];
  }
  let t15;
  if ($[26] !== props || $[27] !== t13 || $[28] !== t14 || $[29] !== testId) {
    t15 = /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "data-testid": testId, className: t13, ...props, children: t14 });
    $[26] = props;
    $[27] = t13;
    $[28] = t14;
    $[29] = testId;
    $[30] = t15;
  } else {
    t15 = $[30];
  }
  return t15;
};

export { Button };
//# sourceMappingURL=Button-BjQTbnXx.js.map
