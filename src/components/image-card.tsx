/* eslint-disable @next/next/no-img-element */
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/fiw0Sm8ha2x
 */
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";

interface ImagePlotProps {
  src: string;
}
export default function ImagePlot({ src }: ImagePlotProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plot</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <img
          alt="Card Image"
          className="aspect-square object-cover border border-zinc-200 w-full rounded-lg overflow-hidden dark:border-zinc-800"
          height={600}
          src={src}
          width={600}
        />
      </CardContent>
    </Card>
  );
}
