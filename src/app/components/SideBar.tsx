"use client";

import NewChat from "./NewChat";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";
import ChatRow from "./ChatRow";
import LanguageSelection from "./LanguageSelection";

function SideBar() {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session && query(collection(db, "users", session?.user?.email!, "chats"), orderBy("createdAt", "asc"))
  );

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat />

          <div className="hidden sm:inline">
            <LanguageSelection />
          </div>

          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading chat...</p>
              </div>
            )}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>
      {session && (
        <div className="flex items-center gap-2 mx-auto cursor-pointer  mb-2 hover:opacity-50">
          <img onClick={() => signOut()} src={session.user?.image!} alt="profile picture" className="h-12 w-12 rounded-full" />
          <div className="text-white">Sign out</div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
