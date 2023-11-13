import { nanoid } from "@/app/shared/utils";
import { put } from "@vercel/blob";

export async function uploadBlob(input: ArrayBuffer) {
  const blob = await put(`${nanoid}-plot.png`, input, {
    access: "public",
  });

  return blob.url;
}
