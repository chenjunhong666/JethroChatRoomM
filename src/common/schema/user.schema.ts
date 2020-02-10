
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface User extends Document {
    readonly _id: string;
    readonly username: string;
    readonly password: string;
    sayHello: (user:User)=>void;
}
let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});
UserSchema.methods.sayHello = function() {
    console.log(this.username);
  };
export {UserSchema};