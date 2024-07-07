import Header from '@/components/Header'
import Register from '@/components/Register'
import React from 'react'

const Signin = () => {
    return (
        <>
            <Header />
            <main className="flex flex-col flex-grow max-w-7xl w-full justify-center items-center">
                <Register />
            </main>
        </>
    )
}

export default Signin