import { Product } from "./Product";

export class Cartitem {
    constructor(
      public product: string,
      public status?: string,
      public created?:Date,
      public token ?: string,
      public _id?:string,
    )
    {  }
  }
  