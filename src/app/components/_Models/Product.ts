
export class Product {
    constructor(
        public title: string,
        public description: string,
        public price:string,
        public photo:string,
        public createdAt?:Date,
        public dob ?: Date,
        public _id?:string,
        )

        {  }
}
