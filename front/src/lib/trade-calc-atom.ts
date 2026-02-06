import { atom } from "jotai";
import { tradeAtom } from "./trade-atom";

export type CalcData = {
  price: number | "";
  percent: number | "";
};

export const tradeCalcAtom = atom((get) => {
  const allData = get(tradeAtom);
  const calcData: Record<number, CalcData> = {};

  Object.entries(allData).forEach(([id, value]) => {
    const numId: number = Number(id);

    if (value.buy.length === 0 || !value.sell) {
      calcData[numId] = { price: "", percent: "" };
      return;
    }

    const totalBuyPrice: number = value.buy.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);
    const totalBuyQuantity: number = value.buy.reduce((acc, cur) => {
      return acc + cur.quantity;
    }, 0);

    const sellQuantity: number =
      value.sell.quantity >= totalBuyQuantity
        ? totalBuyQuantity
        : value.sell.quantity;

    const sellPrice: number = value.sell.price * sellQuantity;

    const price = sellPrice - totalBuyPrice;
    const percent = totalBuyPrice !== 0 ? (price / totalBuyPrice) * 100 : 0;

    calcData[numId] = {
      price: price,
      percent: percent,
    };
  });

  return calcData;
});
