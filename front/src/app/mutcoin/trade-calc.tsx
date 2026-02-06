"use client";

import ProfitIcon from "@/components/profit-icon";
import { tradeCalcAtom } from "@/lib/trade-calc-atom";
import { useAtomValue } from "jotai";

export default function TradeCalc({ listId }: { listId: number }) {
  const tradeCalc = useAtomValue(tradeCalcAtom);
  const currentCalc = tradeCalc[listId] ?? { price: "", percent: "" }; // 처음 마운트시 데이터 없을때 방지

  return (
    <div className="grid grid-cols-6 border-t border-red-300 mt-1 pt-1">
      <div className="">
        <p className="flex items-center">이익: </p>
      </div>
      <div className="col-span-2 text-end pr-2">
        <p>
          {currentCalc.price === "" ? "" : currentCalc.price.toLocaleString()}
        </p>
      </div>
      <div className="col-span-3 flex gap-1 items-center">
        <p>
          {currentCalc.percent === ""
            ? ""
            : `(${currentCalc.percent.toFixed(2)}%)`}
        </p>
        <ProfitIcon price={currentCalc.price}></ProfitIcon>
      </div>
    </div>
  );
}
