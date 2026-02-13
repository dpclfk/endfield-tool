import { nanum_brush } from "@/style/fonts";
import { ThemeSwitch } from "./theme-switch";
import Link from "next/link";

export default function GNB() {
  return (
    <div className="sticky top-0 bg-zinc-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="w-[90%] mx-auto flex justify-between items-center">
        <div className={`${nanum_brush.className} h-[4rem] flex items-center`}>
          <Link className="text-4xl" href="/">
            엔드필드 tool
          </Link>
        </div>
        <ThemeSwitch></ThemeSwitch>
      </div>
    </div>
  );
}
