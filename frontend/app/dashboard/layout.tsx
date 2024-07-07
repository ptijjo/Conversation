"use client"
import Header from '@/components/Header'
import Url from '@/lib/Url';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import Loading from '../loading';

const Dashbordlayout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useRouter();
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null; // Vérification de la disponibilité de localStorage


    useEffect(() => {
        if (!token) {
            navigate.push("/");
        }
    }, [token, navigate]);

    const { isPending, error, data: userConnected, fetchStatus } = useQuery({
        queryKey: ["userConnected"],
        queryFn: async () => {
            const data = await axios.get(Url.userConnected, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return data.data.userConnected
        }
    });

    if (isPending) return <Loading/>;

    if (error) return 'An error has occurred: ' + error.message;

    console.log(userConnected);





    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default Dashbordlayout