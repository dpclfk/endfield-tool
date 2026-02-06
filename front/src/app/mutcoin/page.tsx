import { getRegionalProducts } from "@/lib/regional-products";
import DynamicList from "./dynamic-list";
import DeleteList from "./delete-list";
import ReginTotal from "./region-total";

export default async function Mutcoin() {
  const data = await getRegionalProducts();

  const regionalProductId = data.data.reduce(
    (acc, region) => {
      const productIds = region.regional_product_list.map((p) => p.id);
      acc[region.region_id] = productIds;
      return acc;
    },
    {} as Record<number, number[]>,
  );

  return (
    <div>
      {data.data.map((item) => (
        <div key={`region-${item.region_name}`} className="w-[90%] mx-auto">
          <div className="flex text-4xl pt-4 pb-2 gap-2">
            <p className="">{item.region_name}</p>
            <p>관리권 이익: </p>
            <ReginTotal listId={regionalProductId[item.region_id]}></ReginTotal>
            <p>개</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 auto-rows-max items-start">
            {item.regional_product_list.map((list) => (
              <div
                key={`list-${list.id}`}
                className="border-3 border-zinc-200 rounded-sm dark:border-gray-700 px-2 py-2 space-y-2 min-h-[12rem]"
              >
                <div className="grid grid-cols-6 mb-0">
                  <p className="truncate col-span-5">
                    {list.regional_product_name}
                  </p>
                  <DeleteList listId={list.id}></DeleteList>
                </div>
                <div className="grid grid-cols-6">
                  <div></div>
                  <p className="col-span-2 text-center">가격</p>
                  <p className="col-span-2 text-center">수량</p>
                  <p className="text-center">삭제</p>
                </div>
                <DynamicList listId={list.id} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
