import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

// Square, hairline, no fills: the site's own button, not the stock one.
const buttonVariants = cva("cursor-pointer outline-none disabled:pointer-events-none disabled:opacity-50", {
  variants: {
    variant: {
      /** A bordered label, like the language switch. */
      line: "border border-current px-3.5 pt-[9px] pb-2.5 text-sm leading-none transition-colors duration-300 hover:bg-on hover:text-night",
      /** Plain words with a rule that draws in under them. */
      text: "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0_1px] bg-[position:0_100%] bg-no-repeat py-1.5 text-sm tracking-[.02em] transition-[background-size] duration-500 ease-out-expo hover:bg-[length:100%_1px] rtl:bg-[position:100%_100%]",
      /** No styling of its own: a photo or a custom surface that acts as a button. */
      bare: "",
    },
  },
  defaultVariants: { variant: "line" },
});

function Button({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp data-slot="button" type={asChild ? undefined : "button"} className={cn(buttonVariants({ variant }), className)} {...props} />;
}

export { Button, buttonVariants };
