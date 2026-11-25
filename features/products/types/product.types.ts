export type ProductSpecification = { name: string; value: string };

export type ProductSubcategory = {
  slug: string;
  name: string;
  description: string;
  count: number;
};

export type ProductCategory = {
  slug: string;
  name: string;
  description: string;
  count: number;
  subcategories: ProductSubcategory[];
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  subcategorySlugs: string[];
  subcategories: ProductSubcategory[];
  price: string;
  image: string;
  images: string[];
  productCode: string;
  specifications: ProductSpecification[];
  isFeatured: boolean;
  featuredSortOrder: number | null;
};
