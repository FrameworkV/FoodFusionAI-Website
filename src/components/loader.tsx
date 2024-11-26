import React from 'react'
import loaderLogo from "@/assets/loaderLogo.png"

const Loader = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <img
                src={loaderLogo}
                alt="loading"
                className="w-20 h-20 animate-pulse"
            />
        </div>
    )
}

export default Loader