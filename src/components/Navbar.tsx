import { ThemeToggle } from "@/theme/ThemeToggle";
import { useLocation } from "react-router";
import {
  CreateRoomButton,
  DocsButton,
  HomeButton,
  JoinRoomButton,
  UserButton,
} from "./CustomButtons";

const Navbar = () => {
  const { pathname } = useLocation();

  const isHome = pathname === "/";
  const isCreateRoom = pathname === "/create";
  const isJoinRoom = pathname === "/join";
  const isDocs = pathname === "/docs";

  return (
    <nav className="fixed z-10 p-4 w-full flex items-center justify-between">
      <div className="flex items-center gap-4">
        {!isHome && <HomeButton />}
        {!isDocs && <DocsButton />}
        {isHome || (!isCreateRoom && <CreateRoomButton />)}
        {isHome || (!isJoinRoom && <JoinRoomButton />)}
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserButton />
      </div>
    </nav>
  );
};
export default Navbar;
