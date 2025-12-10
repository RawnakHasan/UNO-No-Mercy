import type { Database } from "./database.types";

export type RoomData = Database["public"]["Tables"]["game_rooms"]["Row"];
export type PlayerRow = Database["public"]["Tables"]["players"]["Row"];
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
