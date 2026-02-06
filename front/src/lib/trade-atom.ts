import { atomWithStorage } from "jotai/utils";

export type TradeItem = {
  price: number;
  quantity: number;
};

export type RegionalTradeData = {
  sell: TradeItem;
  buy: TradeItem[];
};

export type StorageData = Record<number, RegionalTradeData>;

export const tradeAtom = atomWithStorage<StorageData>(
  "dynamic-list",
  {},
  undefined,
  { getOnInit: true }, // Next hydration 안정화
);
