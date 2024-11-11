'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import Router from 'next/router';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkSessionStorage = () => {
    const userId = sessionStorage.getItem('userId');
    const adminStatus = sessionStorage.getItem('isAdmin') === 'true';
    setIsLoggedIn(!!userId);
    setIsAdmin(adminStatus);
  };

  useEffect(() => {
    // Check sessionStorage on component mount
    checkSessionStorage();

    // Event listener for sessionStorage changes
    const handleStorageChange = () => checkSessionStorage();
    window.addEventListener("storage", handleStorageChange);

    // Listen for route changes to check sessionStorage
    const handleRouteChange = () => checkSessionStorage();
    Router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <div className="w-full text-xl text-black font-bold h-[8vh] flex justify-center items-center">
      <div className="h-full w-full bg-white flex justify-around items-center">
        <Link href={'/'} className="flex justify-center items-center gap-1">
          <h1 className="text-white text-2xl font-extrabold h-fit w-fit p-2 bg-black rounded-2xl">KK</h1>
          <h1>GOMart</h1>
        </Link>

        <div className="h-full w-fit flex justify-center items-center gap-2">
          <img className="h-5 w-5" src="./images/location.png" alt="location" />
          <div className="flex flex-col">
            <h1 className="text-xs">Delivery to</h1>
            <h1 className="text-xs">Vellore</h1>
          </div>
        </div>

        <div className="h-10 w-fit flex justify-center items-center border-2 rounded-2xl gap-2 p-2">
          <img className="h-5 w-5" src="./images/magnifying-glass.png" alt="search" />
          <input type="text" className="text-xs border-white border-2 w-96" placeholder="Search by Category or Product Name" />
        </div>

        <div className="flex justify-center items-center gap-3">
          <Link href={'/cart'} className="h-8 w-8 rounded-full bg-green-600 flex justify-center items-center">
            <img className="h-5 w-5" src="./images/shopping-bag.png" alt="cart" />
          </Link>

          {!isLoggedIn ? (
            <Link href={'/login'} className="flex justify-center items-center">
              LOGIN
            </Link>
          ) : isAdmin ? (
            <div className="h-8 w-fit p-3 rounded-2xl bg-orange-500 flex justify-center items-center gap-4">
              <h1 className="text-white text-xs font-bold">ADMIN</h1>
              <Link href={'/productmanagement'}>
                <img className="h-5 w-5" src="./images/user.png" alt="user" />
              </Link>
            </div>
          ) : (
            <div className="h-8 w-8 rounded-full bg-green-600 flex justify-center items-center">
              <Link href={'/productmanagement'}>
                <img className="h-5 w-5" src="./images/user.png" alt="user" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
