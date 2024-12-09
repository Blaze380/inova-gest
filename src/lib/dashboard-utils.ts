import { LucideProps, Home, Briefcase, Building, HousePlus, Package, IdCard, DollarSign, ClipboardPen, MapPinHouse, UsersRound, LockKeyhole } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface DashItemsType {
    group: string;
    items: ItemType[];
  }
  export interface ItemType {
    title: string;
    url: string;
    icon: IconType
  }
  export type IconType = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  export const items: DashItemsType[] = [
    {
      group: "Home",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: Home,
        },
        {
          title: "Funcionários",
          url: "/dashboard/funcionarios",
          icon: Briefcase,
        },
        {
          title: "Departamentos",
          url: "/dashboard/departamentos",
          icon: Building,
        },
      ],
    },
    {
      group: "Recursos",
      items: [
        {
          title: "Imóveis",
          url: "/dashboard/recursos/imoveis",
          icon: HousePlus,
        },
        {
          title: "Vendas",
          url: "/dashboard/recursos/vendas",
          icon: Package,
        },
        {
          title: "Clientes",
          url: "/dashboard/recursos/clientes",
          icon: IdCard,
        },
        {
          title: "Pagamentos",
          url: "/dashboard/recursos/pagamentos",
          icon: DollarSign,
        },
        {
          title: "Contratos",
          url: "/dashboard/recursos/contratos",
          icon: ClipboardPen,
        },

      ],
    },
    {
      group: "Utilitário",
      items: [
        {
          title: "Endereços",
          url: "/dashboard/utilitario/enderecos",
          icon: MapPinHouse,
        },
        {
          title: "Cargos",
          url: "/dashboard/utilitario/cargos",
          icon: Briefcase,
        },
        {
          title: "Pagamentos",
          url: "/dashboard/utilitario/pagamentos",
          icon: DollarSign,
        },
        {
          title: "Usuários",
          url: "/dashboard/utilitario/usuarios",
          icon: UsersRound,
        },
        {
          title: "Imóveis",
          url: "/dashboard/utilitario/imoveis",
          icon: HousePlus,
        },
        {
          title: "Permissões",
          url: "/dashboard/utilitario/permissoes",
          icon: LockKeyhole,
        }
      ],
    }
  ];