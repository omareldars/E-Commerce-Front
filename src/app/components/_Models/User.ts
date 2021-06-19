export class User {
    constructor(public fname: string,
        public lname: string,
        public username: string,
        public password : string,
        public email :string,
        public phone :number,
        public city :string,
        public country :string,
        public confirmpassword:string,
        public dob ?: Date,
        public _id?:string,
        public  googleId?:string,
        public  facebookId?:string,
        public token?:string,
        )

        {  }
}
