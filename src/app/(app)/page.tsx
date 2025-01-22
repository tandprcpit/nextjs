'use client';

import HeroSection from '@/components/dashboard/HeroSection';
import StatCard from '@/components/dashboard/StatCard';
import OurRecruiters from '@/components/dashboard/OurRecruiters';
import PlacementRecord from '@/components/dashboard/PlacementRecord';
import TnpHead from '@/components/dashboard/TnpHeads';



export default function Home() {

  return (
    <>

      <main className='flex flex-1' >

        <div className=" dark:border-neutral-700 flex flex-col flex-1 w-full h-full no-scrollbar">


          <HeroSection />
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-[#244855] to-transparent mb-8 h-[1px] w-full" />
          <StatCard />
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-[#244855] to-transparent my-8 h-[1px] w-full" />
          <PlacementRecord />
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-[#244855] to-transparent my-8 h-[1px] w-full" />
          <OurRecruiters />
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-[#244855] to-transparent my-8 h-[1px] w-full" />
          <TnpHead />

        </div>
      </main>



    </>
  );
}