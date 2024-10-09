import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Menu, Settings, Users, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/auth/useAuth";


const sidebarItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Beneficiaries", href: "/register", icon: Users },
  { name: "Travel", href: "/settings", icon: Settings },
];

export const SidebarMenu = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { handleLogout } = useAuth();

  const handleLogoutFunction = () => {
    handleLogout();
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menú</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <nav className="flex flex-col space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} to={item.href} style={{ textDecoration: "none" }}>
                  <Button
                    variant={location.pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setOpen(false)}
                  >
                    <Icon className="mr-2 h-5 w-5" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}

            {/* Botón de Log Out */}
            <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-5 w-5" />
              Log Out
            </Button>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex h-screen w-64 flex-col bg-background border-r">
        <ScrollArea className="flex-grow">
          <nav className="flex flex-col space-y-2 p-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} to={item.href} style={{ textDecoration: "none" }}>
                  <Button
                    variant={location.pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Icon className="mr-2 h-5 w-5" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}

            {/* Botón de Log Out en el sidebar de escritorio */}
            <Button variant="ghost" className="w-full justify-start" onClick={handleLogoutFunction}>
              <LogOut className="mr-2 h-5 w-5" />
              Log Out
            </Button>
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
};
