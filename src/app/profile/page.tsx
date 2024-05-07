'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logout = async (e: any) => {
        e.preventDefault();
        try {
            const resp = await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.log(error);
            toast.error("error");
        }
    }

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/me');
            console.log(res.data.data);
            setData(res.data.data._id);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load the profile");
        }
    }


    return (
        <div className='flex flex-col items-center gap-4 bg-slate-900 justify-center min-h-screen py-2'>
            <h1 className='text-white text-2xl'>Profile</h1>
            <hr />
            <p className='text-4xl p-2 rounded bg-orange-500 ml-2'>
                <span className='p-2'>{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>
                    {data}</Link>}</span>
            </p>
            <button onClick={logout} className='bg-blue-500 hover:bg-blue-700 font-bold mt-3 py-2 px-4 rounded'>Logout</button>
            <button onClick={getUserDetails} className='bg-green-800 hover:bg-green-500 font-bold mt-3 py-2 px-4 rounded'>Get User Details</button>
        </div>
    )
}

export default ProfilePage