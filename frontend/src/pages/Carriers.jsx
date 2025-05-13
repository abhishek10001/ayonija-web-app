import React from "react";
import JobsOpening from "../components/JobsOpening";
import Benefits from "./carriers/Benefits";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Carriers = () => {
  return (
    <div>
      <Navbar />
      <Benefits />
      <JobsOpening />
      
      <Footer />
    </div>
  );
};

export default Carriers;
