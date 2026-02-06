import { Minus, Triangle } from "lucide-react";

export default function ProfitIcon({ price }: { price: number | "" }) {
  if (price === 0) return <Minus className="text-gray-400" size={16} />;
  if (price === "") return <></>;

  return price > 0 ? (
    <Triangle className="text-red-500" size={16} />
  ) : (
    <Triangle className="text-blue-500 rotate-180" size={16} />
  );
}
