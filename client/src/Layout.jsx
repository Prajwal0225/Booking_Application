import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout(){
    return (
        <>
        <div className="py-4 px-8 flex flex-col min-h-screen">
            <Header/>
            <Outlet />
        </div>
            
        </>
    )
}