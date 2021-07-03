export class Category {
    constructor(
        public name: string,
        public description: string,
        public isActive?:Boolean,
        public created?:Date,
        public _id?:string,
        public updated?: Date,
        public token?:string,
        )
        {  }
}
