import { CourseGrid } from '@/components/dashboard/CourseGrid'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { trainingProgramsTab1, trainingProgramsTab2, trainingProgramsTab3 } from '@/data/dashboard'

const page = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20  ">
        <div className="mb-8 mt-5">
          <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-[#244855]">
            Empower Your Future: Training & Placement Programs
          </h4>
          <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-[#90AEAD] text-center font-normal">
            Through our Training and Placement department, we offer a variety of programs aimed at preparing you for a successful career. From Employability Development to Technical Skills Enhancement and Online Certifications, our initiatives are designed to equip you with the essential skills and knowledge for thriving in today&apos;s competitive job market.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="tab1" className="w-full">
            <div className="flex justify-center mb-4">
              <TabsList className="grid grid-cols-1 mx-10 mb-16 sm:grid-cols-2 sm:mb-4 sm:mx-10 lg:grid-cols-3 lg:mg-0 w-full lg:mx-40">
                <TabsTrigger value="tab1" className="font-medium text-[#244855] hover:text-[#E64833]">
                  Employability Development
                </TabsTrigger>
                <TabsTrigger value="tab2" className="font-medium text-[#244855] hover:text-[#E64833]">
                  Technical Skills Development
                </TabsTrigger>
                <TabsTrigger value="tab3" className="font-medium text-[#244855] hover:text-[#E64833]">
                  Online Courses & Certification
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="tab1" className="w-full">
              <CourseGrid courses={trainingProgramsTab1} />
            </TabsContent>
            <TabsContent value="tab2" className="w-full">
              <CourseGrid courses={trainingProgramsTab2} />
            </TabsContent>
            <TabsContent value="tab3" className="w-full">
              <CourseGrid courses={trainingProgramsTab3} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}

export default page;