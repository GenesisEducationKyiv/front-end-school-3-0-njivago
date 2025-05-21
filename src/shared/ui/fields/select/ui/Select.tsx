import { forwardRef, useState, useEffect, useRef } from "react";
import { cn } from "shared/lib/utils";
import { FormField } from "../../base";
import type { SelectProps } from "../lib/Select.types";

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
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
      placeholder = "Select",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || "");
    const selectRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<(HTMLLIElement | null)[]>([]);

    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleSelect = (optionValue: string) => {
      setSelectedValue(optionValue);
      setIsOpen(false);
      onChange?.(optionValue);
    };

    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );

    return (
      <FormField label={label} error={error} required={required} htmlFor={id}>
        <div
          ref={(node) => {
            selectRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          className="relative"
          {...props}
        >
          <div
            className={cn(
              "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
              "focus:outline-none focus:ring-1 focus:ring-primary-500",
              "cursor-pointer select-none items-center justify-between",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${id}-error` : undefined}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-disabled={disabled}
            role="combobox"
            tabIndex={disabled ? -1 : 0}
            id={id}
          >
            <span className={cn(!selectedValue && "text-gray-500")}>
              {selectedOption?.label || placeholder}
            </span>
            <input type="hidden" name={name} value={selectedValue} />
            <div className="pointer-events-none flex items-center">
              <svg
                className="h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {isOpen && !disabled && (
            <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white border border-gray-300 shadow-lg">
              <ul role="listbox" className="py-1">
                {options.map((option, index) => (
                  <li
                    key={option.value}
                    ref={(el) => {
                      optionsRef.current[index] = el;
                    }}
                    role="option"
                    aria-selected={selectedValue === option.value}
                    className={cn(
                      "px-3 py-2 text-sm text-primary-700 cursor-pointer border-blue-500",
                      "hover:border-l-4",
                      selectedValue === option.value &&
                        "bg-primary-100 font-medium"
                    )}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </FormField>
    );
  }
);
