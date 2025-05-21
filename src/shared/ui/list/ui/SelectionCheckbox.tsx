import { cn } from "shared/lib/utils";

interface SelectionCheckboxProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  indeterminate?: boolean;
  className?: string;
}

export const SelectionCheckbox = ({
  id,
  checked,
  onChange,
  indeterminate = false,
  className,
}: SelectionCheckboxProps) => {
  return (
    <span
      className={cn(
        "relative flex h-5 w-5 items-center justify-center",
        className
      )}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 checked:bg-primary checked:border-primary"
        ref={(input) => {
          if (input) {
            input.indeterminate = indeterminate;
          }
        }}
      />
      {(checked || indeterminate) && (
        <svg
          className={cn(
            "pointer-events-none absolute text-white",
            indeterminate ? "h-3 w-3" : "h-3.5 w-3.5"
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {indeterminate ? (
            <line x1="5" y1="12" x2="19" y2="12" />
          ) : (
            <polyline points="20 6 9 17 4 12" />
          )}
        </svg>
      )}
    </span>
  );
};
