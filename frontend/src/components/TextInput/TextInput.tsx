import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | boolean;
}

export const TextInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, error, ...inputProps } = props;

  return (
    <label>
      <div className={"mb-2"}>{label}</div>
      <div>
        <input
          ref={ref}
          {...inputProps}
          aria-invalid={!!error}
          className={
            'w-full rounded border border-gray-500 p-2 outline-none focus:border-blue-500 aria-[invalid="true"]:border-red-500'
          }
        />
      </div>
      {error && typeof error === "string" && (
        <div aria-invalid={true} className={"mt-2 text-red-500"}>
          {error}
        </div>
      )}
    </label>
  );
});

TextInput.displayName = "TextInput";
