import { getRoom } from "@/actions/user";
import Layout from "@/components/Layout";
import classes from "../../components/chat/Chat.module.css";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import socketIO from "socket.io-client";
import Image from "next/image";
import { motion } from "framer-motion";
import { isAuth } from "@/actions/auth";
import { API } from "../../../config";
const socket = socketIO.connect(`${API}`);

const Chat = () => {
  const router = useRouter();

  const messagesEndRef = useRef();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState();
  const [room, setRoom] = useState();
  const fetchUser = async () => {
    const myUser = await isAuth();
    setUser(myUser);
  };

  const fetchRoom = async (roomId) => {
    const room = await getRoom(roomId);
    setRoom(room);
  };

  useEffect(() => {
    const roomId = router.query.roomId;
    fetchRoom(roomId);
  }, [ router.query.roomId]);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    // When the component mounts, ask the server to join a private room
    if (room) {
      const roomId = room._id;
      socket.emit("joinPrivateRoom", roomId);

      // When the server confirms that the client has joined a private room
      socket.on("privateRoomJoined", (roomId, previousMessages) => {
        // setRoomId(roomId);
        setMessages(previousMessages);
      });

      // When the server sends a private message
      socket.on("privateMessage", ({ message, senderUserName: sender }) => {
        setMessages((messages) => [
          ...messages,
          { message, senderUserName: sender },
        ]);
      });
    }
    // Clean up event listeners when the component unmounts
    return () => {
      socket.off("privateRoomJoined");
      socket.off("privateMessage");
    };
  }, [room]);

  useEffect(() => {
    // Scroll to the bottom of the messages container when the messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const roomId = room._id;
    if (inputValue.trim() !== "" && inputValue.trim().length > 1) {
      socket.emit("privateMessage", {
        roomId,
        message: inputValue,
        senderUserName: user._id,
      });
      setMessages((messages) => [
        ...messages,
        { message: inputValue, senderUserName: user._id },
      ]);
      setInputValue("");
    }
  };

  const handleResponseChange = (index, value) => {
    setResponseValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  const messageItem = (
    key,
    type,
    text,
    sendingDate,
    responseTo = undefined
  ) => {
    let prefix = "";

    let postfix = "";
    if (responseTo) {
      // prefix = "";
      // postfix = signedInUser.gender === "man" ? "رد العروسة" : "رد العريس";
    } else {
      postfix = "";
      // prefix =
      //   signedInUser.gender === "man" ? "سؤال من العروسة" : "سؤال من العريس";
    }
    return (
      <div dir={"rtl"} key={key} className={classes[`${type}`]}>
        {responseTo && (
          <>
            <div
              className={
                classes[
                  type === "received"
                    ? "receivedResponseResponseToContainer"
                    : "sentResponseResponseToContainer"
                ]
              }
            >
              <p>{responseTo}</p>
            </div>
          </>
        )}
        {/* {type === "received" && !responseTo && (
          <p className={classes["message-text"]}>{prefix}</p>
        )} */}
        {type === "received" && !responseTo && <br />}
        <p className={classes["message-text"]}>{text}</p>
        {type === "received" && responseTo && <br />}
        {type === "received" && responseTo && (
          <p className={classes["message-text"]}>{postfix}</p>
        )}

        <span className={classes["message-time"]}>
          {new Date(sendingDate).toLocaleDateString("ar-EG", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </span>

        {/* {type === "received" && !responseTo && (
          <>
            <hr />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleResponseSubmit(key);
              }}
              className={classes["response-form"]}
            >
              <div>
                <textarea
                  className={classes["response-input"]}
                  type="text"
                  onChange={(e) =>
                    handleResponseChange(key, {
                      response: e.target.value,
                      responseTo: text,
                    })
                  }
                  value={
                    parseInt(key) > responseValues.length
                      ? ""
                      : responseValues[key]
                      ? responseValues[key].response
                      : 0
                  }
                  placeholder="اكتب ردك هنا"
                />
                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  style={{ maxWidth: "20vw" }}
                  className="w-1/2 !bg-white p-2 !text-primary mx-3 rounded-lg border !border-primary"
                >
                  ارسال الرد
                </motion.button>
              </div>
            </form>
          </>
        )} */}
      </div>
    );
  };

  return (
    <>
      <Layout>
        <div
          className={`w-full h-full flex flex-row items-start justify-between sm:flex-col`}
          style={{ height: "85vh" }}
        >
          <div
            className={`w-1/4 flex flex-col items-center justify-between sm:w-full sm:justify-center `}
          >
            <ul className={``}></ul>

            <div
              className={`w-full flex flex-col items-center justify-center mt-4 md:flex-row px-4`}
            ></div>
          </div>

          <div
            className={`relative w-3/4 h-full flex flex-col items-between justify-between mt-2 sm:w-full sm:h-[75%] `}
          >
            <div
              className={`w-full flex flex-col items-center justify-between`}
              style={{ overflowY: "scroll", height: "calc(100% - 60px)" }}
            >
              {messages.map((message, index) => {
                let date = message.timestamp || Date.now();
                let isMyMessage = message.senderUserName === user._id;

                return messageItem(
                  index,
                  isMyMessage ? "sent" : "received",
                  message.message,
                  date,
                  message.responseTo
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            <div
              className={`w-full px-4 flex flex-col justify-between`}
              style={{ position: "absolute", bottom: 0 }}
            >
              <div dir="rtl" className={`h-auto flex flex-col justify-center`}>
                <form className={`flex justify-center`} onSubmit={handleSubmit}>
                  <div
                    className={`w-full flex items-center px-3 py-2 bg-gray-200 rounded-md`}
                  >
                    <input
                      className={`flex-grow px-3 py-2 mr-2 text-sm bg-transparent focus:outline-none`}
                      type="text"
                      placeholder="قم بارسال سؤال"
                      value={inputValue}
                      onChange={(event) => setInputValue(event.target.value)}
                    />
                    <button type="submit">
                      ارسال
                      {/* <FaPaperPlane className={classes["fa-paper-plane"]} /> */}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Chat;
