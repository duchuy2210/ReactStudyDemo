// function total(a: number, b: number){
//   return a + b;
// }
// function total(a: string, b: string){
//   return a + b;
// }
// total(5,7); // 12
// total('evondev', 'is developer'); // evondev is developer
// function overloading: function have the same name, same amount or different amount of parameters, different type and same or different return type
// function total(a: number, b: number): number;
// function total(a: string, b: string): string;
// function total(a: any, b: any) {
//   return a + b;
// }
// total(5, 7); // 12
// total("a", "b"); // ab
interface Coordinate {
  x: number;
  y: number;
}
// {x: number; y: number}: Coordinate
function parseCoordinate(obj: Coordinate): Coordinate;
function parseCoordinate(x: number, y: number): Coordinate;
function parseCoordinate(arg1: any, arg2?: any): Coordinate {
  let coord = {
    x: arg1 as number,
    y: arg2 as number,
  };
  if (typeof arg1 === "object") {
    coord = {
      ...(arg1 as Coordinate),
    };
  } else {
    coord = {
      x: arg1 as number,
      y: arg2 as number,
    };
  }
  return coord;
}
// Type assertion `as`
parseCoordinate({ x: 10, y: 20 });
parseCoordinate(10, 20);
