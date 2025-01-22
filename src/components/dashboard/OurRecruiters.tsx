import React from 'react';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';

const OurRecruiters = () => {
  return (
    <div className="h-auto w-full flex flex-col justify-center bg-white items-center overflow-hidden md:py-0">
      {/* Title Section */}
      <div className="mb-8 mt-5">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-[#244855]">
          Our Esteemed Recruiters
        </h4>
        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-[#90AEAD] text-center font-normal">
          The diverse companies that visit our college, eager to connect with talented students and offer exciting career opportunities.
        </p>
      </div>

      {/* Infinite Moving Cards for Recruiters */}
      <div className="w-full px-20">
        <InfiniteMovingCards items={images1} direction="right" speed="normal" />
      </div>
      <div className="w-full px-20">
        <InfiniteMovingCards items={images2} direction="left" speed="normal" />
      </div>
      <div className="w-full px-20">
        <InfiniteMovingCards items={images3} direction="right" speed="normal" />
      </div>
    </div>
  );
};

const images1 = [
  { src: "/company_photos/company101.png" },
  { src: "/company_photos/company102.jpg" },
  { src: "/company_photos/company103.png" },
  { src: "/company_photos/company104.jpeg" },
  { src: "/company_photos/company105.png" },
  { src: "/company_photos/company106.png" },
  { src: "/company_photos/company107.jpeg" },
];

const images2 = [
  { src: "/company_photos/company108.jpg" },
  { src: "/company_photos/company109.png" },
  { src: "/company_photos/company110.jpeg" },
  { src: "/company_photos/company111.png" },
  { src: "/company_photos/company112.png" },
  { src: "/company_photos/company113.jpeg" },
  { src: "/company_photos/company114.png" },
];

const images3 = [
  { src: "/company_photos/company115.png" },
  { src: "/company_photos/company116.png" },
  { src: "/company_photos/company117.png" },
  { src: "/company_photos/company118.jpeg" },
  { src: "/company_photos/company120.jpeg" },
  { src: "/company_photos/company121.jpeg" },
  { src: "/company_photos/company122.png" },
  { src: "/company_photos/company119.jpeg" },
];

export default OurRecruiters;
