import { cn } from "@/lib/utils";
import Link, {LinkProps} from "next/link"
import { ReactNode } from "react";

type CommonButtonProps = {
  variant: "primary" | "secondary" | "tertiary";
  size?: "small" | "normal";
  width?: "full" | "auto";
  children: ReactNode;
};

type LinkButtonProps = CommonButtonProps & {
  href: LinkProps["href"];
  type?: undefined;
  props?: Omit<LinkProps, "href" | "children">; // Exclude "href" and "children" from being redefined
};

type RegularButtonProps = CommonButtonProps & {
  type: "button" | "submit";
  href?: undefined;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

type ButtonProps = LinkButtonProps | RegularButtonProps;

export function Button({children, href, size = "normal", variant = "primary", width = "full", ...props}: ButtonProps) {

  const className = cn(
    "rounded-3xl border-2 text-base font-semibold text-center transition-all duration-300", 
    width === "full" ? "block" : "inline-block",
    size === "normal" ? "py-3 px-8" : "py-1 px-3 leading-none",
    variant === "primary" && "bg-primary-300 border-primary-300 text-white hover:bg-primary-400 hover:border-primary-400 active:bg-primary-500 active:border-primary-500",
    variant === "secondary" && "bg-white border-white text-black hover:bg-gray-100 hover:border-gray-100 active:bg-gray-200 active:border-gray-200",
    variant === "tertiary" && "bg-transparent border-gray-100 text-black hover:border-gray-200 active:border-gray-300",
  )

  if (href) {
    return <Link href={href} className={className} {...props}>{children}</Link>
  }

  return <button className={className} {...props}>{children}</button>
}