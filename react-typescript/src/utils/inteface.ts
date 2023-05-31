export interface Product {
  name: string;
  brand: string;
  color: string;
}
export interface extendNewFeature extends Product {
  speed?: string;
}

//union |
//assertion &
export type FinalProduct = Product & extendNewFeature;

export interface ICard {
  title: string;
  description: string;
  image: string;
  link: string;
}
