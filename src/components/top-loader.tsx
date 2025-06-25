import loaderLogo from "@/assets/loaderLogo.png"

const Loader = ({title="", description=""}:{title?:string, description?:string}) => {
    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 backdrop-blur-md flex flex-col justify-center items-center'>
            <img
                src={loaderLogo}
                alt="loading"
                className="w-20 h-20 animate-pulse"
            />
            <p className="text-xl font-bold">{title}</p>
            <p className="text-gray-400">{description}</p>
        </div>
    )
}

export default Loader