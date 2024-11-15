import React from 'react'

const ErrorPage = () => {
    return (
        <div className="grid h-screen place-content-center px-4 bg-[#100E17]">
            <div className="text-center">
                <h1 className="text-9xl font-black text-gray-700">404</h1>
                <p className="text-2xl font-bold tracking-tight sm:text-4xl text-white">
                    Uh-oh!
                </p>
                <p className="mt-4 text-gray-400">We can't find that page.</p>
            </div>
        </div>
    )
}

export default ErrorPage
