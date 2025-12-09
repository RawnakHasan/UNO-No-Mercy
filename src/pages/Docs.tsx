import {
  CreateRoomButton,
  HomeButton,
  JoinRoomButton,
} from "@/components/CustomButtons";
import { ThemeToggle } from "@/theme/ThemeToggle";

const Docs = () => {
  return (
    <div className="h-screen flex flex-col gap-8 items-center pt-17.5 relative">
      <div className="absolute m-4 top-0 w-full">
        <div className="flex items-center justify-between mx-4">
          <div className="flex gap-4">
            <HomeButton />
            <CreateRoomButton />
            <JoinRoomButton />
          </div>
          <ThemeToggle />
        </div>
      </div>
      <div className="h-full w-full flex items-center justify-center">
        <h1>Docs</h1>
      </div>
    </div>
  );
};
export default Docs;
