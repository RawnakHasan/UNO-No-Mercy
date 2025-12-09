import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowBigRight, FileText, Home, Plus, User2 } from "lucide-react";
import { useAuth } from "@/auth/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const { username, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/signIn");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="hover:cursor-pointer hover:scale-105">
          <User2 /> <p>{username}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
