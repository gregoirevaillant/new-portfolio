import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: [true, "Email is required."],
		},
		password: {
			type: String,
			required: [true, "Password is required."]
		},
	},
	{
		timestamps: true,
		versionKey: false
	}
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
