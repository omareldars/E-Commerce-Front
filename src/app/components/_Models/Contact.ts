export class Contact {
    constructor(
        public name: string,
        public email: string,
        public message:String,
        public subject:String,
        public created?:Date,
        public _id?:string,
        public updated?: Date,
        public token?:string,
        )
        {  }
}
