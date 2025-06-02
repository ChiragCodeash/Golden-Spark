"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import ShopByCollection from "@/components/home/ShopByCollection";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PerfectChoice from "@/components/home/PerfectChoice";
import BrowseLatestArrivals from "@/components/home/BrowseLatestArrivals";
import Faq from "@/components/home/Faq";
import ForThePeople from "@/components/home/ForThePeople";
import FavoriteProducts from "@/components/home/FavoriteProducts";
import OurJournals from "@/components/home/OurJournals";
import Instagram from "@/components/home/Instagram";
import LoadingSpinner from "@/components/LoadingSpinner";
import AOS from "aos"; // ✅ Corrected import
import "aos/dist/aos.css";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init({
        duration: 1000,
        once: true,
      });
    }
  }, []);

  useEffect(() => {
    const images = Array.from(document.images);
    const total = images.length;
    let loaded = 0;

    if (total === 0) {
      setLoading(false);
      return;
    }

    const onImageLoad = () => {
      loaded++;
      if (loaded === total) {
        setLoading(false);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        onImageLoad();
      } else {
        img.addEventListener("load", onImageLoad);
        img.addEventListener("error", onImageLoad);
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", onImageLoad);
        img.removeEventListener("error", onImageLoad);
      });
    };
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && (
        <>
          <div data-aos="fade-up">
            <HeroSection />
            <div data-aos="zoom-out-up">
              <ShopByCollection />
            </div>
            <div data-aos="zoom-out-down">
              <PerfectChoice />
            </div>
            <div data-aos="zoom-out-right">
              <BrowseLatestArrivals />
            </div>
            <div data-aos="zoom-out-up">
              <Faq />
            </div>
            <div data-aos="zoom-out-down">
              <ForThePeople />
            </div>
            <div data-aos="zoom-out-left">
              <FavoriteProducts />
            </div>

            <div data-aos="fade-up">
              <OurJournals />
            </div>
            <div data-aos="fade-down">
              <Instagram />
            </div>
          </div>
        </>
      )}
    </>
  );
}
