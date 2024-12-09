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
import { ReactElement, useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { items, DashItemsType, ItemType } from "@/lib/dashboard-utils";
import { useTheme } from "next-themes";
import { AuthError, isAuthError, User as Users } from "@supabase/supabase-js";
import { Fetch } from "@/lib/utils";
import { SupabaseAuth } from "@/lib/supabase";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function DashSidebar (): ReactElement {
  const [user, setUser] = useState<Users>();
  const router: AppRouterInstance = useRouter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect((): void => { getIt() }, []);

  async function getIt () {
    setUser(await getUser(router));
  }

  return (
    <Sidebar collapsible="icon" className="dark:bg-bg-dark dark:text-fg-dark">
      <SidebarHeader className="p2">
        <div className="overflow-hidden">
          <h1 className="text-3xl text-center font-bold">InovaGest</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {items.map((group: DashItemsType): ReactElement => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel className="text-base">{group.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item: ItemType): ReactElement => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

      </SidebarContent>

      <SidebarFooter className="flex items-center justify-start">
        <DropdownMenu >
          <DropdownMenuTrigger asChild >
            <Button disabled={!user} variant="ghost" className="w-full  h-full p-2 ">

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
function DashAvatar ({ name, email, imgUrl = "https://github.com/shadcn.png", isButton = false }: DashAvatarProps): ReactElement {
  if (!name || !email) return (
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
  )
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
  const res: Response = await Fetch.getWithPathVariable("../api/v1/auth/users", auth.accessToken);
  const data = await res.json();
  if (isAuthError(data)) {
    const error: AuthError = data;
    if (error.code === "bad_jwt") {
      router.push("../auth/signin");
      return {} as Users;
    }
    console.log(data)
  }
  return data.user;
}