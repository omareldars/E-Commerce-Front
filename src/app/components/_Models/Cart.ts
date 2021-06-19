export class Cart {
  constructor(
    public products: string,
    public created?:Date,
    public token ?: string,
    public _id?:string,
  )
  {  }
}
