import { d as cn, j as jsxRuntimeExports, r as reactExports } from './index-CPQPU9RC.js';
import { c as compilerRuntimeExports } from './compiler-runtime-CCnkACVM.js';

const FormError = (t0) => {
  const $ = compilerRuntimeExports.c(5);
  const {
    error,
    className
  } = t0;
  if (!error) {
    return null;
  }
  let t1;
  if ($[0] !== className) {
    t1 = cn("text-sm text-red-500", "dark:text-red-400", className);
    $[0] = className;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  let t2;
  if ($[2] !== error.message || $[3] !== t1) {
    t2 = /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: t1, role: "alert", children: error.message });
    $[2] = error.message;
    $[3] = t1;
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  return t2;
};

const FormField = reactExports.forwardRef((t0, ref) => {
  const $ = compilerRuntimeExports.c(23);
  let children;
  let className;
  let error;
  let htmlFor;
  let label;
  let props;
  let required;
  if ($[0] !== t0) {
    ({
      className,
      label,
      error,
      required,
      htmlFor,
      children,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = children;
    $[2] = className;
    $[3] = error;
    $[4] = htmlFor;
    $[5] = label;
    $[6] = props;
    $[7] = required;
  } else {
    children = $[1];
    className = $[2];
    error = $[3];
    htmlFor = $[4];
    label = $[5];
    props = $[6];
    required = $[7];
  }
  let t1;
  if ($[8] !== className) {
    t1 = cn("flex flex-col gap-2", className);
    $[8] = className;
    $[9] = t1;
  } else {
    t1 = $[9];
  }
  let t2;
  if ($[10] !== htmlFor || $[11] !== label || $[12] !== required) {
    t2 = label && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor, className: "text-sm font-medium text-text", children: [
      label,
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 ml-1", children: "*" })
    ] });
    $[10] = htmlFor;
    $[11] = label;
    $[12] = required;
    $[13] = t2;
  } else {
    t2 = $[13];
  }
  let t3;
  if ($[14] !== error) {
    t3 = error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-500", role: "alert", children: error.message });
    $[14] = error;
    $[15] = t3;
  } else {
    t3 = $[15];
  }
  let t4;
  if ($[16] !== children || $[17] !== props || $[18] !== ref || $[19] !== t1 || $[20] !== t2 || $[21] !== t3) {
    t4 = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, className: t1, ...props, children: [
      t2,
      children,
      t3
    ] });
    $[16] = children;
    $[17] = props;
    $[18] = ref;
    $[19] = t1;
    $[20] = t2;
    $[21] = t3;
    $[22] = t4;
  } else {
    t4 = $[22];
  }
  return t4;
});

