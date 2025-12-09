import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  ArrowBigRight,
  FileText,
  Home,
  LogOut,
  Plus,
  Settings,
  User2,
} from "lucide-react";
import { useAuth } from "@/auth/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserSettings from "@/auth/UserSettings";

type NavButtonProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

const NavButton = ({ to, icon, label }: NavButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(to)}
      className="font-semibold w-full sm:w-auto flex items-center gap-2 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform duration-150 active:shadow-inner hover:cursor-pointer"
    >
      {icon}
      <p>{label}</p>
    </Button>
  );
};

export const CreateRoomButton = () => (
  <NavButton to="/create" icon={<Plus />} label="Create A Room" />
);

export const JoinRoomButton = () => (
  <NavButton to="/join" icon={<ArrowBigRight />} label="Join A Room" />
);

export const DocsButton = () => (
  <NavButton to="/docs" icon={<FileText />} label="Docs" />
);

export const HomeButton = () => (
  <NavButton to="/" icon={<Home />} label="Home" />
);

export const UserButton = () => {
  const { username, signOut, avatarUrl } = useAuth();
  const navigate = useNavigate();
  const fallbackUsername = username?.slice(1);
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/signIn");
  };

  return (
    <>
      {/* ---------- Dialog ---------- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              User Settings
            </DialogTitle>
          </DialogHeader>
          <UserSettings />
        </DialogContent>
      </Dialog>

      {/* ---------- Dropdown ---------- */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="hover:cursor-pointer hover:scale-105">
            {avatarUrl ? (
              <>
                <Avatar>
                  <AvatarImage src={avatarUrl} alt={username || "User"} />
                  <AvatarFallback>{fallbackUsername}</AvatarFallback>
                </Avatar>
              </>
            ) : (
              <>
                <Button className="hover:cursor-pointer hover:scale-105">
                  <User2 /> <p>{username}</p>
                </Button>
              </>
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Settings />
            Settings
          </DropdownMenuItem>

          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={handleSignOut}
          >
            <LogOut />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
