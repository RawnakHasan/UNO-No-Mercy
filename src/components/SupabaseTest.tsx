import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

const SupabaseTest = () => {
  const [status, setStatus] = useState("Testing connection...");

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Try to query the game_rooms table
        const { data, error } = await supabase
          .from("game_rooms")
          .select("*")
          .limit(1);

        if (error) throw error;

        setStatus("✅ Connected to Supabase successfully!");
        console.log("Supabase connection test:", { data });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        setStatus(`❌ Connection failed: ${message}`);
        console.error("Supabase error:", error);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold">Supabase Connection Test</h2>
      <p className="mt-2">{status}</p>
    </div>
  );
};

export default SupabaseTest;
