"use client";
import HeroSectionCommon from "@/components/HeroSectionCommon";
import React, { useEffect } from "react";
import ResponsiveFilter from "./components/ResponsiveFilter";
import  AOS  from "aos";
import "aos/dist/aos.css";

function page() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div data-aos="fade-up">
      <HeroSectionCommon heading="Home/Product" />
      <div className="container mx-auto">
        <ResponsiveFilter />
      </div>
    </div>
  );
}

export default page;
