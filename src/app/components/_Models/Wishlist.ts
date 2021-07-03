export class Wishlist {
    constructor(
        public product: string,
      
       public isLiked:Boolean,
     
        public created?:Date,
        public _id?:string,
        public updated?: Date,
        public token?:string,
        )
        {  }
}
