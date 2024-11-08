export default function Landing(){
    return(
        <div className="bg-orange-100 h-screen w-full flex flex-col items-center gap-10">

            <div className="short_header h-10 w-[90%]  flex justify-between text-black items-center  ">
                <div className="start  h-10 text-sm flex gap-5 ">
                    <button>
                        Products
                    </button>

                    <button>
                        whats new
                    </button>

                    <button>
                        delivery
                    </button>

                    <button>
                        help and support
                    </button>
                </div>

                <div className="end text-xm h-10 flex gap-5"> 
                    <button>
                        track orders
                    </button>
                    <button>
                        faq
                    </button>
                    <button className="flex gap-1 items-center">
                        <h1 className="h-6 w-6 rounded-full bg-orange-500">

                        </h1>
                        <h1>
                        Email Support

                        </h1>
                    </button>
                </div>
            </div>

            <div  className="temp1 h-[60%] w-[90%]  rounded-2xl  bg-cover shadow-2xl shadow-black "  style={{ backgroundImage: 'url(/images/dark_red.jpg)' }}>
                
                <div className="info h-full w-full  flex flex-col justify-center items-center ">
                    <div className=" h-[80%] w-[80%] z flex flex-col gap-2 justify-center items-center ">
                        <div className="  h-10 w-fit bg-red-700 flex gap-2 items-center rounded-3xl p-4">
                            <h1 className="h-6 w-6 rounded-full bg-white">
                                i
                            </h1>
                            <h1>
                                get free delivery on your first order
                            </h1>
                        </div>
                        <div className="text-4xl font-bold flex gap-2 ">
                            <h1>
                                We deliver 
                            </h1>
                            <h1 className="text-orange-500">
                                groceries
                            </h1>
                        </div>
                        <div className="text-3xl font-bold flex gap-2 ">
                            <h1>
                                to your doorstep
                            </h1>
                            
                        </div>
                        <div>
                            <h1 className="text-xs">
                                Get freshest groceries delivered right to your home. Saave time, skip the lines, and enjoy thee convenience of quick, efficient delivery
                            </h1>
                        </div>
                        
                        <div className="bg-orange-500 w-fit p-2 px-4 rounded-2xl ">
                            <button onClick={""}>
                                <h1 className="text-xs">
                                Shop Now {">"}
                                    </h1> 
                            </button>
                        </div>
                    </div>
                    
                </div>
                
            </div>

            {/* <div  className="temp1 h-[60%] w-[90%]  rounded-2xl  bg-cover "  style={{ backgroundImage: 'url(/images/temp1_bg.jpg)' }}>
                
                <div className="info h-full w-[50%]  flex flex-col justify-center items-center ">
                    <div className=" h-[80%] w-[80%] flex flex-col gap-2 justify-center ">
                        <div className="  h-10 w-fit bg-red-700 flex gap-2 items-center rounded-3xl p-4">
                            <h1 className="h-6 w-6 rounded-full bg-white">
                                i
                            </h1>
                            <h1>
                                get free delivery on your first order
                            </h1>
                        </div>
                        <div className="text-4xl font-bold flex gap-2 ">
                            <h1>
                                We deliver 
                            </h1>
                            <h1 className="text-orange-500">
                                groceries
                            </h1>
                        </div>
                        <div className="text-3xl font-bold flex gap-2 ">
                            <h1>
                                to your doorstep
                            </h1>
                            
                        </div>
                        <div>
                            <h1 className="text-xs">
                                Get freshest groceries delivered right to your home. Saave time, skip the lines, and enjoy thee convenience of quick, efficient delivery
                            </h1>
                        </div>
                        
                        <div className="bg-orange-500 w-fit p-2 px-4 rounded-2xl ">
                            <button onClick={""}>
                                <h1 className="text-xs">
                                Shop Now {">"}
                                    </h1> 
                            </button>
                        </div>
                    </div>
                    
                </div>
                
            </div> */}
            <div className="temp2 h-fit w-[90%] py-5 flex flex-col gap-3">
                <div className="text">
                    <h1 className="text-xl text-black">
                        Shop by categories
                    </h1>
                </div>
                <div className="card h-[20vh] flex gap-6">
                    <div style={{ backgroundImage: 'url(/images/fruits.jpg)' }} className="card1 h-full w-[10%] bg-red-900 rounded-2xl p-3 flex flex-col justify-start items-center bg-cover text-black">
                        <h1 className="text-xl">
                            Vegetabble
                        </h1>

                        <h2 className="text-xs">
                            Local Market
                        </h2>
                        
                    </div>
                    <div style={{ backgroundImage: 'url(/images/fruits.jpg)' }} className="card1 h-full w-[10%] bg-red-900 rounded-2xl p-3 flex flex-col justify-start items-center bg-cover text-black">
                        <h1 className="text-xl">
                            Vegetabble
                        </h1>

                        <h2 className="text-xs">
                            Local Market
                        </h2>
                        
                    </div>
                    <div style={{ backgroundImage: 'url(/images/fruits.jpg)' }} className="card1 h-full w-[10%] bg-red-900 rounded-2xl p-3 flex flex-col justify-start items-center bg-cover text-black">
                        <h1 className="text-xl">
                            Vegetabble
                        </h1>

                        <h2 className="text-xs">
                            Local Market
                        </h2>
                        
                    </div>
                    <div style={{ backgroundImage: 'url(/images/fruits.jpg)' }} className="card1 h-full w-[10%] bg-red-900 rounded-2xl p-3 flex flex-col justify-start items-center bg-cover text-black">
                        <h1 className="text-xl">
                            Vegetabble
                        </h1>

                        <h2 className="text-xs">
                            Local Market
                        </h2>
                        
                    </div>
                    <div style={{ backgroundImage: 'url(/images/fruits.jpg)' }} className="card1 h-full w-[10%] bg-red-900 rounded-2xl p-3 flex flex-col justify-start items-center bg-cover text-black">
                        <h1 className="text-xl">
                            Vegetabble
                        </h1>

                        <h2 className="text-xs">
                            Local Market
                        </h2>
                        
                    </div>
                    <div style={{ backgroundImage: 'url(/images/fruits.jpg)' }} className="card1 h-full w-[10%] bg-red-900 rounded-2xl p-3 flex flex-col justify-start items-center bg-cover text-black">
                        <h1 className="text-xl">
                            Vegetabble
                        </h1>

                        <h2 className="text-xs">
                            Local Market
                        </h2>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}