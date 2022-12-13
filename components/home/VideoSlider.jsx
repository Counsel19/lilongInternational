import SliderStyles from "../../styles/home/VideoSlider.module.css";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppContext } from "../../context/AppContext";
import { TailSpin } from "react-loader-spinner";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "gray",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#172155",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

const VideoSlider = () => {
  const { videoLinks } = useAppContext();

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 1,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
     
    ],
  };
  return (
    <div className={SliderStyles.container}>
      {videoLinks ? (
        <div>
          <Slider {...settings}>
            {videoLinks.map((item) => (
              <div key={item.link} className={SliderStyles.playerWrapper}>
                <ReactPlayer
                  className={SliderStyles.reactPlayer}
                  url={item.link}
                  width="100%"
                  height="100%"
                />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <TailSpin />
      )}
    </div>
  );
};

export default VideoSlider;
