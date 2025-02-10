"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useEffect } from "react";

type FixedHeaderProps = {
  label?: string | null | undefined;
  contentRight?: React.ReactNode;
  contentLeft?: React.ReactNode;
  invisibleFromStart?: boolean;
  children?: React.ReactNode;
  theme?: "light" | "primary"; 
};

export default function FixedHeader({
  children,
  label,
  contentRight,
  contentLeft,
  invisibleFromStart,
  theme = "primary"
}: FixedHeaderProps) {
  const headerRef = useRef<HTMLHeadingElement | null>(null);

  // scroll event handler
  const handleScroll = () => {
    if (invisibleFromStart) {
      const elem: HTMLHeadingElement | null = headerRef.current;
      const scrolled = document.documentElement.scrollTop;

      if (scrolled > 176) {
        if (elem) {
          elem.classList.add("opacity-100");
          elem.classList.remove("opacity-0");
        }
      } else {
        if (elem) {
          elem.classList.add("opacity-0");
          elem.classList.remove("opacity-100");
        }
      }
    }
  };

  useEffect(() => {
    if (invisibleFromStart) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  });

  return (
    <header
    ref={headerRef}
      className={cn(
        "fixed w-full z-20 top-0 pt-safe-top px-6 bg-primary transition-all duration-300", 
        theme === "light" ? "bg-white text-black" : "bg-primary text-white",
        invisibleFromStart ? "opacity-0" : "opacity-100"
      )}
    >
      <div className={cn("flex items-center justify-center w-full max-w-screen-xl mx-auto", children ? "py-2 min-h-14" : "h-14")}>
        {contentLeft && <span className="grow">{contentLeft}</span>}
        {label && <span className="text-base font-sans font-medium">
          {label}
        </span>}
        {contentRight && <span className="grow">{contentRight}</span>}
        {children}
      </div>
    </header>
  );
}
