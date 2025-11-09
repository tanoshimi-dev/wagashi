
export interface ApiArgsLogin {
  email?: string | null;
  password?: string | null;
}

export interface ApiArgsCreateProduct {
  product_name: string;
  product_description: string;
  product_price: number;
  category_id?: string | null;
  product_image_file?: File | null;
  tag_ids?: string[] | null;
  ingredient_ids?: string[] | null;
}

export interface ApiArgsUpdateProduct extends ApiArgsCreateProduct {
  product_id: string;
}

export interface ApiArgsCreateAnnouncement {
  title: string;
  announcement: string;
}

export interface ApiArgsUpdateAnnouncement extends ApiArgsCreateAnnouncement {
  id: string;
}
