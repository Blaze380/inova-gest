"use client"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar";
import {  Dispatch, RefObject, SetStateAction, useState } from "react";


  const items = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ]
export default function DashSidebar() {

    const isActive:[boolean,Dispatch<SetStateAction<boolean>>][] =new Array(items.length);
    isActive.forEach((active:[boolean,Dispatch<SetStateAction<boolean>>]):void=>{
        console.log("antes:",active[0])
        // eslint-disable-next-line react-hooks/rules-of-hooks, @typescript-eslint/no-unused-vars
        active = useState<boolean>(false);
        console.log("Depois:",active[0])
    })


    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="p2">
                <div className="overflow-hidden">
                    <h1 className="text-3xl text-center font-bold">InovaGest</h1>
                </div>
            </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item,i:number) => (
                  <SidebarMenuItem key={item.title}>
                    {/** eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <SidebarMenuButton asChild isActive={():bolean | undefined=>{
                        if(!isActive[i][0]) return false;
                        return isActive[i][0] ;
                    }}>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      );
}