import mongoose from "mongoose";

const blockedDateSchema = new mongoose.Schema(
	{
		admin_id: { 
			type: mongoose.Schema.Types.ObjectId, 
			ref: "User", required: true 
		},
		date: { 
			type: String, 
			required: true 
		},
		reason: { 
			type: String, 
			default: "" 
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model("BlockedDate", blockedDateSchema);