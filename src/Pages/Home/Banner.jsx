import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../assets/Banner/banner1.jpg";
import bannerImg2 from "../../assets/Banner/banner2.jpg";
import bannerImg3 from "../../assets/Banner/banner3.jpg";
import bannerImg4 from "../../assets/Banner/banner4.jpg";

const Banner = () => {
  const images = [bannerImg1, bannerImg2, bannerImg3, bannerImg4];

  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={1500}
      transitionTime={500}
      swipeable={true}
      //   emulateTouch={true}
    >
      {images.map((img, index) => (
        <div key={index} className="h-[550px]">
          <img
            src={img}
            className="h-full w-full object-cover"
            alt="Banner image"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
