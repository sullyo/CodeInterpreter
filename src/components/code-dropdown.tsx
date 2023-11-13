"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Markdown from "@/components/markdown";

interface CodeInterpreterCollapsibleProps {
  code: string;
}

export function CodeInterpreterCollapsible({
  code,
}: CodeInterpreterCollapsibleProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-3/4 space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">Code Interpreter</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronDownIcon className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <Markdown text={code} />
      </CollapsibleContent>
    </Collapsible>
  );
}
