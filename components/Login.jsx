'use client'
import {useRouter} from "next/navigation"
import Link from "next/link"
import React, { useState } from "react"; 
import Loading from '@/components/Loading';
export default function Login() {
  const [loading, setLoading] = useState(false);
  const router=useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userId = sessionStorage.getItem('userId');
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

  const Signin = async () => {
    try {
      setLoading(true);
  
      // First API call to login
      const loginResponse = await fetch(`http://localhost:9000/api/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });
  
      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
  
        if (loginData.message === 'Login successful') {
          // Second API call to get user information
          const userResponse = await fetch("http://localhost:9000/api/user", {
            method: "GET",
            credentials: "include",
          });
  
          if (userResponse.ok) {
            const userData = await userResponse.json();
            sessionStorage.setItem("userId", userData.ID);
            sessionStorage.setItem("isAdmin", userData.IsAdmin);
            console.log("User ID:", userData.ID);
            console.log("Is Admin:", userData.IsAdmin);
            router.push("/home");
          } else {
            console.error("Failed to retrieve user information");
          }
        } else {
          alert(loginData.message);
        }
      } else {
        const errorData = await loginResponse.json();
        console.error("Login failed:", errorData.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };
    


    return (
      <>
      {loading ? (
          <div className="relative">
          {loading && <Loading />} 
        </div>
      ) : (
      
        <div className="absolute h-screen w-full bg-orange-100 text-black  flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          
          
          <div className=" relative bottom-20 sm:mx-auto sm:w-full sm:max-w-sm">
            
            <h2 className=" mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
              Sign in  account
            </h2>
          </div>
  
          <div className="relative bottom-10 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md p-2 border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-black hover:text-black">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md p-2 border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              
            </form>
            <br/>
            <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md  bg-orange-400 shadow-2xl shadow-black px-3 py-1.5 text-sm font-semibold leading-6 text-black  hover:bg-orange-500  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={Signin}
                >
                   sign in
                </button>
              </div>
            
            <p className="mt-10 text-center text-sm text-black">
              wanna create acc?{' '}
              <a href="reg" className="font-semibold leading-6 text-black hover:text-black">
                Sign Up
              </a>
            </p>
          </div>
        </div>
        
        )}
        </>
    );
      };
