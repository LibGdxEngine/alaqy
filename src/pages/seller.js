import TransitionEffect from "@/components/TransitionEffect";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";
import article3 from "../../public/images/articles/create loading screen in react js.jpg";
import article4 from "../../public/images/articles/create modal component in react using react portals.png";
import article5 from "../../public/images/articles/form validation in reactjs using custom react hook.png";
import {
  createNewRequest,
  getMyPrivateRooms,
  createNewOffer,
  getMyCategoryRequests,
} from "@/actions/user";
import { getCookie, isAuth } from "@/actions/auth";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import RequestModal from "@/components/RequestModal";
import { toast } from "react-toastify";
import OfferItem from "@/components/OfferItem";
import OffersModal from "@/components/OffersModal";

const FramerImage = motion(Image);

const MovingImg = ({ title, img, link }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgRef = useRef(null);

  function handleMouse(e) {
    imgRef.current.style.display = "inline-block";
    x.set(e.pageX);
    y.set(-10);
  }

  function handleMouseLeave(e) {
    imgRef.current.style.display = "none";
    x.set(0);
    y.set(0);
  }

  return (
    <Link
      href={`${link}`}
      target="_blank"
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="capitalize text-xl font-semibold hover:underline">
        {title}
      </h2>
      <FramerImage
        style={{ x: x, y: y }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
        ref={imgRef}
        src={img}
        alt={`${title}`}
        className="z-10 w-96 h-auto hidden absolute rounded-lg md:!hidden"
      />
    </Link>
  );
};

const FeaturedArticle = ({ img, title, time, summary, onClick }) => {
  return (
    <li
      onClick={onClick}
      className="relative col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl
      dark:bg-dark dark:border-light"
    >
      <div
        className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl
        "
      />
      <div className="w-full inline-block cursor-pointer overflow-hidden rounded-lg">
        <FramerImage
          src={img}
          width={500}
          height={500}
          alt={`${title}`}
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
      </div>
      <div style={{ cursor: "pointer" }}>
        <h2 className="capitalize text-2xl font-bold my-2 mt-4 hover:underline xs:text-lg">
          {title}
        </h2>
      </div>
      <p className="text-sm mb-2">{summary}</p>
      <span className="text-primary font-semibold dark:text-primaryDark">
        {time}
      </span>
    </li>
  );
};

const Article = ({ img, title, date, link }) => {
  return (
    <motion.li
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      viewport={{ once: true }}
      className="relative w-full p-4 py-6 my-4 rounded-xl flex items-center
       justify-between bg-light text-dark first:mt-0 border border-solid border-dark
       border-r-4 border-b-4 dark:border-light  dark:bg-dark dark:text-light 
       sm:flex-col
       "
    >
      {/* <MovingImg title={title} img={img} link={link} /> */}
      <span className="text-primary font-semibold pl-4 sm:self-start sm:pl-0 xs:text-sm">
        {date}
      </span>
    </motion.li>
  );
};

const Seller = () => {
  const buttonRef = useRef(null);
  useEffect(() => {
    if (buttonRef.current) {
      tippy(buttonRef.current, {
        content: "طلب جديد",
      });
    }
  }, [buttonRef]);

  const [clickedRequest, setClickedRequest] = useState();

  const [prevRequests, setPrevRequests] = useState([]);
  const [messages, setMessages] = useState([]);
  const [offers, setOffers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [RequestModalIsOpen, setRequestModallIsOpen] = useState(false);
  const [OfferModalIsOpen, setOfferModallIsOpen] = useState(false);
  const [fileData, setFileData] = useState("");
  const [myFile, setMyFile] = useState();
  const [offerDesc, setOfferDesc] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  async function fetchRequests() {
    const user = await isAuth();
    setCurrentUser(user);
    const requestsData = await getMyCategoryRequests(user._id, token);
    const messagesData = await getMyPrivateRooms(user._id, token);

    setPrevRequests(requestsData);
    setMessages(messagesData.messages);
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  const token = getCookie("token");

  const handleOpenModal = () => {
    setRequestModallIsOpen(true);
  };

  const handleCloseModal = () => {
    setRequestModallIsOpen(false);
  };

  const handleModalSubmit = () => {
    if (!offerDesc || offerDesc.trim() === "") {
      toast.error("يجب عليك كتابة وصف للمنتج");
      return;
    }
    if (!offerPrice || offerPrice === "") {
      toast.error("يجب عليك تحديد فئة للمنتج");
      return;
    }

    createNewOffer(
      clickedRequest._id,
      currentUser._id,
      clickedRequest.owner,
      {
        offerDesc,
        offerPrice,
      },
      token
    ).then((data) => {
      setOfferDesc("");
      setOfferPrice(0);
      toast.success(data.message);
      handleCloseModal();
      fetchRequests();
    });
  };

  const handleCloseOffersModal = () => {
    setOfferModallIsOpen(false);
  };

  const handleOpenOffersModal = () => {
    setOfferModallIsOpen(true);
  };

  return (
    <>
      <TransitionEffect />

      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
        <OffersModal isOpen={OfferModalIsOpen} onClose={handleCloseOffersModal}>
          <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
            {offers && offers.length > 0 ? (
              <ul className="w-full">
                {offers.reverse().map((offer) => {
                  const date = new Date(offer.createdAt);
                  const arabicDateString = date.toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    // second: "numeric",
                    hour12: true,
                    // timeZone: "UTC",
                  });
                  return (
                    <OfferItem
                      key={offer._id}
                      notificationId={offer._id}
                      title={`${offer.message}`}
                      date={`${arabicDateString}`}
                      link={`${offer.link}`}
                    />
                  );
                })}
              </ul>
            ) : (
              "..."
            )}
          </main>
        </OffersModal>

        <RequestModal
          isOpen={RequestModalIsOpen}
          onClose={handleCloseModal}
          onSubmit={handleModalSubmit}
          submitText={`ارسال العرض`}
        >
          <div className="flex flex-row items-center justify-between">
            <h1 dir="rtl" className="text-xl font-bold mb-4">
              انشاء عرض جديد
            </h1>
          </div>
          <form className="w-full h-auto bg-white shadow-sm rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="description"
              >
                وصف العرض
              </label>
              <textarea
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                rows="3"
                onChange={(e) => {
                  setOfferDesc(e.target.value);
                }}
                value={offerDesc}
                placeholder="الشكل والمواصفات ..."
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
                السعر بالجنيه المصري
              </label>
              <div className="relative">
                <input
                  className="block px-8 appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="price"
                  name="price"
                  type="number"
                  onChange={(e) => {
                    setOfferPrice(e.target.value);
                  }}
                  value={offerPrice}
                ></input>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12l-6-6h12l-6 6z" />
                  </svg>
                </div>
              </div>
            </div>
          </form>
        </RequestModal>

        <Layout className="pt-16">
          <AnimatedText
            text={`طلباتك الحالية`}
            className="mb-16 
            lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl
            "
          />

          <ul
            dir="rtl"
            className="grid grid-cols-3 gap-16 lg:gap-8 md:grid-cols-1 md:gap-y-16"
          >
            {prevRequests &&
              prevRequests.map((request) => {
                return (
                  <FeaturedArticle
                    key={request._id}
                    title={`${request.requestCategory}`}
                    time={`${new Date(request.createdAt).toLocaleString()}`}
                    summary={`${request.requestDesc}`}
                    img={request.requestPhoto}
                    onClick={() => {
                      setClickedRequest(request);
                      handleOpenModal();
                    }}
                  />
                );
              })}
          </ul>
          <h2 className="font-bold text-4xl w-full text-center my-16 mt-32">
            رسائلي السابقة
          </h2>
          <ul>
            {messages &&
              messages.map((message) => {
                return (
                  <Article
                    title={`${message.price}`}
                    img={article4}
                    date={`April 22, 2023`}
                    link={`/`}
                  />
                );
              })}
          </ul>
        </Layout>
      </main>
    </>
  );
};

export default Seller;
