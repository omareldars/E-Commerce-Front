
export class Product {
    constructor(
        public title: string,
        public description: string,
        public price:string,
        public photo:string,
        public quantity:string,

        public isActive?:Boolean,
        public createdAt?:Date,
        public token ?: Date,
        public _id?:string,
        )

        {  }
}
