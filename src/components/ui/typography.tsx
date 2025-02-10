import React from "react";
import clsx from "clsx";

type TextClassPrefix<T extends string> = T extends string ? `text-${T}` : T;

type TypographyProps = {
  /**
   * The level property sets the corresponding element. 
   * Note that the `<h1>` element only should be used once per page.
   */
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

  /**
   * The variant prop sets the styling of the element.
   */
  variant: "xl" | "l" | "md" | "sm" | "xs" | "body" | "body-sm";

  /**
   * The content of the element.
   */
  children: React.ReactNode;

  /**
   * The color prop lets you change the font color.
   */
  color?: TextClassPrefix<string>;

  /**
   * Specifies the alignment of the element.
   */
  alignment?: "inherit" | "center" | "left" | "right" | "justify";

  /**
   * The line height prop is used to set the line height of the body variants.
   */
  lineHeight?: "normal" | "tight" | "ultratight";

  /**
   * If set to true the element does not wrap, but instead will truncate with a text overflow ellipsis.
   */
  noWrap?: boolean;
}

type StylingProps = {
  [key in TypographyProps["variant"]]: string;
};

/**
 * The Typography component is a complete component for headings and paragraphs. 
 * It provides all styling neccessary, and lets you easily change the element and variant.  
 */
export const Typography = ({
  level,
  variant,
  children,
  color,
  alignment = "inherit",
  lineHeight = "normal",
  noWrap = false
}: TypographyProps) => {
  const Element = level;
  const variantType = getVariantType();

  // Main styling for the variants
  const styling: StylingProps = {
    "xl": clsx("font-sans font-medium text-3xl"),
    "l": clsx("font-sans font-medium text-2xl"),
    "md": clsx("font-sans font-medium text-xl leading-[1.2] tracking-[1%] mb-4"),
    "sm": "font-sans font-semibold text-base leading-normal mb-4",
    "xs": "font-sans font-bold text-xs leading-normal tracking-tight mb-4",
    "body": "font-sans font-normal text-base",
    "body-sm": "font-sans font-normal text-sm",
  }

  // Specifies the text alignment
  const align = {
    "center": "text-center",
    "left": "text-left",
    "right": "text-right",
    "justify": "text-justify"
  }

  // Specifies the line height of body elements
  const leading = {
    "normal": "leading-normal",
    "tight": "leading-tight",
    "ultratight": "leading-none"
  }

  // Returns the proper classname if alignment is not default value
  const alignClass = alignment !== "inherit" ? align[alignment] : '';

  // Returns the proper classname if variant is a body value
  const leadingClass = variantType === "body" ? leading[lineHeight] : '';

  // Combine all classes
  const combinedClasses = clsx(styling[variant], alignClass, leadingClass, getFontColor(), { 'truncate': noWrap });

  return <Element className={combinedClasses}>{children}</Element>

  // Check what kind of typography element is used
  function getVariantType() {
    if (variant.startsWith("body")) return "body"
    else if ((variant.startsWith("label") || variant.startsWith("helper"))) return "label"
    else return "heading"
  }

  // Specifies what color should be used
  function getFontColor() {
    if (variantType === "body") return color || "text-foreground-1"
    else if (variantType === "label") return color || "text-foreground"
    else return color || "text-foreground-primary"
  }
}