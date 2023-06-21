import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isLoading?: boolean;
  children: ReactNode;
}
export default function Button({
  children,
  isLoading,
  className = "",
  ...rest
}: Props) {
  return (
    <button type="button" className={className} {...rest}>
      {isLoading ? "wait..." : children}
    </button>
  );
}
