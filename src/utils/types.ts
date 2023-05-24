//Intersection type: &
interface IBusinessPartner {
  name: string;
  credit: number;
}
interface IIdentity {
  id: number;
  name: string;
}
interface IContact {
  email: string;
  phone: string;
}
type Employee = IIdentity & IContact;
type Customer = IBusinessPartner & IContact;

// Type casting - as : covert type sang 1 kiểu type khác
// Type assertion - as : ép kiểu sang 1 type khác