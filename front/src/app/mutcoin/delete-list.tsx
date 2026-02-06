"use client";

import { tradeAtom } from "@/lib/trade-atom";
import { useAtom } from "jotai";
import { RotateCcwIcon } from "lucide-react";

export default function DeleteList({ listId }: { listId: number }) {
  const [_, setAllData] = useAtom(tradeAtom);

  const deleteList = () => {
    setAllData((prev) => {
      const { [listId]: _, ...rest } = prev;

      return rest;
    });
  };

  return (
    <div className="bg-red-500 w-8 h-8 py-1 flex items-center justify-center mx-auto rounded-sm hover:bg-red-700 hover:dark:bg-red-300">
      <RotateCcwIcon onClick={() => deleteList()} />
    </div>
  );
}
