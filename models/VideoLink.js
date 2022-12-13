import mongoose from "mongoose";

const VideoLinkSchema = mongoose.Schema(
  {
    title: {
      type: String,
     
    },
    author: {
      type: String,
     
    },
    link: {
      type: String,
      required: [true, "Please provide a  link"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.VideoLink || mongoose.model("VideoLink", VideoLinkSchema);
