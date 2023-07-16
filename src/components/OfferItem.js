import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

const OfferItem = ({ notificationId, title, date, link }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(link);
        console.log(link);
      }}
    >
      <motion.li
        whileHover={{ y: -2 }}
        style={{ cursor: "pointer" }}
        className="relative w-full  p-4 py-6 my-4 rounded-xl flex items-center 
       justify-between bg-light text-dark first:mt-0 border border-solid border-dark
       border-r-4 border-b-4 dark:border-light  dark:bg-dark dark:text-light 
       sm:flex-col
       "
      >
        <h2 className="text-xl font-semibold hover:underline">{title}</h2>

        <span className="text-primary font-semibold pl-4 sm:self-start sm:pl-0 xs:text-sm">
          {date}
        </span>
      </motion.li>
    </div>
  );
};

export default OfferItem;
