import { useEffect, useState, useRef, useContext } from "react";
import Talk from "talkjs";
import { UserContext } from "../context/UserContext";
import { SiMessenger } from "react-icons/si";

function Chat() {
  const [open, setOpen] = useState(false);
  const { user }: any = useContext(UserContext);
  const chatboxEl = useRef();

  console.log(user?.name);

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      const currentUser = new Talk.User({
        id: user ? user._id : "123456",
        name: user ? user.name : "anonymous",
        email: user ? user.email : "Anonymous@gmail.com",
        photoUrl: "henry.jpeg",
        welcomeMessage: "Hello!",
        role: "default",
      });

      const otherUser = new Talk.User({
        id: "2",
        name: "traveling web",
        email: "datodavit07@.com",
        photoUrl: "jessica.jpeg",
        welcomeMessage: "Hello!",
        role: "default",
      });

      const session = new Talk.Session({
        appId: "tXIe8jKA",
        me: currentUser,
      });

      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [talkLoaded, user]);

  return (
    <div className="z-50 fixed right-0 top-0 bottom-0">
      <div
        className="z-20 absolute bottom-10 right-10 rounded-full h-14 w-14 bg-white flex justify-center items-center"
        style={{
          boxShadow: "0 20px 25px -5px #7a7acd, 0 8px 10px -6px #7a7acd",
        }}
      >
        <SiMessenger
          onClick={() => setOpen(!open)}
          style={{ fontSize: "35px" }}
          className=""
        />
      </div>
      <div className="w-auto fixed -right-20 bottom-12 z-10">
        <div
          ref={chatboxEl}
          className=""
          style={{ height: open ? "0vh" : "70vh", width: "70vh" }}
        />
      </div>
    </div>
  );
}

export default Chat;