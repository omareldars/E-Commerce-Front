export class Cartitem {
    constructor(
     public product: string,
      public created?:Date,
      public token ?: string,
      public _id?:string,
    )
    {  }
  }
  