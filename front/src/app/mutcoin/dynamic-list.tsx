"use client";

import { onlyFloat, onlyInteger } from "@/lib/input-number";
import { RegionalTradeData, tradeAtom } from "@/lib/trade-atom";
import { useAtom } from "jotai";
import { RotateCcwIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import TradeCalc from "./trade-calc";

const initialData: RegionalTradeData = {
  sell: { price: 0, quantity: 0 },
  buy: [{ price: 0, quantity: 0 }],
};

export default function DynamicList({ listId }: { listId: number }) {
  const [allData, setAllData] = useAtom(tradeAtom);
  const [isMounted, setIsMounted] = useState(false);
  const inputClassName =
    "px-2 py-1 w-full bg-zinc-50 dark:bg-gray-800 text-end rounded-sm outline-none ring focus:ring-blue-300 dark:focus:ring-blue-700 dark:ring-gray-600";
  const inputParentClassName = "col-span-2 rounded-sm mx-1";

  // 브라우저에 마운트된 직후에만 true가 됨
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const items = allData[listId] ?? initialData;

  const getValidItem = (prev: Record<number, RegionalTradeData>) => {
    return prev[listId] ?? initialData;
  };

  const updateSell = (value: number, field: "price" | "quantity") => {
    setAllData((prev) => {
      const currentItem = getValidItem(prev);
      return {
        ...prev,
        [listId]: {
          ...currentItem,
          sell: { ...currentItem.sell, [field]: value },
        },
      };
    });
  };

  const updateBuy = (
    index: number,
    value: number,
    field: "price" | "quantity",
  ) => {
    setAllData((prev) => {
      const currentItem = getValidItem(prev);
      return {
        ...prev,
        [listId]: {
          ...currentItem,
          buy: currentItem.buy.map((item, idx) =>
            idx === index ? { ...item, [field]: value } : item,
          ),
        },
      };
    });
  };

  const addBuyRow = () => {
    setAllData((prev) => {
      const currentItem = getValidItem(prev);
      return {
        ...prev,
        [listId]: {
          ...currentItem,
          buy: [...currentItem.buy, { price: 0, quantity: 0 }],
        },
      };
    });
  };

  const deleteBuyRow = (deleteIndex: number) => {
    setAllData((prev) => {
      const currentItem = getValidItem(prev);
      if (currentItem.buy.length <= 1)
        return {
          ...prev,
          [listId]: {
            ...currentItem,
            buy: [{ price: 0, quantity: 0 }],
          },
        };
      return {
        ...prev,
        [listId]: {
          ...currentItem,
          buy: currentItem.buy.filter((_, index) => index !== deleteIndex),
        },
      };
    });
  };

  const resetSell = () => {
    setAllData((prev) => {
      const currentItem = getValidItem(prev);
      return {
        ...prev,
        [listId]: {
          ...currentItem,
          sell: { price: 0, quantity: 0 },
        },
      };
    });
  };

  if (!isMounted) {
    return <div className="flex items-center justify-center">로딩중</div>;
  }

  return (
    <>
      <div className="grid grid-cols-6 border-b border-red-300 dark:border-red-700 mb-2 pb-2">
        <p className="flex items-center">판매 :</p>
        <div className={`${inputParentClassName}`}>
          <input
            className={`${inputClassName}`}
            type="number"
            value={
              items.sell.price || items.sell.price !== 0 ? items.sell.price : ""
            }
            onChange={(e) => {
              updateSell(onlyFloat(e.target.value), "price");
            }}
          />
        </div>
        <div className={`${inputParentClassName}`}>
          <input
            className={`${inputClassName}`}
            type="number"
            value={
              items.sell.quantity || items.sell.quantity !== 0
                ? items.sell.quantity
                : ""
            }
            onChange={(e) => {
              updateSell(onlyInteger(e.target.value), "quantity");
            }}
          />
        </div>
        <div className="bg-red-500 w-8 h-8 py-1 flex items-center justify-center mx-auto rounded-sm hover:bg-red-700 hover:dark:bg-red-300">
          <RotateCcwIcon onClick={() => resetSell()} />
        </div>
      </div>
      {/* 아래부터 구매관련 div */}
      <div className="flex flex-col gap-2">
        {items.buy.map((value, index) => (
          <div key={`${listId}-${index}`} className="flex items-center gap-2">
            <div className="flex items-center gap-2 w-full">
              <div className="grid grid-cols-6">
                <p className="flex items-center">구매 :</p>
                <div className={`${inputParentClassName}`}>
                  <input
                    className={`${inputClassName}`}
                    type="number"
                    value={value.price || value.price !== 0 ? value.price : ""}
                    onChange={(e) => {
                      updateBuy(index, onlyFloat(e.target.value), "price");
                    }}
                  />
                </div>
                <div className={`${inputParentClassName}`}>
                  <input
                    className={`${inputClassName}`}
                    type="number"
                    value={
                      value.quantity || value.quantity !== 0
                        ? value.quantity
                        : ""
                    }
                    onChange={(e) => {
                      updateBuy(index, onlyInteger(e.target.value), "quantity");
                    }}
                  />
                </div>
                <div className="bg-red-500 w-8 h-8 py-1 flex items-center justify-center mx-auto rounded-sm hover:bg-red-700 hover:dark:bg-red-300">
                  <Trash2Icon onClick={() => deleteBuyRow(index)} />
                </div>
              </div>
            </div>
          </div>
        ))}
        <TradeCalc listId={listId}></TradeCalc>
        <button
          onClick={() => addBuyRow()}
          className="bg-blue-500 text-white px-2 rounded hover:bg-blue-700 hover:dark:bg-blue-300"
        >
          +
        </button>
      </div>
    </>
  );
}
