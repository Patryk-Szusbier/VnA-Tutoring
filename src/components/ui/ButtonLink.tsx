import type { AnchorHTMLAttributes } from "react";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary";
};

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-colors duration-200";
const variants = {
  primary: "bg-accent text-dark hover:bg-text2",
  secondary: "border border-grayish text-text2 hover:border-text2",
};

export default function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
