import { InputHTMLAttributes } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  inputClassNames?: string;
  inputContainerClassNames?: string;
}

export default function Input({
  inputClassNames = "",
  inputContainerClassNames = "",
  ...rest
}: Props) {
  return (
    <div
      className={classNames(
        inputContainerClassNames,
        "flex bg-white items-center border border-[#E1E1E1] w-full shadow-sm rounded"
      )}
    >
      <input
        className={classNames(
          inputClassNames,
          "bg-transparent disabled:text-gray-500 focus:outline-yellow-500 focus:text-black text-sm rounded w-full font-roboto px-3.5 py-2"
        )}
        {...rest}
      />
    </div>
  );
}
