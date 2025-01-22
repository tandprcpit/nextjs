import { motion } from "framer-motion";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="h-[45rem] flex flex-col md:flex-row overflow-hidden ">
   
      <div className="flex-1 md:w-[60%] flex flex-col justify-center items-start p-12 relative">
       
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-bold text-xs md:text-5xl text-center text-white py-4 flex items-center gap-4 flex-col"
        >
          <div className="flex items-left">
            <Image
              src="/rcpitlogo.png"
              alt="RCPIT Logo"
              width={180}
              height={180}
              className="w-24 h-24 md:w-24 md:h-24"
            />
          </div>
          <h2 className="text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl text-[#90AEAD]">
            Shirpur Education Society&apos;s
          </h2>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl text-[#244855]">
            R. C. Patel Institute of Technology, Shirpur
          </h1>

          <div className="space-y-2">
            <p className="text-lg text-[#90AEAD] md:text-xl">
              An Autonomous Institute
            </p>
            <p className="text-lg text-[#90AEAD] md:text-xl">
              Affiliated to DBATU, Lonere (M.S.)
            </p>
          </div>
          <span className="text-base md:text-4xl block text-[#244855] font-semibold">
            Training and Placement Department
          </span>
        </motion.div>
      </div>

      {/* Background Logo Area */}
      <div className="flex-none md:w-[40%] flex justify-center items-center relative">
        <Image
          src="/recruitment.avif"
          alt="Background"
          width={400}
          height={400}
          className="object-cover filter"
        />
      </div>
    </div>
  );
};

export default HeroSection;
