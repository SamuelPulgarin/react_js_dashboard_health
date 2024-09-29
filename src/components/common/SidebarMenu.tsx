import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Menu, Settings, Users } from "lucide-react";

const sidebarItems = [
  { name: "Inicio", href: "/dashboard", icon: Home },
  { name: "Beneficiarios", href: "/register", icon: Users },
  { name: "Viaticos", href: "/settings", icon: Settings },
];

export const SidebarMenu = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

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
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
};
