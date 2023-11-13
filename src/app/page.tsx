"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAssistant_experimental } from "@/app/hooks/use-assistant";
import { Message } from "ai/react";
import { useEffect, useRef } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { TextareaAutosize } from "@/components/textarea-autosize";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CodeInterpreterCollapsible } from "@/components/code-dropdown";
import ImagePlot from "@/components/image-card";
import { Bot, User } from "lucide-react";
import { LoadingCircle } from "@/components/icons";

const roleToColorMap: Record<Message["role"], string> = {
  system: "red",
  user: "black",
  function: "blue",
  assistant: "green",
};

export default function Chat() {
  const { status, messages, input, submitMessage, handleInputChange, error } =
    useAssistant_experimental({
      api: "/api/assistant",
    });

  const formRef = useRef<HTMLFormElement>(null);
  // When status changes to accepting messages, focus the input:
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (status === "awaiting_message") {
      inputRef.current?.focus();
    }
  }, [status]);

  return (
    <main className="flex flex-col items-center justify-between pb-40">
      {error != null && (
        <div className="relative bg-red-500 text-white px-6 py-4 rounded-md">
          <span className="block sm:inline">
            Error: {(error as any).toString()}
          </span>
        </div>
      )}

      {messages.map((m: Message) => (
        <div
          key={m.id}
          className={cn(
            "flex w-full items-center justify-center border-b border-gray-200 py-8",
            m.role === "user" ? "bg-white" : "bg-white"
          )}
        >
          <div className="flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0">
            <div
              className={cn(
                "p-1.5 text-white",
                m.role === "assistant" ? "bg-green-500" : "bg-black"
              )}
            >
              {m.role === "user" ? <User width={20} /> : <Bot width={20} />}
            </div>

            {m.ui && m.ui === "code-input" ? (
              <CodeInterpreterCollapsible code={m.content} />
            ) : m.ui && m.ui === "code-output" ? (
              <ImagePlot src={m.content} />
            ) : (
              <ReactMarkdown
                className="prose mt-1 w-full break-words prose-p:leading-relaxed"
                remarkPlugins={[remarkGfm]}
                components={{
                  a: (props) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {m.content}
              </ReactMarkdown>
            )}
          </div>
        </div>
      ))}

      <form
        onSubmit={submitMessage}
        ref={formRef}
        className="fixed bottom-12 w-full max-w-3xl rounded-lg border  px-4 pb-2 pt-3 shadow-sm  focus-visible:ring-1 focus-visible:ring-ring sm:pb-3 sm:pt-4"
      >
        <TextareaAutosize
          ref={inputRef}
          tabIndex={0}
          required
          rows={1}
          autoFocus
          placeholder="Send a message"
          value={input}
          disabled={status !== "awaiting_message"}
          onChange={handleInputChange}
          className="h-3 min-h-0 py-0 pl-4 pr-8"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              formRef.current?.requestSubmit();
              e.preventDefault();
            }
          }}
          spellCheck={false}
        />
        <button
          className={cn(
            "absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md transition-all"
          )}
          disabled={status === "in_progress"}
        >
          {status === "in_progress" ? (
            <LoadingCircle />
          ) : (
            <PaperAirplaneIcon
              className="text-green-600 h-6 w-6"
              aria-hidden="true"
            />
          )}
        </button>
      </form>
    </main>
  );
}
