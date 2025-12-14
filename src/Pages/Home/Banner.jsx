// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import bannerImg1 from "../../assets/Banner/banner1.jpg";
// import bannerImg2 from "../../assets/Banner/banner2.jpg";
// import bannerImg3 from "../../assets/Banner/banner3.jpg";
// import bannerImg4 from "../../assets/Banner/banner4.jpg";

// const Banner = () => {
//   const images = [bannerImg1, bannerImg2, bannerImg3, bannerImg4];

//   return (
//     <Carousel
//       autoPlay
//       infiniteLoop
//       showThumbs={false}
//       showStatus={false}
//       interval={1500}
//       transitionTime={500}
//       swipeable={true}
//       //   emulateTouch={true}
//     >
//       {images.map((img, index) => (
//         <div key={index} className="md:h-[550px] h-full">
//           <img
//             src={img}
//             className="h-full w-full object-cover"
//             alt="Banner image"
//           />
//         </div>
//       ))}
//     </Carousel>
//   );
// };

// export default Banner;



import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImg1 from "../../assets/Banner/banner1.jpg";
import bannerImg2 from "../../assets/Banner/banner2.jpg";
import bannerImg3 from "../../assets/Banner/banner3.jpg";
import bannerImg4 from "../../assets/Banner/banner4.jpg";
import { Link } from "react-router";

const Banner = () => {
  const slides = [
    {
      image: bannerImg1,
      title: "Book Your Journey With Confidence",
      subtitle: "Bus, Train, Launch & Flight tickets at your fingertips",
    },
    {
      image: bannerImg2,
      title: "Smart Travel Starts Here",
      subtitle: "Compare prices and book instantly",
    },
    {
      image: bannerImg3,
      title: "Travel Made Simple",
      subtitle: "Secure booking and real-time availability",
    },
    {
      image: bannerImg4,
      title: "Plan Less. Travel More.",
      subtitle: "Trusted vendors, seamless experience",
    },
  ];

  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={3000}
      transitionTime={600}
      swipeable
    >
      {slides.map((slide, index) => (
        <div key={index} className="relative md:h-[550px] h-[320px]">
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

          {/* Text Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-6xl px-6 md:px-12 text-left">
              <h1 className="text-white text-2xl md:text-5xl font-bold leading-tight">
                {slide.title}
              </h1>
              <p className="text-gray-200 mt-3 md:mt-5 text-sm md:text-lg max-w-xl">
                {slide.subtitle}
              </p>

              <Link to='/all-tickets'>
              <button className="mt-6 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition">
                Explore Tickets
              </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;

