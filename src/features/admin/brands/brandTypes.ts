export interface Brand {
  id: number;
  name: string;
  description: string;
}

export interface CreateBrandRequest {
  name: string;
  description: string;
}

export interface UpdateBrandRequest {
  id: number;
  name: string;
  description: string;
}
