import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children: ReactNode;
}

/**
 * ボタン
 *
 * @param props
 * @returns
 *
 * @example 利用側で横幅を指定してください
 * <div className="w-full sm:w-1/3">
 *   <Button
 *     attributes={{
 *       type: "button",
 *       disabled: false
 *     }}
 *   >
 *     <span className="font-bold">Comment</span>
 *   </Button>
 * </div>
 */
export const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { onClick, children, ...buttonProps } = props;

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={
        "w-full rounded border border-blue-500 px-4 py-2 text-center text-blue-500 transition hover:bg-blue-500 hover:text-white disabled:pointer-events-none disabled:border-gray-500 disabled:text-gray-500"
      }
      {...buttonProps}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
