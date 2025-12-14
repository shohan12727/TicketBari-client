import React from "react";
import Banner from "./Banner";
import WhyChooseUs from "./WhyChooseUs";
import CommonQandA from "./CommonQandA";
import PopularRoutes from "./PopularRoutes";
import HowTicketBariWorks from "./HowTicketBariWorks";

const Home = () => {
  return (
    <div>
      <Banner />
      <WhyChooseUs />
      <HowTicketBariWorks />
      <CommonQandA />
      <PopularRoutes />
    </div>
  );
};

export default Home;
