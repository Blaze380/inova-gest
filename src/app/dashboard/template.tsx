import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashSidebar from "./DashSidebar";
import { ReactElement, ReactNode } from "react";

export default function Template ({children}:{children:ReactNode}):ReactElement {
    return (
        <div className="w-full h-full">
            <SidebarProvider>
                <DashSidebar />
                <SidebarTrigger />
                {children}
            </SidebarProvider>
        </div>
    )
}