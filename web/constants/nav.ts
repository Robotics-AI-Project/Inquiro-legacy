import { Database, Save, LayoutDashboard } from "lucide-react";

export enum ROUTES {
  SIGN_IN = "/",

  // CHAT

  NEW_CHAT = "/app",
  CHAT = "/app/chat/[chatId]",

  DASHBOARD = "/app/dashboard",

  // DATASOURCE

  DATASOURCE = "/app/datasources",
  DATASOURCE_ADD = "/app/datasources/add",
  DATASOURCD_ADD_POSTGRES = "/app/datasources/add/postgres",
  DATASOURCD_ADD_SQLITE = "/app/datasources/add/sqlite",

  // SNIPPETS

  SNIPPETS = "/app/snippets",
}

export const navSidebar = [
  {
    nav: ROUTES.DATASOURCE,
    label: "Data Sources",
    icon: Database,
  },
  {
    nav: ROUTES.SNIPPETS,
    label: "Snippets",
    icon: Save,
  },
  {
    nav: ROUTES.DASHBOARD,
    label: "Dashboard",
    icon: LayoutDashboard,
  },
];
