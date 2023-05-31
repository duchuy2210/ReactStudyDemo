import { Product } from "./inteface";

export function total(a: number, b: number){
  return a + b;
}

/*
  Type assignment
*/
// const age:number = 30;
// const school= "Duc huy";


//Interface

const product: Product = {
  name:"car",
  brand:"porsche",
  color:"white",
}
function addProduct(product:Product) {

}