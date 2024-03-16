import mongoose, { Schema, HydratedDocument } from "mongoose";

export interface IUserModel {
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUserModel>({
    name: {
        type: String,
        trim: true
    },
    password: {
        type: String
    }
},
    { timestamps: true }
);

export type IUserDocument = HydratedDocument<IUserModel>;

const User = mongoose.model<IUserModel>("users", userSchema);

export default User;