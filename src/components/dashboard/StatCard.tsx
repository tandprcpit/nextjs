import React from 'react';
import { motion } from 'framer-motion';
import { Building, Users, DollarSign, Briefcase, TrendingUp } from 'lucide-react';

interface StatCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-xl shadow-lg border border-[#90AEAD]"
  >
    <Icon className="w-8 h-8 text-[#244855] mb-4" />
    <h3 className="text-lg font-semibold mb-2 text-[#244855]">{title}</h3>
    <p className="text-4xl font-bold text-[#244855]">{value}</p>
  </motion.div>
);

interface YearCardProps {
  year: string;
  placed: string;
}

const YearCard: React.FC<YearCardProps> = ({ year, placed }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-xl shadow-lg border border-[#90AEAD] text-center"
  >
    <p className="text-lg font-semibold text-[#244855]">Year {year}</p>
    <p className="text-3xl font-bold text-[#244855] mt-2">{placed} Placed</p>
  </motion.div>
);

const PlacementRecord: React.FC = () => {
  return (
    <div className="pt-16 bg-white text-[#244855]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-[#244855]">
            Our Remarkable Placement Journey
          </h4>
          <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-[#90AEAD] text-center font-normal">
            Explore our impressive placement record, with top companies visiting and students securing excellent packages year after year.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard icon={Building} title="Companies Visiting" value="750+" />
          <StatCard icon={Users} title="Total Placed" value="3,700+" />
          <StatCard icon={DollarSign} title="Highest Package" value="19.14 LPA" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-4 pb-8 rounded-xl shadow-lg border border-[#90AEAD] mb-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-[#244855]">Year-wise Placement Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <YearCard year="2021-22" placed="760" />
            <YearCard year="2022-23" placed="475" />
            <YearCard year="2023-24" placed="382*" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl font-bold mb-4 text-[#244855]">Package Details</h3>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-8 h-8 text-[#244855] mr-2" />
              <p className="text-3xl font-bold text-[#244855]">Highest: 19.14 LPA</p>
            </div>
            <div className="flex items-center">
              <Briefcase className="w-8 h-8 text-[#244855] mr-2" />
              <p className="text-3xl font-bold text-[#244855]">Average: 4.0 LPA</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlacementRecord;
