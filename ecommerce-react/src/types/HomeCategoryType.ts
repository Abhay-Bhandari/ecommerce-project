import type { Deal } from "./DealType";

export interface HomeData{
  id: number;
  grid: HomeCategory[];
  shopByCategories: HomeCategory[];
  electricCategories: HomeCategory[];
  deals: Deal[];
  dealCategories: HomeCategory[];
  
}

export interface HomeCategory{
  id?: number;
  image: string;
  categoryId: string;
  section?: string;
  name?: string;
  parentCategoryId?: string;
}
