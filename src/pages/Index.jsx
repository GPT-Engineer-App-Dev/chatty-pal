import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const chats = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "Let's catch up later.",
    avatar: "/placeholder.svg",
  },
];

const messages = [
  { id: 1, text: "Hello!", sender: "John Doe" },
  { id: 2, text: "Hi, how are you?", sender: "Me" },
];

const Index = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      messages.push({ id: messages.length + 1, text: newMessage, sender: "Me" });
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-full">
      <aside className="w-1/3 border-r">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Telegram Clone</h1>
          <Button className="mt-4 w-full">New Chat</Button>
        </div>
        <div className="p-4 border-b">
          <Input placeholder="Search chats..." />
        </div>
        <ScrollArea className="h-full">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => handleChatClick(chat)}
            >
              <Avatar className="mr-4">
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-bold">{chat.name}</h2>
                <p className="text-sm text-gray-600">{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </aside>
      <main className="w-2/3 p-4">
        {selectedChat ? (
          <Card className="h-full">
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="mr-4">
                  <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                  <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>{selectedChat.name}</CardTitle>
              </div>
              <Button variant="outline">Settings</Button>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              <ScrollArea className="flex-1 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-2 my-2 rounded ${
                      message.sender === "Me" ? "bg-blue-100 self-end" : "bg-gray-100"
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex items-center">
                <Textarea
                  className="flex-1"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button className="ml-2" onClick={handleSendMessage}>
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;