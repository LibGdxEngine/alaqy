import { isAuth, signout } from "@/actions/auth";
import Footer from "@/components/Footer";
import Navebar from "@/components/Navbar";

import "@/styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import { Noto_Kufi_Arabic } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const montserrat = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-inter",
});
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState();
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const fetchUser = async () => {
    const currentUser = await isAuth();
    setUser(currentUser);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const notifications = [];
  return (
    <>
      <Head>
        <title>ألاقي</title>
        <meta name="description" content="Generated by Alaqy team" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{ fontFamily: "Noto Kufi Arabic" }}
        className={`${montserrat.variable} --font-inter bg-light dark:bg-dark w-full min-h-screen `}
      >
        <Navebar
          onLogoClick={() => {
            setShowMenu(!showMenu);
          }}
        />
        {showMenu && user ? (
          <div className="flex center  items-center justify-center">
            <motion.ul
              className="flex md:w-[25%] sm:w-[50%]  z-100 text-center flex-col justify-evenly items-center mt-2 bg-gray-200 py-4 px-8 rounded-lg shadow-md
          sm:px-4 sm:text-sm
          "
              variants={variants}
              initial="hidden"
              animate={showMenu ? "visible" : "hidden"}
              style={{ position: "relative", zIndex: 100000 }}
            >
              <li
                onClick={(e) => {
                  e.preventDefault();
                  if (user.role === 0) {
                    router.push("/home");
                  } else {
                    router.push("/seller");
                  }
                  setShowMenu(false);
                }}
                className="w-full cursor-pointer py-2 px-4 text-gray-700 hover:bg-gray-100"
              >
                {" معلوماتي الشخصية"}
              </li>
              <li
                onClick={(e) => {
                  e.preventDefault();
                  if (notifications.length === 0) {
                    toast.warning("ليس لديك أي اشعارات حاليا");
                    setShowMenu(false);
                    return;
                  }
                  onOpenNotificationsClicked();
                  setShowMenu(false);
                }}
                className="w-full cursor-pointer py-2 px-4 text-gray-700 hover:bg-gray-100"
              >
                <div className="flex items-center justify-center">
                  {notifications.length !== 0 && (
                    <BellIcon size={24} color="#EC255A" />
                  )}
                  <p> الإشعارات</p>
                </div>
              </li>

              <li
                onClick={() => {
                  signout(() => {
                    setShowMenu(false);
                    router.push("/auth");
                  });
                }}
                className="cursor-pointer py-2 px-4 text-gray-700 hover:bg-gray-100"
              >
                تسجيل الخروج
              </li>
            </motion.ul>
          </div>
        ) : (
          ""
        )}
        <AnimatePresence mode="wait">
          <ToastContainer />
          <Component key={router.asPath} {...pageProps} />
        </AnimatePresence>
        <Footer />
      </main>
    </>
  );
}
