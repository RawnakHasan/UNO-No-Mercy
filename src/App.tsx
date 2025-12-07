import SupabaseTest from "./components/SupabaseTest";
import { createRoomCode } from "./lib/utils/roomCode";
import { ThemeToggle } from "./theme/ThemeToggle";

const App = () => {
  console.log(createRoomCode());

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">UNO NO MERCY</h1>
      <ThemeToggle />
      <SupabaseTest />
    </div>
  );
};
export default App;
