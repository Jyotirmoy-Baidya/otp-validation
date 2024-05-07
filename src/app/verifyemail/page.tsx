"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const VerifyEmail = () => {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, seterror] = useState(false);


    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        console.log(urlToken);
        setToken(urlToken);
        console.log(token)
    }, [token])

    const verifyUserEmail = async () => {
        try {
            const resp = await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (error: any) {
            console.log(error);
            toast.error("Error Occurred");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{!token ? "" : `${token}`}</h2>
            {
                token && (
                    <div>
                        <button className="bg-blue-400" onClick={verifyUserEmail}>Verify</button>
                    </div>
                )
            }
            {
                verified && (
                    <div>
                        <h2 className="text-2xl">Email Verified</h2>
                        <Link href="/login">Login</Link>
                    </div>
                )
            }
            {
                error && (
                    <div>
                        <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail