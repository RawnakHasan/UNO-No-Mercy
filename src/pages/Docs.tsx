import {
  CreateRoomButton,
  HomeButton,
  JoinRoomButton,
  UserButton,
} from "@/components/CustomButtons";
import { ThemeToggle } from "@/theme/ThemeToggle";

const Docs = () => {
  return (
    <div className="h-screen flex flex-col gap-8 items-center pt-17.5 relative">
      <div className="absolute space-x-4 m-4 top-0 left-4">
        <HomeButton />
        <CreateRoomButton />
        <JoinRoomButton />
      </div>
      <div className="absolute space-x-4 m-4 top-0 right-4 flex items-center">
        <ThemeToggle />
        <UserButton />
      </div>
      <div className="h-full w-full flex items-center justify-center">
        <h1>Docs</h1>
      </div>
    </div>
  );
};
export default Docs;
