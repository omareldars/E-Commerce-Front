export class Merchant {
    constructor(public name: string,
        public email: string,
        public phoneNumber: string,
        public business : string,
        public isActive? : string,
        public created?: Date,
        public updated? : Date,
        public status? : string,
        public token?:string,
        )

        {  }
}
