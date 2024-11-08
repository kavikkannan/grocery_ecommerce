'use client'
import Lottie from 'lottie-react'
import backAnimation from "@/public/assests/background.json"
import G from "@/public/assests/groceries.json"

export default function LandingPage(){
    return(
        <div className="h-screen w-full text-xl text-black font-bold  flex justify-center items-center">
            <div className="flex flex-col border-2 h-full w-[25%]  justify-center items-center ">
                <h1 className='text-green-400'>
                    welcome to our groceries store
                </h1>
                <Lottie
                    animationData={G}
                    className=' h-[50vh] '
                    />
            </div>
            <div className="h-full w-[75%] flex justify-center  ">
                <div className=' flex absolute '  >
                <Lottie
                    animationData={backAnimation}
                    className=' h-[100vh] -z-10  transform scale-x-[-1] rotate-180'
                    />
            <Lottie
                    animationData={backAnimation}
                    className='h-[100vh] -z-10 transform scale-x-[1] rotate-180'
                    />
                </div>
           <div className='h-full w-[75%] flex justify-end z-10  '>
           <div className="pallet  h-full w-[75%]  px-10 grid grid-cols-2 items-center ">
                
                <div className="h-[50%] w-[50%] bg-green-400 rounded-2xl  justify-center items-center hover:-translate-y-2 shadow-2xl hover:shadow-green-400 shadow-green-700 ">
                <h1 >
                     fruits

                     </h1>
                    
                     <img src="./images/fruits.png" alt="ae"  className=''/>

                    
                     
                     </div>
                <div className="h-[50%] w-[50%] bg-green-400 rounded-2xl flex justify-center items-center hover:-translate-y-2 shadow-2xl hover:shadow-green-400 shadow-green-700"> vegetables</div>
                <div className="h-[50%] w-[50%] bg-green-400 rounded-2xl flex justify-center items-center hover:-translate-y-2 shadow-2xl hover:shadow-green-400 shadow-green-700"> dairy</div>
                <div className="h-[50%] w-[50%] bg-green-400 rounded-2xl flex justify-center items-center hover:-translate-y-2 shadow-2xl hover:shadow-green-400 shadow-green-700"> snacks</div>
            </div>
           </div>
                
            </div>
            
        </div>
    )
}