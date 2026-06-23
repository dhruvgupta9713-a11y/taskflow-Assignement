import { Metadata } from "next";
import { mockBoards, mockColumns, getTasks } from "@/lib/mock/data";
import { PublicBoardClient } from "./client";

interface Props {
  params: { boardId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const board = mockBoards.find((b) => b.id === params.boardId);

  if (!board || !board.isPublic) {
    return {
      title: "Board Not Found — TaskFlow",
      description: "This board does not exist or is not publicly shared.",
    };
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/public/board/${board.id}`;

  return {
    title: `${board.name} — TaskFlow`,
    description: board.description,
    openGraph: {
      title: board.name,
      description: board.description,
      url,
      siteName: "TaskFlow",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: board.name,
      description: board.description,
    },
  };
}

function getJsonLd(board: { name: string; description: string; id: string }) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/public/board/${board.id}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: board.name,
    description: board.description,
    url,
    isPartOf: {
      "@type": "WebApplication",
      name: "TaskFlow",
      url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    },
  };
}

export default function PublicBoardPage({ params }: Props) {
  const board = mockBoards.find((b) => b.id === params.boardId);

  if (!board || !board.isPublic) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-200 mb-2">
            Board Not Found
          </h1>
          <p className="text-zinc-500">
            This board does not exist or is not publicly shared.
          </p>
        </div>
      </div>
    );
  }

  const columns = mockColumns
    .filter((c) => c.boardId === board.id)
    .sort((a, b) => a.order - b.order);

  const tasks = getTasks()
    .filter((t) => t.boardId === board.id)
    .sort((a, b) => a.order - b.order);

  const jsonLd = getJsonLd(board);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PublicBoardClient board={board} columns={columns} tasks={tasks} />
    </>
  );
}
