import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/theme/ThemeToggle";
import { ArrowBigRight, FileText, Home } from "lucide-react";
import { useNavigate } from "react-router";

const CreateRoom = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col gap-8 items-center pt-17.5 relative">
      <div className="absolute m-4 top-0 w-full">
        <div className="flex items-center justify-between mx-4">
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/")}
              className="hover:scale-105 hover:cursor-pointer"
            >
              <Home />
              <p>Home</p>
            </Button>

            <Button
              onClick={() => navigate("/docs")}
              className="hover:scale-105 hover:cursor-pointer"
            >
              <FileText />
              <p>Docs</p>
            </Button>

            <Button
              onClick={() => navigate("/join")}
              className="hover:cursor-pointer hover:scale-105"
            >
              <ArrowBigRight />
              <p>Join A Room</p>
            </Button>
          </div>
          <ThemeToggle />
        </div>
      </div>
      <h1 className="text-6xl font-semibold">Create A Room</h1>
      <div className="m-auto l-auto">Hehe</div>
    </div>
  );
};
export default CreateRoom;
