import {
  CreateRoomButton,
  DocsButton,
  HomeButton,
  UserButton,
} from "@/components/CustomButtons";
import { ThemeToggle } from "@/theme/ThemeToggle";

const JoinRoom = () => {
  return (
    <div className="h-screen flex flex-col gap-8 items-center pt-17.5 relative">
      <div className="absolute space-x-4 m-4 top-0 left-4">
        <HomeButton />
        <DocsButton />
        <CreateRoomButton />
      </div>
      <div className="absolute space-x-4 m-4 top-0 right-4 flex items-center">
        <ThemeToggle />
        <UserButton />
      </div>
      <h1 className="text-6xl font-semibold">Join A Room</h1>
      <div className="m-auto l-auto">Hehe</div>
    </div>
  );
};
export default JoinRoom;