const Select = reactExports.forwardRef((t0, ref) => {
  const $ = compilerRuntimeExports.c(71);
  let className;
  let disabled;
  let error;
  let id;
  let label;
  let name;
  let onChange;
  let options;
  let props;
  let required;
  let t1;
  let value;
  if ($[0] !== t0) {
    ({
      className,
      label,
      error,
      required,
      id,
      options,
      value,
      onChange,
      name,
      disabled,
      placeholder: t1,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = disabled;
    $[3] = error;
    $[4] = id;
    $[5] = label;
    $[6] = name;
    $[7] = onChange;
    $[8] = options;
    $[9] = props;
    $[10] = required;
    $[11] = t1;
    $[12] = value;
  } else {
    className = $[1];
    disabled = $[2];
    error = $[3];
    id = $[4];
    label = $[5];
    name = $[6];
    onChange = $[7];
    options = $[8];
    props = $[9];
    required = $[10];
    t1 = $[11];
    value = $[12];
  }
  const placeholder = t1 === void 0 ? "Select" : t1;
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [selectedValue, setSelectedValue] = reactExports.useState(value || "");
  const selectRef = reactExports.useRef(null);
  let t2;
  if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
    t2 = [];
    $[13] = t2;
  } else {
    t2 = $[13];
  }
  const optionsRef = reactExports.useRef(t2);
  let t3;
  let t4;
  if ($[14] !== value) {
    t3 = () => {
      if (value !== void 0) {
        setSelectedValue(value);
      }
    };
    t4 = [value];
    $[14] = value;
    $[15] = t3;
    $[16] = t4;
  } else {
    t3 = $[15];
    t4 = $[16];
  }
  reactExports.useEffect(t3, t4);
  let t5;
  let t6;
  if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
    t5 = () => {
      const handleClickOutside = (t72) => {
        const {
          target
        } = t72;
        if (selectRef.current && target instanceof Node && !selectRef.current.contains(target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    };
    t6 = [];
    $[17] = t5;
    $[18] = t6;
  } else {
    t5 = $[17];
    t6 = $[18];
  }
  reactExports.useEffect(t5, t6);
  let t7;
  if ($[19] !== onChange) {
    t7 = (optionValue) => {
      setSelectedValue(optionValue);
      setIsOpen(false);
      onChange?.(optionValue);
    };
    $[19] = onChange;
    $[20] = t7;
  } else {
    t7 = $[20];
  }
  const handleSelect = t7;
  let t8;
  if ($[21] !== options || $[22] !== selectedValue) {
    let t92;
    if ($[24] !== selectedValue) {
      t92 = (option) => option.value === selectedValue;
      $[24] = selectedValue;
      $[25] = t92;
    } else {
      t92 = $[25];
    }
    t8 = options.find(t92);
    $[21] = options;
    $[22] = selectedValue;
    $[23] = t8;
  } else {
    t8 = $[23];
  }
  const selectedOption = t8;
  let t9;
  if ($[26] !== ref) {
    t9 = (node) => {
      selectRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else {
        if (ref) {
          ref.current = node;
        }
      }
    };
    $[26] = ref;
    $[27] = t9;
  } else {
    t9 = $[27];
  }
  const t10 = error && "border-red-500 focus:ring-red-500";
  let t11;
  if ($[28] !== className || $[29] !== t10) {
    t11 = cn("flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm", "focus:outline-none focus:ring-1 focus:ring-primary-500", "cursor-pointer select-none items-center justify-between", "disabled:cursor-not-allowed disabled:opacity-50", t10, className);
    $[28] = className;
    $[29] = t10;
    $[30] = t11;
  } else {
    t11 = $[30];
  }
  let t12;
  if ($[31] !== disabled || $[32] !== isOpen) {
    t12 = () => !disabled && setIsOpen(!isOpen);
    $[31] = disabled;
    $[32] = isOpen;
    $[33] = t12;
  } else {
    t12 = $[33];
  }
  const t13 = error ? "true" : "false";
  const t14 = error ? `${id}-error` : void 0;
  const t15 = disabled ? -1 : 0;
  const t16 = !selectedValue && "text-gray-500";
  let t17;
  if ($[34] !== t16) {
    t17 = cn(t16);
    $[34] = t16;
    $[35] = t17;
  } else {
    t17 = $[35];
  }
  const t18 = selectedOption?.label || placeholder;
  let t19;
  if ($[36] !== t17 || $[37] !== t18) {
    t19 = /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: t17, children: t18 });
    $[36] = t17;
    $[37] = t18;
    $[38] = t19;
  } else {
    t19 = $[38];
  }
  let t20;
  if ($[39] !== name || $[40] !== selectedValue) {
    t20 = /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", name, value: selectedValue });
    $[39] = name;
    $[40] = selectedValue;
    $[41] = t20;
  } else {
    t20 = $[41];
  }
  let t21;
  if ($[42] === Symbol.for("react.memo_cache_sentinel")) {
    t21 = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-4 w-4 text-gray-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fillRule: "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", clipRule: "evenodd" }) }) });
    $[42] = t21;
  } else {
    t21 = $[42];
  }
  let t22;
  if ($[43] !== disabled || $[44] !== id || $[45] !== isOpen || $[46] !== t11 || $[47] !== t12 || $[48] !== t13 || $[49] !== t14 || $[50] !== t15 || $[51] !== t19 || $[52] !== t20) {
    t22 = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: t11, onClick: t12, "aria-invalid": t13, "aria-describedby": t14, "aria-haspopup": "listbox", "aria-expanded": isOpen, "aria-disabled": disabled, role: "combobox", tabIndex: t15, id, children: [
      t19,
      t20,
      t21
    ] });
    $[43] = disabled;
    $[44] = id;
    $[45] = isOpen;
    $[46] = t11;
    $[47] = t12;
    $[48] = t13;
    $[49] = t14;
    $[50] = t15;
    $[51] = t19;
    $[52] = t20;
    $[53] = t22;
  } else {
    t22 = $[53];
  }
  let t23;
  if ($[54] !== disabled || $[55] !== handleSelect || $[56] !== isOpen || $[57] !== options || $[58] !== selectedValue) {
    t23 = isOpen && !disabled && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white border border-gray-300 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { role: "listbox", className: "py-1", children: options.map((option_0, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { ref: (el) => {
      optionsRef.current[index] = el;
    }, role: "option", "aria-selected": selectedValue === option_0.value, className: cn("px-3 py-2 text-sm text-primary-700 cursor-pointer border-blue-500", "hover:border-l-4", selectedValue === option_0.value && "bg-primary-100 font-medium"), onClick: () => handleSelect(option_0.value), children: option_0.label }, option_0.value)) }) });
    $[54] = disabled;
    $[55] = handleSelect;
    $[56] = isOpen;
    $[57] = options;
    $[58] = selectedValue;
    $[59] = t23;
  } else {
    t23 = $[59];
  }
  let t24;
  if ($[60] !== props || $[61] !== t22 || $[62] !== t23 || $[63] !== t9) {
    t24 = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: t9, className: "relative", ...props, children: [
      t22,
      t23
    ] });
    $[60] = props;
    $[61] = t22;
    $[62] = t23;
    $[63] = t9;
    $[64] = t24;
  } else {
    t24 = $[64];
  }
  let t25;
  if ($[65] !== error || $[66] !== id || $[67] !== label || $[68] !== required || $[69] !== t24) {
    t25 = /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label, error, required, htmlFor: id, children: t24 });
    $[65] = error;
    $[66] = id;
    $[67] = label;
    $[68] = required;
    $[69] = t24;
    $[70] = t25;
  } else {
    t25 = $[70];
  }
  return t25;
});

export { Select };
//# sourceMappingURL=Select-CsIYFVau.js.map
