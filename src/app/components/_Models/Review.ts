export class Review {
    constructor(
        public product: string,
        public title: string,
        public rating:number,
        public review:string,
        public status?:String,
        public created?:Date,
        public _id?:string,
        public updated?: Date,
        public token?:string,
        )
        {  }
}
