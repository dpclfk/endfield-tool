"use server";

import serverbase from "./server";

export type RegionalProductList = {
  id: number;
  regional_product_name: string;
  price: number;
};

export type Region = {
  region_id: number;
  region_name: string;
  regional_product_list: RegionalProductList[];
};

export type RegionalProductsResponse = {
  status: string;
  message: string;
  data: Region[];
};

export async function getRegionalProducts() {
  try {
    return serverbase.get("regional-product").json<RegionalProductsResponse>();
  } catch (error) {
    console.error("API 에러:", error);
    throw error;
  }
}
