import React from 'react';
import Link from 'next/link';
import { Shrikhand } from "next/font/google";

const shrikhand = Shrikhand({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-shrikhand"
});
  

const Footer = () => {

    const urlFooter = [
        {
            nom: "Proposer un restaurant",
            link: ""
        },
        {
            nom: "Devenir partenaire",
            link: ""
        },
        {
            nom: "Mentions légales",
            link: ""
        },
        {
            nom: "Contact",
            link: ""
        },
    ];


    return (
        <footer className='bg-black text-white w-full flex flex-col justify-center items-center'>
            <h3 className={`${shrikhand.className}`}>ohmyfood</h3>

            <ul>
                {urlFooter.map((link) => {
                    return (
                        <li key={link.nom}>
                            <Link href={link.link}> {link.nom}</Link>
                        </li>
                    )
                })}
            </ul>
        </footer>
    )
}

export default Footer