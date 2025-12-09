import { ThemeToggle } from "./theme/ThemeToggle";
import {
  CreateRoomButton,
  DocsButton,
  JoinRoomButton,
  UserButton,
} from "@/components/CustomButtons";

const App = () => {
  return (
    <div className="h-screen flex flex-col gap-8 items-center justify-center relative">
      <div className="absolute space-x-4 top-4 right-4 flex items-center">
        <ThemeToggle />
        <UserButton />
      </div>
      <div className="absolute space-x-4 top-4 left-4">
        <DocsButton />
      </div>
      <h1 className="text-6xl font-semibold">UNO No Mercy</h1>
      <div className="flex gap-4">
        <CreateRoomButton />
        <JoinRoomButton />
      </div>
    </div>
  );
};
export default App;
