import Login from "@/components/Login";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from 'next/image';


export default function Home() {
  return (
    <>
      <Image src="/images/logo/ohmyfood.png" alt='logo' width={150} height={150} priority className="py-2.5 w-auto h-auto" />
      <main className="flex flex-col flex-grow max-w-7xl w-full justify-center items-center">
        <Login />

        <Card className="border-none md:border-1 md:border-solid  md:border-gray-400 md:rounded-none md:shadow-none w-full max-w-lg flex items-center justify-center">
          <aside className="flex gap-x-3.5 items-center justify-center p-0.5 md:p-1.5">
            <p className="flex items-center text-center h-full">Vous n'avez pas de compte ? </p>
            <Link href="/signin" className="text-blue-400 m-0"> Incrivez-vous</Link>
          </aside>
        </Card>
      </main>

    </>
  );
}
