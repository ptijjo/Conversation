import Fonctionnement from '@/components/Fonctionnement'
import SearchBarre from '@/components/SearchBarre'
import React from 'react'

const Dashbord = () => {
    return (
        <main className="flex flex-col flex-grow max-w-7xl w-full items-center">
            <SearchBarre />
            <Fonctionnement/>
            Dashbord
        </main>
    )
}

export default Dashbord