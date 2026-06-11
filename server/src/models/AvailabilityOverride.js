import mongoose from "mongoose";

const availabilityOverrideSchema = new mongoose.Schema(
	{
		admin_id: { 
			type: mongoose.Schema.Types.ObjectId, 
			ref: "User", 
			required: true 
		},
		date: { 
			type: String, 
			required: true 
		},       // "2025-06-23" specific date
		startTime: { 
			type: String, 
			required: true 
		}, // "11:00" instead of usual "09:00"
		endTime: { 
			type: String, 
			required: true 
		},   // "17:00"
		isActive: { 
			type: Boolean, 
			default: true 
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model("AvailabilityOverride", availabilityOverrideSchema);