import { CreateRoomButton, JoinRoomButton } from "@/components/CustomButtons";

const App = () => {
  return (
    <div className="h-screen flex flex-col gap-8 items-center justify-center relative">
      <h1 className="text-6xl font-semibold">UNO No Mercy</h1>
      <div className="flex gap-4">
        <CreateRoomButton />
        <JoinRoomButton />
      </div>
    </div>
  );
};
export default App;
