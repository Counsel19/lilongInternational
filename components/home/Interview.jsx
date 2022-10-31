import Image from "next/image";
import InterviewStyles from "../../styles/home/Interview.module.css";
import { BsPlayCircleFill } from "react-icons/bs";

const Interview = () => {
  return (
    <div className={InterviewStyles.container}>
      <div className={InterviewStyles.imgWrapper}>
        <Image
          src="/images/interview.jpg"
          alt="Interview"
          layout="fill"
          objectFit="cover"
          className={InterviewStyles.img}
        />
      </div>
      <div className={InterviewStyles.overlay}>
        <h2>
          Watch our Latest <span>Consultation Video</span>
        </h2>
        <BsPlayCircleFill className={InterviewStyles.icon} />
      </div>
    </div>
  );
};

export default Interview;
