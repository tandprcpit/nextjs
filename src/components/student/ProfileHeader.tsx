const ProfileHeader = () => {
    return (
        <div className="flex gap-2">
            <div key={"first"} className="h-20 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 flex items-center justify-center">
                <h1 className="text-4xl font-normal text-neutral-600 dark:text-neutral-400">Student</h1>
            </div>
        </div>
    );
};

export default ProfileHeader;
