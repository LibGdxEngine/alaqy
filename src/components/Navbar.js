import Link from "next/link";
import Logo from "./Logo";
import { useRouter } from "next/router";
import {
  TwitterIcon,
  DribbbleIcon,
  GithubIcon,
  LinkedInIcon,
  PinterestIcon,
  SunIcon,
  MoonIcon,
  FacebookIcon,
} from "./Icons";
import { motion } from "framer-motion";
import useThemeSwitcher from "./hooks/useThemeSwitcher";
import { useEffect, useState } from "react";
import { isAuth } from "@/actions/auth";

const CustomLink = ({ href, title, className = "" }) => {
  const router = useRouter();
  return (
    <Link href={href} className={`${className} relative group`}>
      {title}

      <span
        className={`h-[1px] inline-block bg-dark absolute left-0
       -bottom-0.5
       group-hover:w-full transition-[width] ease duration-300
       ${router.asPath === href ? "w-full" : "w-0"}
       dark:bg-light 
       `}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const CustomMobileLink = ({ href, title, className = "", toggle }) => {
  const router = useRouter();
  const handleClick = () => {
    toggle();
    router.push(href);
  };
  return (
    <button
      onClick={handleClick}
      href={href}
      className={`${className} relative group text-light dark:text-dark my-2`}
    >
      {title}

      <span
        className={`h-[1px] inline-block bg-light absolute left-0
       -bottom-0.5
       group-hover:w-full transition-[width] ease duration-300
       ${router.asPath === href ? "w-full" : "w-0"}
       dark:bg-dark 
       `}
      >
        &nbsp;
      </span>
    </button>
  );
};

const Navebar = (props) => {
  const onLogoClick = props.onLogoClick;
  const router = useRouter();
  const [userSignedIn, setUserSignedIn] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      const user = await isAuth();

      if (user) {
        setUserSignedIn(user);
      } else {
        setUserSignedIn(false);
      }
    };
    fetchUser();
  }, [router.pathname]);

  const [mode, setMode] = useThemeSwitcher();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className="w-full px-32 py-8 font-medium flex items-center justify-between
    dark:text-light z-10 lg:px-16 md:px-12 sm:px-8
    "
    >
      <button
        className="flex-col justify-center items-center hidden lg:flex"
        onClick={handleClick}
      >
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out  h-0.5 w-6 rounded-sm -translate-y-0.5 ${
            isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out  h-0.5 w-6 rounded-sm my-0.5 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out  h-0.5 w-6 rounded-sm -translate-y-0.5 ${
            isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
          }`}
        ></span>
      </button>

      <div className="w-full flex items-center justify-between lg:hidden">
        <nav>
          {!userSignedIn && (
            <CustomLink href={`/auth`} title={"تسجيل"} className="ml-4" />
          )}
          {userSignedIn && (
            <>
              {userSignedIn.role === 0 ? (
                <CustomLink href={`/home`} title={"طلباتي"} className="ml-4" />
              ) : (
                <CustomLink
                  href={`/seller`}
                  title={"طلباتي"}
                  className="ml-4"
                />
              )}
            </>
          )}

          {/* <CustomLink href={`/projects`} title={"برامجنا"} className="mx-4" /> */}
          <CustomLink href={`/about`} title={"من نحن"} className="mx-4" />
          <CustomLink href={`/`} title={"الصفحة الرئيسية"} />
        </nav>

        <nav className="flex items-center justify-center flex-wrap">
          <motion.a
            href={`https://www.facebook.com/aladelcharitableassociation?_rdc=1&_rdr`}
            target={`_blank`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 mr-3"
          >
            <FacebookIcon />
          </motion.a>
          <motion.a
            href={`https://www.facebook.com/aladelcharitableassociation?_rdc=1&_rdr`}
            target={`_blank`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 mx-3"
          >
            <GithubIcon />
          </motion.a>
          <motion.a
            href={`https://www.facebook.com/aladelcharitableassociation?_rdc=1&_rdr`}
            target={`_blank`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 mx-3"
          >
            <LinkedInIcon />
          </motion.a>
          <motion.a
            href={`https://www.facebook.com/aladelcharitableassociation?_rdc=1&_rdr`}
            target={`_blank`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 mx-3"
          >
            <PinterestIcon />
          </motion.a>
          <motion.a
            href={`https://www.facebook.com/aladelcharitableassociation?_rdc=1&_rdr`}
            target={`_blank`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 ml-3"
          >
            <DribbbleIcon />
          </motion.a>

          <button
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            className={`ml-3 flex items-center justify-center rounded-full p-1 ${
              mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
            }`}
          >
            {mode === "dark" ? (
              <SunIcon className={`fill-dark`} />
            ) : (
              <MoonIcon className={`fill-dark`} />
            )}
          </button>
        </nav>
      </div>

      {isOpen ? (
        <motion.div
          initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
          animate={{ scale: 1, opacity: 1 }}
          className="min-w-[70vw] flex flex-col items-center z-30 justify-between fixed top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2 backdrop-blur-md py-32 bg-dark/90 dark:bg-light/75 rounded-lg
        "
        >
          <nav className="flex items-center flex-col justify-center">
            <CustomMobileLink
              href={`/`}
              title={"الصفحة الرئيسية"}
              toggle={handleClick}
            />
            <CustomMobileLink
              href={`/about`}
              title={"من نحن"}
              toggle={handleClick}
            />
            {userSignedIn.role === 0 ? (
              <CustomMobileLink
                href={`/home`}
                title={"طلباتي"}
                className="ml-4"
              />
            ) : (
              <CustomMobileLink
                href={`/seller`}
                title={"طلباتي"}
                className="ml-4"
              />
            )}
            {!userSignedIn ? (
              <CustomMobileLink
                href={`/auth`}
                title={"تسجيل"}
                toggle={handleClick}
              />
            ) : (
              ""
            )}
          </nav>

          <nav className="flex items-center justify-center flex-wrap mt-2">
            <motion.a
              href={`https://www.facebook.com/aladelcharitableassociation?_rdc=1&_rdr`}
              target={`_blank`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mr-3 sm:mx-1"
            >
              <TwitterIcon />
            </motion.a>
            <motion.a
              href={`https://www.facebook.com/aladelcharitableassociation?_rdc=1&_rdr`}
              target={`_blank`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3 sm:mx-1"
            >
              <GithubIcon />
            </motion.a>
            <motion.a
              href={`https://www.facebook.com/aladelcharitableassociation?_rdc=1&_rdr`}
              target={`_blank`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3 sm:mx-1"
            >
              <LinkedInIcon />
            </motion.a>
            <motion.a
              href={`https://www.facebook.com/aladelcharitableassociation?_rdc=1&_rdr`}
              target={`_blank`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3 sm:mx-1"
            >
              <PinterestIcon />
            </motion.a>
            <motion.a
              href={`https://www.facebook.com/aladelcharitableassociation?_rdc=1&_rdr`}
              target={`_blank`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 ml-3 sm:mx-1"
            >
              <DribbbleIcon />
            </motion.a>

            <button
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              className={`ml-3 flex items-center justify-center rounded-full p-1 ${
                mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
              }`}
            >
              {mode === "dark" ? (
                <SunIcon className={`fill-dark`} />
              ) : (
                <MoonIcon className={`fill-dark`} />
              )}
            </button>
          </nav>
        </motion.div>
      ) : null}

      {userSignedIn ? (
        <div className="absolute left-[50%] top-2 translate-x-[-50%] sm:top-0">
          <Logo onClick={onLogoClick} />
        </div>
      ) : (
        ""
      )}
    </header>
  );
};

export default Navebar;
