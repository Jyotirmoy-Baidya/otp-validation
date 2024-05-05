'use client'

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { unstable_getStaticParams } from "next/dist/build/templates/pages";

import { FaEye } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";

const SignupPage
    = () => {
        const router = useRouter();
        const [btnDisabled, setBtnDisabled] = useState(false);
        const [eye, setEye] = useState(false);
        const [loading, setLoading] = useState(false)

        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const onSignup = async (e: any) => {
            e.preventDefault();
            setLoading(true);
            try {
                const resp = await axios.post('/api/users/signup', {
                    username: name,
                    email: email,
                    password: password
                });
                console.log("Signup success", resp);
                router.push('./login');
            } catch (error: any) {
                console.log(error.response.data.error);
                toast.error(error.response.data.error);
            } finally {
                setLoading(false);
            }
        }

        useEffect(() => {
            if (name.length > 0 && email.length > 0 && password.length > 0) {
                setBtnDisabled(false);
            }
            else {
                setBtnDisabled(true);
            }
        }, [name, email, password])

        return (
            <div className="flex justify-center items-center h-screen w-screen bg-slate-950">
                <div className="flex flex-col gap-3 rounded-md shadow-sm shadow-slate-100 bg-slate-800 p-4 form-container">
                    <h1 className="text-slate-300 text-center text-xl tracking-wide font-medium">{
                        loading ?
                            `Registering...` :
                            `Create an Account`
                    }</h1>
                    <hr />
                    <form action="" className="flex flex-col">
                        <label htmlFor="name" className="text-slate-100 tracking-wide font-extralight">Username</label>
                        <input type="text" name="name" placeholder="name" className="bg-slate-400 text-slate-950 p-1 outline-none rounded-sm mb-2 text-sm" value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="email" className="text-slate-100 tracking-wide font-extralight">Email</label>
                        <input type="email" name="email" placeholder="email" className="bg-slate-400 text-slate-950 p-1 outline-none rounded-sm mb-2 text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="password" className="text-slate-100 tracking-wide font-extralight">Password</label>
                        <input type={eye ? "text" : "password"} name="password" placeholder="name" className="bg-slate-400 text-slate-950 p-1 outline-none rounded-sm mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className="text-white" onClick={(e) => { e.preventDefault(); setEye(!eye) }}>{eye ? <FaEye /> : <FaRegEye />}</button>
                        <button type="submit" className="bg-green-700 w-1/2 mx-auto py-1 px-3 rounded-lg hover:bg-green-600 active:scale-100 hover:scale-105 hover:tracking-wide" onClick={onSignup}>
                            {btnDisabled ? "No Signup" : "Singup"}
                        </button>
                        <Link href="/login">Login</Link>
                    </form>
                </div>
            </div>
        )
    }

export default SignupPage
