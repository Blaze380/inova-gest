import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashSidebar from "./DashSidebar";
import { ReactElement, ReactNode } from "react";
;
import DashHeader from "./DashHeader";
import { Separator } from "@/components/ui/separator";

export default function Layout ({ children }: { children: ReactNode }): ReactElement {
    return (
        <div className="w-full h-full">
            <SidebarProvider>
                <DashSidebar />
                <SidebarInset>
                    <DashHeader />
                    <Separator  className="w-full" />
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}