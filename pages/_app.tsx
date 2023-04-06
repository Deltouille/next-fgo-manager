import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {ProSidebarProvider, useProSidebar} from 'react-pro-sidebar';
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Header from "@/components/Header";
import authMiddleware from "@/middleware/checkAuth";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ProSidebarProvider>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={"flex min-h-screen"}>
                <Navbar/>
                <div className={"flex flex-col w-full"}>
                    <Header></Header>
                    <div className={"w-5/6 mx-auto my-10"}>
                        <Component {...pageProps} />
                    </div>
                </div>

            </div>
        </ProSidebarProvider>
    )
}
