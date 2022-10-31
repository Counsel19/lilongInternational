import { useRef } from "react";
import { Video, CloudinaryContext } from "cloudinary-react";
import OffersStyles from "../styles/home/Offers.module.css"

const VideoPlayer = ({ cloud_name, publicId }) => {
  const videoRef = useRef();
  return (
    <CloudinaryContext cloud_name={cloud_name}>
      <div className={OffersStyles.video}>
        <Video
          publicId={publicId}
          width="100%"
          innerRef={videoRef}
          autoPlay={true}
          loop={true}
        />
      </div>
    </CloudinaryContext>
  );
};
export default VideoPlayer;
