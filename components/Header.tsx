import {useProSidebar} from "react-pro-sidebar";
import { Button } from "@tremor/react";

export default function Header({children}) {
    const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();

    return (
        <header className={"border-b border-gray-600 w-full h-16"}>
            <div className={"mx-4 flex flex-row my-2"}>
                <Button size="xs" onClick={() => collapseSidebar()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </Button>
                {children}
            </div>
        </header>
    )
;}