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
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserSettings from "@/auth/UserSettings";

export const CreateRoomButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/create")}
      className="hover:cursor-pointer hover:scale-105"
    >
      <Plus />
      <p>Create A Room</p>
    </Button>
  );
};

export const DocsButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/docs")}
      className="hover:scale-105 hover:cursor-pointer"
    >
      <FileText />
      <p>Docs</p>
    </Button>
  );
};

export const HomeButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/")}
      className="hover:scale-105 hover:cursor-pointer"
    >
      <Home />
      <p>Home</p>
    </Button>
  );
};

export const JoinRoomButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/join")}
      className="hover:cursor-pointer hover:scale-105"
    >
      <ArrowBigRight />
      <p>Join A Room</p>
    </Button>
  );
};

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
