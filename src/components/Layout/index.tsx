import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Menu as MenuIcon,
  Bell,
  User,
  LogOut,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Actors", href: "/actors" },
  { name: "Reports", href: "/reports" },
  { name: "TTPs", href: "/ttps" },
];

const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
];

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  initials: "TC",
};

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const getIsActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  return (
    <>
      <div className="min-h-full">
        {/* Desktop nav */}
        <nav className="border-b bg-card text-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link to="/" className="flex shrink-0 items-center">
                  <span className="text-xl font-bold text-primary">Actortrackr</span>
                </Link>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-1">
                    {navigation.map((item) => (
                      <Link
                        to={item.href}
                        key={item.name}
                        className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                          getIsActive(item.href)
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        }`}
                        aria-current={getIsActive(item.href) ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:flex md:items-center md:gap-2">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
                  type="button"
                  onClick={() => console.log("Notifications clicked")}
                  aria-label="View notifications"
                >
                  <Bell className="size-5" />
                  <span className="sr-only">View notifications</span>
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <button
                      type="button"
                      className="relative rounded-full focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                        {user.initials}
                      </span>
                      <span className="sr-only">Open user menu</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm text-muted-foreground">
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p>{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    {userNavigation.map((item) => (
                      <button
                        key={item.name}
                        type="button"
                        className="group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive"
                        onClick={() => handleNavigation(item.href)}
                        aria-label={item.name}
                      >
                        <User className="size-4" />
                        {item.name}
                      </button>
                    ))}
                    <DropdownMenuSeparator />
                    <button
                      type="button"
                      className="group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive"
                      onClick={() => console.log("Sign out clicked")}
                      aria-label="Sign out"
                    >
                      <LogOut className="size-4" />
                      Sign out
                    </button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex md:hidden">
                <Sheet>
                  <SheetTrigger>
                    <button
                      type="button"
                      className="text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
                    >
                      <MenuIcon className="size-6" />
                      <span className="sr-only">Open main menu</span>
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle>Actortrackr</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-1 pt-4">
                      {navigation.map((item) => (
                        <Link
                          to={item.href}
                          key={item.name}
                          className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary ${
                            getIsActive(item.href)
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:bg-accent hover:text-foreground"
                          }`}
                          aria-current={getIsActive(item.href) ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center gap-3 px-2">
                      <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                        {user.initials}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-1 px-2">
                      <ThemeToggle />
                      {userNavigation.map((item) => (
                        <Link
                          to={item.href}
                          key={item.name}
                          className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          {item.name}
                        </Link>
                      ))}
                      <button
                        type="button"
                        className="rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary"
                        onClick={() => console.log("Sign out clicked")}
                        aria-label="Sign out"
                      >
                        Sign out
                      </button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
