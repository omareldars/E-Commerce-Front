import { Cartitem } from './Cartitem';
export class Cart {

  constructor(
  // public Pid: string,
  // public Pid: string,
    public  products: Array<Cartitem>,
    public created?:Date,
    public token ?: string,
    public _id?:string,
  )
  {  }
}
