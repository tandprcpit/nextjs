import { MdOutlineMail } from "react-icons/md";
import { TiPhoneOutline } from "react-icons/ti";
import { BsPostcard } from "react-icons/bs";

const PersonalInfo = ({ studentData }: { studentData: any }) => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Personal Information:</h3>
            <ul className="list-none mt-2 space-y-2">
                <li className="flex items-center">
                    <MdOutlineMail className="text-blue-500 mr-2" />
                    <span className="font-bold">Email:</span> <span>{studentData?.email}</span>
                </li>
                <li className="flex items-center">
                    <TiPhoneOutline className="text-green-500 mr-2" />
                    <span className="font-bold">Phone Number:</span> <span>{studentData?.mobileNumber}</span>
                </li>
                <li className="flex items-center">
                    <BsPostcard className="text-red-500 mr-2" />
                    <span className="font-bold">Resume:</span>
                    <a href={studentData?.resumeLink} className="inline-block px-4 py-2 text-gray-800 bg-gray-200 rounded hover:bg-gray-300 mt-1">Download PDF</a>
                </li>
            </ul>
        </div>
    );
};

export default PersonalInfo;
