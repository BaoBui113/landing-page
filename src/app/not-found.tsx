import Link from "next/link";

export default function NotFound() {
    return (
        <div className='flex flex-col items-center h-screen justify-center bg-black'>
            <h2 className='text-[120px] text-white'>404</h2>
            <p className="text-gray-400 text-6xl">Page Not Found</p>
            <Link className="p-2 bg-blue-500 rounded-md text-white mt-6" href="/landing-page-2">Landing page 2</Link>
        </div>

    )
}