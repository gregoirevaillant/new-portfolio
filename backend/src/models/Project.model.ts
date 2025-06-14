import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Project title is required."],
		},
	},
	{
		timestamps: true,
		versionKey: false
	}
);

// projectSchema.virtual("creator", {
// 	ref: "User",
// 	localField: "creatorID",
// 	foreignField: "_id"
// });
// projectSchema.virtual("ingredientsDetails.ingredient", {
// 	ref: "Ingredient",
// 	localField: "ingredientsDetails.ingredientID",
// 	foreignField: "_id"
// });

const ProjectModel = mongoose.model("Project", projectSchema);

export default ProjectModel;
