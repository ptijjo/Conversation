import React from 'react';
import Image from 'next/image';

const Header = () => {
    return (
        <header className='py-2.5'>
            <Image src="/images/logo/ohmyfood.png" alt='logo' width={150} height={150} priority />
        </header>
    )
}

export default Header