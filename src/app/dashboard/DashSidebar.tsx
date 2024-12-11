"use client"
import { ChevronsUpDown, User, Settings, LogOut, SunMoon, Sun, Moon } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { ReactElement, useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { items, DashItemsType, ItemType } from "@/lib/dashboard-utils";
import { useTheme } from "next-themes";
import { AuthError, isAuthError, UserResponse, User as Users } from "@supabase/supabase-js";
import { SupabaseAuth } from "@/lib/supabase";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { getUserData } from "./actions";

export default function DashSidebar (): ReactElement {
  const [user, setUser] = useState<Users>();
  const router: AppRouterInstance = useRouter();

  async function getUserData (): Promise<void> {
    const data = await getUser(router);
    console.log(data)
    setUser(data);
  }
  useEffect((): void => {
    getUserData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Sidebar collapsible="icon" className="dark:bg-bg-dark dark:text-fg-dark">
      <SidebarHeader className="p2">
        <div className="overflow-hidden">
          <h1 className="text-3xl text-center font-bold">InovaGest</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <TooltipProvider>
          {items.map((group: DashItemsType): ReactElement => (
            <SidebarGroup key={group.group}>
              <SidebarGroupLabel className="text-base">{group.group}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item: ItemType): ReactElement => (
                    <SidebarMenuItem key={item.title}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton asChild>
                            <Link href={item.url}>
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent align="start" side="right">
                          <p>{item.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}

        </TooltipProvider>
      </SidebarContent>

      <SidebarFooter className="flex items-center justify-start">
        <DropdownMenu >
          <DropdownMenuTrigger asChild >
            <Button disabled={!user} variant="ghost" className="w-full  h-full p-2 pl-0 ">
              <DashAvatar
                email={user?.email}
                name={user?.id}
                isButton
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="p-2 w-56">
            <DashAvatar
              email={user?.email}
              name={user?.id}
            />
            <DropdownMenuSeparator className="mt-2 mb-2" />
            <DropdownMenuItem>
              <User />
              Meu Perfil
            </DropdownMenuItem>
            <ProfileContextMenu />
            <DropdownMenuItem>
              <Settings />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

interface DashAvatarProps {
  name?: string;
  email?: string;
  imgUrl?: string;
  isButton?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SuspendedDashAvatar (): ReactElement {
  return (
    <div className="flex justify-between items-center w-full h-9">
      <div className="flex items-center w-[90%] space-x-1">
        <Skeleton className="rounded-md w-9 h-9" />
        <div className="flex flex-col text-start justify-start space-y-1 overflow-hidden w-full">
          <Skeleton className="rounded-md w-[85%] h-4" />
          <Skeleton className="rounded-md w-[60%] h-4" />
        </div>
      </div>
      <div className="w-[10%]">
        <ChevronsUpDown />
      </div>
    </div>
  );
}
function DashAvatar ({ name, email, imgUrl = "https://github.com/shadcn.png", isButton = false }: DashAvatarProps): ReactElement {
  return (
    <div className="flex justify-between items-center w-full h-9" >
      <div className="flex items-center w-[90%] space-x-1">
        <Avatar className="rounded-md w-9 h-9">
          <AvatarImage src={imgUrl} alt="Profile Photo" />
          <AvatarFallback>{name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-start justify-start space-y-1 overflow-hidden">
          <DropdownMenuLabel className="m-0 p-0 pl-1  line-clamp-1">{name}</DropdownMenuLabel>
          <DropdownMenuLabel className="font-light m-0 p-0 pl-1line-clamp-1">{email}</DropdownMenuLabel>
        </div>
      </div>
      {isButton && (
        <div className="w-[10%]">
          <ChevronsUpDown />
        </div>
      )}
    </div>
  );
}

function ProfileContextMenu (): ReactElement {
  const { setTheme } = useTheme()
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <SunMoon />
        <span>Tema</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={(): void => setTheme("light")}>
            <Sun />
            <span>Claro</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(): void => setTheme("system")}>
            <SunMoon />
            <span>Sistema</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(): void => setTheme("dark")}>
            <Moon />
            <span>Escuro</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

async function getUser (router: AppRouterInstance): Promise<Users> {
  const auth: SupabaseAuth = JSON.parse(localStorage.getItem("auth") as string) as SupabaseAuth;
  const data: UserResponse = JSON.parse(await getUserData({ jwt: auth.accessToken })) as UserResponse;
  if (isAuthError(data.error)) {
    console.log("Is error")
    const error: AuthError = data.error;
    if (error.code === "bad_jwt") {
      router.replace("/auth/signin")
      return {} as Users;
    }
    console.log(data)
  }
  if (data.data.user !== null) {
    console.log(data.data.user)
    return data.data.user;
  }
  throw new Error("Error on sidebar")
}