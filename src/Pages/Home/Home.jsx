import React from "react";
import Banner from "./Banner";
import WhyChooseUs from "./WhyChooseUs";
import CommonQandA from "./CommonQandA";
import PopularRoutes from "./PopularRoutes";
import HowTicketBariWorks from "./HowTicketBariWorks";
import Advertisement from "./Advertisement ";

const Home = () => {
  return (
    <div>
      <Banner />
      <Advertisement />
      <WhyChooseUs />
      <HowTicketBariWorks />
      <PopularRoutes />
      <CommonQandA />
    </div>
  );
};

export default Home;
