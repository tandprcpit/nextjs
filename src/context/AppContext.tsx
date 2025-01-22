'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User } from "@/model/User";
import { useSession } from 'next-auth/react';

interface UserContextProps {
    studentData: User | null;
    setstudentData: React.Dispatch<React.SetStateAction<User | null>>;
    fetchstudentData: () => void;
    loading: boolean;
    logout: () => void;
}

interface UserProviderProps {
    children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [studentData, setstudentData] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { data: session } = useSession();

    const fetchstudentData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/fetch-data'); 
            setstudentData(response.data?.user || null); 
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error fetching user data', {
                    message: error.message,
                    name: error.name,
                    code: error.code,
                    config: error.config,
                    response: error.response?.data,
                });
            } else {
                console.error('Unexpected error', error);
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setstudentData(null);
    };

    useEffect(() => {
        if (session?.user && session.user.role === 'student') {
            fetchstudentData();
        }
    }, [session]); 

   

    return (
        <UserContext.Provider value={{ studentData, setstudentData, fetchstudentData, loading, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = (): UserContextProps => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
