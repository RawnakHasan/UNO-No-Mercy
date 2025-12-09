import { useState } from "react";
import { ThemeToggle } from "@/theme/ThemeToggle";
import { useLocation } from "react-router";
import {
  CreateRoomButton,
  DocsButton,
  HomeButton,
  JoinRoomButton,
  UserButton,
} from "./CustomButtons";
import { Menu, X } from "lucide-react"; // hamburger and close icons

// Wrapper to add mobile-friendly tap effects to buttons
const MobileFriendlyButton = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full sm:w-auto">
    <div className="transition-transform duration-150 active:scale-95 hover:scale-105">
      {children}
    </div>
  </div>
);

const Navbar = () => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === "/";
  const isCreateRoom = pathname === "/create";
  const isJoinRoom = pathname === "/join";
  const isDocs = pathname === "/docs";

  const toggleMobile = () => setMobileOpen((prev) => !prev);

  return (
    <nav className="fixed z-10 p-4 w-full flex items-center justify-between bg-app-gradient">
      {/* Left side: buttons */}
      <div className="flex items-center gap-4">
        {/* Desktop buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!isHome && <HomeButton />}
          {!isDocs && <DocsButton />}
          {isHome || (!isCreateRoom && <CreateRoomButton />)}
          {isHome || (!isJoinRoom && <JoinRoomButton />)}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded transition-colors hover:bg-white/20 active:bg-white/30"
          onClick={toggleMobile}
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Right side: theme toggle and user */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserButton />
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-app-gradient flex flex-col gap-2 p-4 md:hidden">
          {!isHome && (
            <MobileFriendlyButton>
              <HomeButton />
            </MobileFriendlyButton>
          )}
          {!isDocs && (
            <MobileFriendlyButton>
              <DocsButton />
            </MobileFriendlyButton>
          )}
          {isHome ||
            (!isCreateRoom && (
              <MobileFriendlyButton>
                <CreateRoomButton />
              </MobileFriendlyButton>
            ))}
          {isHome ||
            (!isJoinRoom && (
              <MobileFriendlyButton>
                <JoinRoomButton />
              </MobileFriendlyButton>
            ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
