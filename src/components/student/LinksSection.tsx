import {
    FaGithub, FaLinkedin, FaRegAddressCard
} from "react-icons/fa";
import { FaSquareInstagram, FaXTwitter } from "react-icons/fa6";
import { SiLeetcode, SiGeeksforgeeks, SiCodechef, SiHackerrank } from "react-icons/si";

const LinksSection = ({ studentData }: { studentData: any }) => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-4 mt-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Links:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {studentData?.personalPortfolioLink ? (
                    <a href={studentData.personalPortfolioLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-gray-800 bg-gray-200 rounded p-2 hover:bg-gray-300">
                        <FaRegAddressCard className="mr-2 text-blue-600" /> Portfolio
                    </a>
                ) : (
                    <div className="flex items-center justify-center text-gray-800 bg-gray-200 rounded p-2">
                        <FaRegAddressCard className="mr-2 text-gray-400" /> Portfolio
                    </div>
                )}
                {studentData?.githubLink ? (
                    <a href={studentData.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-gray-800 bg-gray-200 rounded p-2 hover:bg-gray-300">
                        <FaGithub className="mr-2 text-black" /> GitHub
                    </a>
                ) : (
                    <div className="flex items-center justify-center text-gray-800 bg-gray-200 rounded p-2">
                        <FaGithub className="mr-2 text-gray-400" /> GitHub
                    </div>
                )}
                {studentData?.linkedinLink ? (
                    <a href={studentData.linkedinLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-gray-800 bg-gray-200 rounded p-2 hover:bg-gray-300">
                        <FaLinkedin className="mr-2 text-blue-700" /> LinkedIn
                    </a>
                ) : (
                    <div className="flex items-center justify-center text-gray-800 bg-gray-200 rounded p-2">
                        <FaLinkedin className="mr-2 text-gray-400" /> LinkedIn
                    </div>
                )}
                {studentData?.instagramLink ? (
                    <a href={studentData.instagramLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-gray-800 bg-gray-200 rounded p-2 hover:bg-gray-300">
                        <FaSquareInstagram className="mr-2 text-pink-500" /> Instagram
                    </a>
                ) : (
                    <div className="flex items-center justify-center text-gray-800 bg-gray-200 rounded p-2">
                        <FaSquareInstagram className="mr-2 text-gray-400" /> Instagram
                    </div>
                )}
                {studentData?.twitterLink ? (
                    <a href={studentData.twitterLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-gray-800 bg-gray-200 rounded p-2 hover:bg-gray-300">
                        <FaXTwitter className="mr-2 text-blue-500" /> Twitter
                    </a>
                ) : (
                    <div className="flex items-center justify-center text-gray-800 bg-gray-200 rounded p-2">
                        <FaXTwitter className="mr-2 text-gray-400" /> Twitter
                    </div>
                )}
                {studentData?.leetcodeLink ? (
                    <a href={studentData.leetcodeLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-gray-800 bg-gray-200 rounded p-2 hover:bg-gray-300">
                        <SiLeetcode className="mr-2 text-yellow-500" /> LeetCode
                    </a>
                ) : (
                    <div className="flex items-center justify-center text-gray-800 bg-gray-200 rounded p-2">
                        <SiLeetcode className="mr-2 text-gray-400" /> LeetCode
                    </div>
                )}
                {studentData?.hackerRankLink ? (
                    <a href={studentData.hackerRankLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-gray-800 bg-gray-200 rounded p-2 hover:bg-gray-300">
                        <SiHackerrank className="mr-2 text-green-500" /> HackerRank
                    </a>
                ) : (
                    <div className="flex items-center justify-center text-gray-800 bg-gray-200 rounded p-2">
                        <SiHackerrank className="mr-2 text-gray-400" /> HackerRank
                    </div>
                )}
                {studentData?.codechefLink ? (
                    <a href={studentData.codechefLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-gray-800 bg-gray-200 rounded p-2 hover:bg-gray-300">
                        <SiCodechef className="mr-2 text-purple-600" /> CodeChef
                    </a>
                ) : (
                    <div className="flex items-center justify-center text-gray-800 bg-gray-200 rounded p-2">
                        <SiCodechef className="mr-2 text-gray-400" /> CodeChef
                    </div>
                )}
                {studentData?.geeksForGeeksLink ? (
                    <a href={studentData.geeksForGeeksLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-gray-800 bg-gray-200 rounded p-2 hover:bg-gray-300">
                        <SiGeeksforgeeks className="mr-2 text-green-500" /> GeeksforGeeks
                    </a>
                ) : (
                    <div className="flex items-center justify-center text-gray-800 bg-gray-200 rounded p-2">
                        <SiGeeksforgeeks className="mr-2 text-gray-400" /> GeeksforGeeks
                    </div>
                )}
            </div>
        </div>
    );
};

export default LinksSection;
