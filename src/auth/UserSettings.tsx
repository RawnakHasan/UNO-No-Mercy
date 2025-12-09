import { Separator } from "@/components/ui/separator";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { LogOut, Upload, User2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase/Supabase";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const UserSettings = () => {
  const navigate = useNavigate();
  const { user, username, avatarUrl, refreshProfile, signOut } = useAuth();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(avatarUrl);

  const uploadAvatar = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${user!.id}.${fileExt}`;
    const filePath = `${user!.id}/${fileName}`;

    // --------- #2 CLEAN OLD AVATAR ---------
    // You can safely attempt removal, even if file doesn't exist
    await supabase.storage
      .from("avatars")
      .remove([
        `${user!.id}/${user!.id}.png`,
        `${user!.id}/${user!.id}.jpg`,
        `${user!.id}/${user!.id}.jpeg`,
        `${user!.id}/${user!.id}.webp`,
      ]);
    // ----------------------------------------

    // Upload
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    // Update profile
    const { error: dbError } = await supabase
      .from("profiles")
      .update({ avatar_url: data.publicUrl })
      .eq("id", user!.id)
      .select();

    if (dbError) throw dbError;
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/signIn");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected)); // preview before upload
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      await uploadAvatar(file);
      await refreshProfile();

      alert("Avatar updated!");

      // --------- #3 RESET FILE & PREVIEW ----------
      setFile(null);
      setPreview(avatarUrl);
      const input = document.querySelector("#avatar-input") as HTMLInputElement;
      if (input) input.value = "";
      // --------------------------------------------
    } catch (err) {
      console.error(err);
      alert("Failed to upload avatar.");
    }
  };

  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Welcome, {username}</h1>

      <Separator />

      {/* Avatar Preview */}
      <div className="flex flex-col gap-8 items-start">
        <div className="flex items-center gap-8">
          {preview ? (
            <>
              <Avatar className="size-36">
                <AvatarImage src={preview} />
              </Avatar>
            </>
          ) : (
            <User2 size={140} />
          )}
          <h1 className="text-2xl font-bold">{username}</h1>
        </div>
        <div className="space-y-4">
          <Input
            type="file"
            id="avatar-input"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button
            className="hover:cursor-pointer hover:scale-105"
            onClick={handleUpload}
            disabled={!file}
          >
            <Upload />
            Upload Avatar
          </Button>
        </div>
      </div>

      <Separator />

      <Button
        onClick={handleSignOut}
        variant="destructive"
        className="hover:cursor-pointer hover:scale-105"
      >
        <LogOut />
        Sign Out
      </Button>
    </main>
  );
};

export default UserSettings;
