import { openai } from "@/app/api/assistant/route";
import { uploadBlob } from "@/app/shared/file-upload";

import { AssistantMessage, AssistantStep } from "@/app/shared/types";

import OpenAI from "openai";
import {
  CodeToolCall,
  RunStep,
  ToolCallsStepDetails,
} from "openai/resources/beta/threads/runs/steps.mjs";

export async function processSteps(
  steps: OpenAI.Beta.Threads.Runs.Steps.RunStepsPage,
  sendMessage: (message: AssistantMessage | AssistantStep) => void,
  sentMessages: {
    code: boolean;
    image: boolean;
  }
) {
  for (const step of steps.data) {
    if (step.type === "tool_calls") {
      const toolCallsDetails = step.step_details as ToolCallsStepDetails;
      const codeInterpreterCall = toolCallsDetails.tool_calls.find(
        (call) => call.type === "code_interpreter"
      ) as CodeToolCall | undefined;

      if (codeInterpreterCall) {
        const currentInput = codeInterpreterCall.code_interpreter.input.trim();
        const imageOutput = codeInterpreterCall.code_interpreter.outputs.find(
          (output) => output.type === "image"
        ) as CodeToolCall.CodeInterpreter.Image | undefined;

        if (currentInput !== "" && !sentMessages.code) {
          handleCodeInterpreterInputChange(step, currentInput, sendMessage);
          sentMessages.code = true;
        }

        if (imageOutput && !sentMessages.image) {
          await handleImageOutputChange(
            step,
            imageOutput.image.file_id,
            sendMessage
          );
          sentMessages.image = true;
        }
      }
    }
  }
  return sentMessages;
}

function handleCodeInterpreterInputChange(
  step: RunStep,
  input: string,
  sendMessage: (message: AssistantMessage | AssistantStep) => void
): void {
  sendMessage({
    id: step.id,
    type: "step",
    content: "```python\n" + input + "\n```",
    ui: "code-input",
  });
}

async function handleImageOutputChange(
  step: RunStep,
  imageFileId: string,
  sendMessage: (message: AssistantMessage | AssistantStep) => void
): Promise<void> {
  const response = await openai.files.content(imageFileId);
  const data = await response.arrayBuffer();
  const url = await uploadBlob(Buffer.from(data));
  sendMessage({
    id: step.id,
    type: "step",
    content: url,
    ui: "code-output",
  });
}
