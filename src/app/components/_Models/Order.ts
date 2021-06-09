export class Order {
    constructor(
        public user: string,
        public orderItems: string,
        public totalPrice: number,
        public status: string,
        public shippingAddress: string,
        public city: string,
        public country: string,
        public phone: string,
        public createdAt?:Date,
        public _id?:string,
    )

    {}
}