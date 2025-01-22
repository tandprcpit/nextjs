import Image from 'next/image';
import { useEffect } from 'react';

const ProfileCard = ({ studentData }: { studentData: any }) => {

    useEffect(() => {
        console.log("profile    : ", studentData)
    }, [studentData]);

    return (
        <div className="bg-gray-200 shadow-md h-full w-full md:w-[30%] rounded-lg dark:bg-neutral-800 p-4 pt-[150px]">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
                <div className="flex justify-center">
                    <div className="relative w-72 h-72 -mt-[150px]">
                        <Image
                            src={studentData?.image || "/image.png"}
                            alt="Profile"
                            className="rounded-2xl border-4 border-white shadow-lg"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                            priority 
                        />


                    </div>
                </div>

                <div className="text-center mt-6">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                        {studentData?.firstName} {studentData?.lastName}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        {studentData?.areaOfInterest || "N/A"}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        {studentData?.aboutYou || "No bio available."}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Branch: <span className="font-bold">{studentData?.department || "N/A"}</span>
                    </p>
                </div>

                {/* Skills Section */}
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Skills:</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {['Java', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'HTML', 'CSS', 'Git', 'TypeScript'].map(skill => (
                            <span key={skill} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full px-3 py-1 text-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
