'use client'

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);

    const LoginHandler = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const resp = await axios.post('/api/users/login', {
                email: email,
                password: password
            })

            console.log(resp);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            console.log(error.response);
            toast.error("error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (email.length > 0 && password.length > 0) {
            setBtnDisabled(false);
        }
        else {
            setBtnDisabled(true);
        }
    }, [email, password])

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-slate-950">
            <div className="flex flex-col gap-3 rounded-md shadow-sm shadow-slate-100 bg-slate-800 p-4 form-container">
                <h1 className="text-slate-300 text-center text-xl tracking-wide font-medium">{loading ? "Registering" : "Login"}</h1>
                <hr />
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-slate-100 tracking-wide font-extralight">Email</label>
                    <input type="email" name="email" placeholder="email" className="bg-slate-400 text-slate-950 p-1 outline-none rounded-sm mb-2 text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="password" className="text-slate-100 tracking-wide font-extralight">Password</label>
                    <input type="password" name="password" placeholder="name" className="bg-slate-400 text-slate-950 p-1 outline-none rounded-sm mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="bg-green-700 w-1/2 mx-auto py-1 px-3 rounded-lg hover:bg-green-600 active:scale-100 hover:scale-105 hover:tracking-wide" onClick={LoginHandler}>
                        {
                            btnDisabled ? "Fill" : "Submit"
                        }
                    </button>
                    <Link href="/signup">Signup</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage