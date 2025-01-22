
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { trainingProgramsTab1, trainingProgramsTab2, trainingProgramsTab3 } from "@/data/dashboard"
import { FocusCards } from "../ui/focus-cards"

export function TrainingProgramTab() {
    return (
        <div className=" overflow-hidden antialiased relative flex self-auto [perspective:1000px] [transform-style:preserve-3d] justify-center mb-10">
            <Tabs defaultValue="tab1" className="w-full">
                <div className="flex justify-center mb-4">
                    <TabsList className="grid grid-cols-1 mx-10 mb-16 sm:grid-cols-2 sm:mb-4 sm:mx-10  lg:grid-cols-3 lg:mg-0 w-full lg:mx-40">
                        <TabsTrigger value="tab1">Employability Development</TabsTrigger>
                        <TabsTrigger value="tab2">Technical Skills Development</TabsTrigger>
                        <TabsTrigger value="tab3">Online Courses & Certification</TabsTrigger>
                    </TabsList>

                </div>
                <TabsContent value="tab1" className="w-full">
                    <FocusCards cards={trainingProgramsTab1} />
                </TabsContent>
                <TabsContent value="tab2" className="w-full">
                    <FocusCards cards={trainingProgramsTab2} />
                </TabsContent>
                <TabsContent value="tab3" className="w-full">
                    <FocusCards cards={trainingProgramsTab3} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
