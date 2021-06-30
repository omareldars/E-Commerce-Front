export class User {
    constructor(public fname: string,
        public lname: string,
        public username: string,
        public password : string,
        public email :string,
        public phone :number,
        public address: string,
        public city :string,
        public country :string,
        public confirmpassword:string,
        public avatar: string,
        public dob ?: Date,
        public _id?:string,
        public token?:string,
        )

        {  }
}
