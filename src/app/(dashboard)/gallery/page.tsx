"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Event {
  id: string;
  name: string;
  images: string[];
}

// Hero Component
const Hero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.5 }}
      className="text-primary1 py-16 px-8 text-center "
    >
      <h1 className="text-5xl font-bold mb-4">GALLERY</h1>
      <h2 className="text-3xl font-semibold mb-6 text-secondary1">Training And Placement Department</h2>
      <p className="max-w-3xl mx-auto text-lg">
        The Training and Placement Department showcases student achievements, industry partnerships, and various training programs designed to enhance career readiness and placement success. Explore the highlights of student growth and opportunities provided by the department.
      </p>
    </motion.div>
  );
};

// Masonry Gallery Component
const MasonryGallery: React.FC<{ images: string[] }> = ({ images }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-auto"
      columnClassName="bg-clip-padding px-2"
    >
      {images.map((src, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-4"
        >
          <Image
            src={src}
            alt={`Gallery image ${index + 1}`}
            width={300}
            height={300}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      ))}
    </Masonry>
  );
};

// 3D Cube Gallery Component
const CubeGallery: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-64 h-64 mx-auto perspective-1000">
      <div
        className="w-full h-full transition-transform duration-1000 transform-style-3d"
        style={{
          transform: `rotateY(${currentIndex * -180}deg)`,
        }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="absolute w-full h-full backface-hidden"
            style={{
              transform: `rotateY(${((index - currentIndex + images.length) % images.length) * 180}deg) translateZ(52px)`,
              opacity: index >= currentIndex && index < currentIndex + 4 ? 1 : 0,
            }}
          >
            <Image
              src={src}
              alt={`Cube image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full bg-secondary1 text-white px-4 py-2 rounded-l-lg"
      >
        Prev
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full bg-secondary1 text-white px-4 py-2 rounded-r-lg"
      >
        Next
      </button>
    </div>
  );
};

// Tab Gallery Component
const TabGallery: React.FC<{ events: Event[] }> = ({ events }) => {
  return (
    <Tabs defaultValue={events[0].id} className="w-full">
      <TabsList className="flex justify-center mb-8">
        {events.map((event) => (
          <TabsTrigger
            key={event.id}
            value={event.id}
            className="px-4 py-2 text-lg text-primary1 hover:text-secondary1 transition-colors"
          >
            {event.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {events.map((event) => (
        <TabsContent key={event.id} value={event.id}>
          <CubeGallery images={event.images} />
          <div className="mt-8">
            <MasonryGallery images={event.images} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

const GalleryPage: React.FC = () => {
  const [events] = useState<Event[]>([
    {
      id: "placement-drive",
      name: "Placement Drive",
      images: [
        "/gallery/g12.jpg",
        "/gallery/g13.jpg",
        "/gallery/g14.jpg",
        "/gallery/g15.jpg",
        "/gallery/g16.jpg",
        "/gallery/g1.jpg",
        "/gallery/g3.jpg",
        "/gallery/g4.jpg",
        "/gallery/g5.jpg",
        "/gallery/g6.jpg",
        "/gallery/g7.jpg",
        "/gallery/g9.jpg",
        "/gallery/g10.jpg",
        "/gallery/g11.jpg",
      ],
    },
    {
      id: "training-workshop",
      name: "Training Workshop",
      images: [
        "/gallery/g1.jpg",
        "/gallery/g3.jpg",
        "/gallery/g4.jpg",
        "/gallery/g5.jpg",
        "/gallery/g6.jpg",
        "/gallery/g7.jpg",
        "/gallery/g9.jpg",
        "/gallery/g10.jpg",
        "/gallery/g11.jpg",
        "/gallery/g12.jpg",
        "/gallery/g13.jpg",
        "/gallery/g14.jpg",
        "/gallery/g15.jpg",
        "/gallery/g16.jpg",
      ],
    },
    {
      id: "industry-visit",
      name: "Industry Visit",
      images: [
        "/gallery/g6.jpg",
        "/gallery/g7.jpg",
        "/gallery/g8.jpg",
        "/gallery/g9.jpg",
        "/gallery/g10.jpg",
        "/gallery/g11.jpg",
        "/gallery/g12.jpg",
        "/gallery/g13.jpg",
        "/gallery/g1.jpg",
        "/gallery/g2.jpg",
        "/gallery/g3.jpg",
        "/gallery/g4.jpg",
        "/gallery/g5.jpg",
        "/gallery/g14.jpg",
        "/gallery/g15.jpg",
        "/gallery/g16.jpg",
      ],
    },
  ]);

  return (
    <div className="min-h-screen ">
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary1">Event Galleries</h2>
        <TabGallery events={events} />
      </div>
    </div>
  );
};

export default GalleryPage;

