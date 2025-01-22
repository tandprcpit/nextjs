import Image from 'next/image';
import { useEffect } from 'react';

const PersonalProject = ({ studentData }: { studentData: any }) => {

    useEffect(() => {
        console.log("profile123    : ", studentData)
    }, [studentData]);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-4 mt-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Projects:</h3>
            <div className="flex flex-wrap md:flex-nowrap gap-4 mt-4">
                {/* Project 1 */}
                <div className="w-full md:w-1/2 flex flex-col items-center p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800">
                    <div className="w-full h-40 relative">
                        <Image
                            src="https://corporate-assets.lucid.co/chart/09255df0-f147-42b4-805e-163ad3001feb.png?v=1707845547429"
                            alt="Project 1"
                            className="rounded-md object-cover"
                            fill
                            priority={false}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                    </div>
                    <div className="w-full flex flex-col items-start mt-4">
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{studentData?.projectTitle1}</h4>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">{studentData?.projectDescription1}</p>
                        <div className="mt-4 w-full">
                            <a href={studentData?.projectLink1} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 text-gray-800 bg-gray-200 rounded hover:bg-gray-300">Explore</a>
                        </div>
                    </div>
                </div>
                {/* Project 2 */}
                <div className="w-full md:w-1/2 flex flex-col items-center p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800">
                    <div className="w-full h-40 relative">
                        <Image
                            src="https://s3-ap-south-1.amazonaws.com/static.awfis.com/wp-content/uploads/2017/07/07184649/ProjectManagement.jpg"
                            alt="Project 2"
                            className="object-cover rounded-md"
                            fill  
                            priority={false} 
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                        />

                    </div>
                    <div className="w-full flex flex-col items-start mt-4">
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{studentData?.projectTitle2}</h4>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">{studentData?.projectDescription2}</p>
                        <div className="mt-4 w-full">
                            <a href={studentData?.projectLink2} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 text-gray-800 bg-gray-200 rounded hover:bg-gray-300">Explore</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalProject;
