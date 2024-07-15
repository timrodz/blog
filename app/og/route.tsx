import { ImageResponse } from "next/og";

export function GET(request: Request) {
  let url = new URL(request.url);
  let title = url.searchParams.get("title") || "Juan Rodríguez Morais";

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-teal-100">
        <div tw="flex flex-col w-full py-12 px-4 md:items-center justify-center p-8 text-4xl text-teal-800">
          <h2 tw="flex flex-col text-7xl text-teal-700 font-bold text-center">
            {title}
          </h2>
          <h3>Juan Rodríguez Morais - Blog</h3>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
