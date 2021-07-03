export class Order {
  constructor(
    public user: string,
    public cart: [],
    public totalPrice: number,
    public tax: number,
    public subTotal: number,
    public status: string,
    public shippingAddress: string,
    public city: string,
    public country: string,
    public phone: string,
    public createdAt?: Date,
    public _id?: string
  ) {}
}
