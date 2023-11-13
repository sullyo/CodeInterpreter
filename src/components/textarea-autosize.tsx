"use client";

import * as React from "react";
import ReactTextareaAutosize, {
  type TextareaAutosizeProps,
} from "react-textarea-autosize";

import { cn } from "@/lib/utils";

const TextareaAutosize = React.forwardRef<
  HTMLTextAreaElement,
  TextareaAutosizeProps & { skeletonClassName?: string }
>(({ className, skeletonClassName, ...props }, ref) => {
  return (
    <ReactTextareaAutosize
      className={cn(
        "max-h-40 min-h-[50px] w-full bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

TextareaAutosize.displayName = "TextareaAutosize";

export { TextareaAutosize };
