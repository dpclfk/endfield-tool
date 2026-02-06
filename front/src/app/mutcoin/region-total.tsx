"use client";

import { tradeCalcAtom } from "@/lib/trade-calc-atom";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

export default function ReginTotal({ listId }: { listId: number[] }) {
  const [mounted, setMounted] = useState(false);
  const tradeCalc = useAtomValue(tradeCalcAtom);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 마운트가 안됐을때 0으로 나오게
  if (!mounted) {
    return <div className="">0</div>;
  }

  const selectedData = listId.map((id) => {
    return tradeCalc[id];
  });

  const totalPrice = selectedData.reduce((acc, current) => {
    // current가 존재하고, 그 안에 price가 숫자인지 확인후, 숫자면 그대로, 아니면 0으로
    const price =
      current && typeof current.price === "number" ? current.price : 0;
    return acc + price;
  }, 0);

  return <div className="">{totalPrice}</div>;
}
