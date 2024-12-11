import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashSidebar from "./DashSidebar";
import { ReactElement, ReactNode, Suspense } from "react";
;
import DashHeader from "./DashHeader";
import { Separator } from "@/components/ui/separator";

export default function Layout ({ children }: { children: ReactNode }): ReactElement {
    return (
        <div className="w-full h-full">
            <SidebarProvider>
                <Suspense fallback={<h1>aa</h1>}>
                    <DashSidebar />
                </Suspense>
                <SidebarInset className="">
                    <DashHeader />
                    <Separator className="w-full" />
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}