
export default function Header(){
    return(
        <div className=" w-full text-xl text-black font-bold  h-[8vh] flex justify-center items-center">
                <div className="h-full w-full bg-white flex justify-around items-center">
                    <div className="flex justify-center items-center">
                       <h1 className="text-2xl font-extrabold">KK</h1>
                       <h1>
                        GOMart
                       </h1>
                    </div>
                        <div className="h-full w-fit  flex justify-center items-center gap-2 ">
                            <img className="h-5 w-5" src="./images/location.png" alt="location png" />
                            <div className="flex flex-col ">
                                <h1 className="text-xs">
                                    Delivery to
                                </h1>
                                <h1 className="text-xs">
                                    Vellore
                                </h1>
                            </div>
                       </div>
                    <div className="h-10 w-fit flex justify-center items-center border-2 rounded-2xl gap-2 p-2">
                        <img className="h-5 w-5" src="./images/magnifying-glass.png" alt="search png" />
                        <input type="text" className="text-xs w-96" placeholder="Search by Category or Product Name" />
                    </div>

                    <div className="flex justify-center items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-600 flex justify-center items-center">
                        <img className="h-5 w-5" src="./images/shopping-bag.png" alt="" />
                    </div>

                    <div className="h-8 w-8 rounded-full bg-green-600 flex justify-center items-center">
                    <img className="h-5 w-5" src="./images/user.png" alt="" />
                    </div>
                    </div>
                    
                </div>
        </div>
    )
}