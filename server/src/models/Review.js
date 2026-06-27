import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
	{
		appointment_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Appointment",
			required: true
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		admin_id: { 
			type: mongoose.Schema.Types.ObjectId, 
			ref: "User", 
			required: true
		},
		service_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true,
            index: true
        },
		rating: {
			type: Number,
			required: true,
			min: 1,
			max: 5
		},
		comment: {
			type: String,
			default: ""
		},
		reply: {
            text: { type: String, default: null },
            repliedAt: { type: Date, default: null }
        }
	},
	{
		timestamps: true
	}
);

export default mongoose.model("Review", reviewSchema);