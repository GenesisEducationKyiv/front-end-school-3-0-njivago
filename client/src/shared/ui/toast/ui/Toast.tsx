import type { TToastComponent } from "../lib/Toast.types";

export const Toast: TToastComponent = ({ title, description, actions }) => (
  <div className="flex-1">
    <div className="flex items-start">
      <div className="flex-1">
        {title && (
          <h3 className="mb-1 text-sm font-semibold text-gray-900">{title}</h3>
        )}
        <div className="text-sm text-gray-600">{description}</div>
      </div>
    </div>
    {actions && (
      <div className="mt-3 flex justify-end space-x-2 border-t border-gray-200 pt-3">
        {actions}
      </div>
    )}
  </div>
);
