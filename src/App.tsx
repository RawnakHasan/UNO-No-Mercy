import { CreateRoomButton, JoinRoomButton } from "@/components/CustomButtons";

const App = () => {
  return (
    <div className="app-gradient h-screen flex flex-col gap-8 items-center justify-center p-4 md:p-8">
      {/* Responsive title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-center">
        UNO No Mercy
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md justify-center">
        <CreateRoomButton />
        <JoinRoomButton />
      </div>
    </div>
  );
};

export default App;
