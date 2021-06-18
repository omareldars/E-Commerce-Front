
export class Product {
    constructor(
        public title: string,
        public description: string,
        public price:string,
        public photo:string,
        public quantity:string,
        public category:string,
        public isActive?:Boolean,
        public createdAt?:Date,
        public token ?: string,
        public _id?:string,
        )

        {  }
}
