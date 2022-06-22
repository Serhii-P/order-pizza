export type Pizza = {
  id: string ;
  title: string;
  price: number;
  sizes: number[];
  types: number[]; 
  category: number;
  rating: number;
  imageUrl: string;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
} 

// type SearchPizzaParams = Record<string, string>;
export type SearchPizzaParams = {
  category: string;
   search: string;
   sortBy: string;
   order: string;
   currentPage: string;
}

