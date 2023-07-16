import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import { useState } from "react";

// import BellIcon from "./BellIcon";
import { toast } from "react-toastify";
import { signout } from "@/actions/auth";
const MotionLink = motion(Link);

const Logo = ({ user, onOpenNotificationsClicked, notifications, onClick }) => {
  const [showMenu, setShowMenu] = useState(false);

  const router = useRouter();
  user = 1;
  notifications = [];
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center mt-2">
        <MotionLink
          href={`/auth`}
          className="w-16 h-16 !bg-primary text-white flex items-center justify-center 
          rounded-full text-sm font-bold border border-solid border-transparent dark:border-white"
          whileTap={{ scale: 0.9 }}
          whileHover={{ y: -2 }}
        >
          تسجيل
        </MotionLink>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center mt-2">
        <motion.div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setShowMenu(!showMenu);
            onClick();
          }}
          className="w-16 h-16 !bg-primary text-white flex items-center justify-center 
          rounded-full text-sm font-bold border border-solid border-transparent dark:border-white"
          whileTap={{ scale: 0.9 }}
          whileHover={{ y: -2 }}
        >
          حسابي
        </motion.div>
      </div>
      {/* {showMenu ? (
        <motion.ul
          className="flex z-100 text-center flex-col justify-evenly items-center mt-2 bg-gray-200 py-4 px-8 rounded-lg shadow-md
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
              if (user.role !== 0) {
                router.push("/admin");
              } else {
                router.push("/user");
              }
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
                return;
              }
              onOpenNotificationsClicked();
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
              router.push("/requests");
            }}
            className="cursor-pointer py-2 px-4 text-gray-700 hover:bg-gray-100"
          >
            طلبات القبول
          </li>
          <li
            onClick={() => {
              router.push("/user/favourites");
            }}
            className="cursor-pointer py-2 px-4 text-gray-700 hover:bg-gray-100"
          >
            قائمة المحفوظات
          </li>
          <li
            onClick={() => {
              signout(() => {
                dispatch(logout());
                router.push("/signin");
              });
            }}
            className="cursor-pointer py-2 px-4 text-gray-700 hover:bg-gray-100"
          >
            تسجيل الخروج
          </li>
        </motion.ul>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default Logo;
