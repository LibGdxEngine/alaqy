import Layout from "@/components/Layout";
import Image from "next/image";
import profilePic from "../../public/images/OIG.jpg";
import TransitionEffect from "@/components/TransitionEffect";
import { useEffect, useState } from "react";
import {
  signup,
  signin,
  forgotPassword,
  authenticate,
  isAuth,
} from "@/actions/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Auth = () => {
  const router = useRouter();
  const [authState, setAuthState] = useState("signin");
  const [inputValues, setInputValues] = useState({
    email: "",
    name: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const user = await isAuth();
      if (user) {
        router.replace("/home");
      }
    };
    fetchUser();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = event.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setInputValues({
      email: "",
      name: "",
      password: "",
      phone: "",
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    signup({ ...inputValues }).then((data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
      }
    });
  };
  const handleSignin = (e) => {
    e.preventDefault();
    signin({ ...inputValues }).then((data) => {
      if (data) {
        if (data.error) {
          toast.error(data.error);
        }

        if (data.user) {
          authenticate(data, () => {
            toast.success("تم التسجيل بنجاح");
            if(data.user.role === 0){
              router.push("/home");
            }else if(data.user.role === 1){
              router.push("/seller");
            }
          
          });
        }
      }
    });
  };

  const handleForgetPassword = (e) => {
    e.preventDefault();
    forgotPassword({ ...inputValues }).then((data) => {
      toast.success(data.message);
    });
  };

  return (
    <>
      <TransitionEffect />
      <Layout>
        <div className="h-screen flex bg-black sm:m-0">
          <div
            style={{
              background:
                "linear-gradient(rgba(2,2,2,.7),rgba(0,0,0,.7)),url(https://th.bing.com/th/id/OIG.Qizgg7jO8DqbAR4hfsxW?pid=ImgGn) center center",
            }}
            className=" w-full 
          justify-around items-center lg:hidden "
          >
            <div
              className=" 
                  bg-black 
                  opacity-20 
                  inset-0 
                  z-0"
            ></div>
            {/* <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
              <h1 className="text-white font-bold text-4xl font-sans">
                هتلاقي فين تاني؟
              </h1>
              <p className="text-white mt-1">The simplest app to use</p>
              <div className="flex justify-center lg:justify-start mt-6">
                <a
                  href="#"
                  className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
                >
                  Get Started
                </a>
              </div>
            </div> */}
          </div>
          {authState === "signin" && (
            <div className="flex w-full lg:w-fulljustify-center items-center bg-white space-y-8">
              <div className="w-full px-8 md:px-8 lg:px-24 sm:px-0">
                <form
                  onSubmit={handleSignin}
                  dir="rtl"
                  className="bg-white rounded-md shadow-2xl p-5"
                >
                  <h1 className="text-gray-800 font-bold text-2xl mb-1">
                    أهلا بيك
                  </h1>
                  <p className="text-sm font-normal text-gray-600 mb-8">
                    سجل معانا علشان تلاقي
                  </p>
                  <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    <input
                      onChange={handleChange}
                      id="email"
                      className=" pl-2 w-full outline-none border-none"
                      type="email"
                      name="email"
                      placeholder="البريد الالكتروني"
                    />
                  </div>
                  <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      onChange={handleChange}
                      className="pl-2 w-full outline-none border-none"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="كلمة السر"
                    />
                  </div>
                  <button
                    type="submit"
                    className="block w-full bg-primary mt-5 py-2 rounded-2xl hover:bg-primaryDark hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                  >
                    تسجيل الدخول
                  </button>
                  <div className="flex justify-between mt-4">
                    <span
                      onClick={() => {
                        setAuthState("reset");
                        handleReset();
                      }}
                      className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                    >
                      نسيت كلمة السر؟
                    </span>

                    <div
                      onClick={() => {
                        setAuthState("signup");
                        handleReset();
                      }}
                      className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                    >
                      حساب جديد
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
          {authState === "signup" && (
            <div className="flex w-full lg:w-fulljustify-center items-center bg-white space-y-8">
              <div className="w-full px-8 md:px-8 lg:px-24 sm:px-0">
                <form
                  onSubmit={handleSignup}
                  dir="rtl"
                  className="bg-white rounded-md shadow-2xl p-5"
                >
                  <h1 className="text-gray-800 font-bold text-2xl mb-1">
                    أهلا بيك
                  </h1>
                  <p className="text-sm font-normal text-gray-600 mb-8">
                    سجل معانا علشان تلاقي
                  </p>
                  <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth={3}
                      viewBox="0 0 64 64"
                    >
                      <circle cx={32} cy={18.14} r={11.14} />
                      <path d="M54.55 56.85A22.55 22.55 0 0 0 32 34.3 22.55 22.55 0 0 0 9.45 56.85Z" />
                    </svg>
                    <input
                      id="name"
                      className=" pl-2 w-full outline-none border-none"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      placeholder="الاسم الكريم"
                    />
                  </div>
                  <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    <input
                      id="email"
                      className=" pl-2 w-full outline-none border-none"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      placeholder="البريد الالكتروني"
                    />
                  </div>
                  <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M19.308 12.467a24.095 24.095 0 0 1-.881-4.384C18.27 6.602 16.977 5.5 15.488 5.5H8.58c-1.777 0-3.145 1.535-2.989 3.304 1.575 17.829 15.777 32.03 33.606 33.606 1.77.156 3.304-1.207 3.304-2.984v-6.16c0-2.248-1.102-3.536-2.583-3.693a24.095 24.095 0 0 1-4.384-.88 4.903 4.903 0 0 0-4.87 1.243l-2.957 2.957a31.27 31.27 0 0 1-12.599-12.599l2.957-2.957a4.903 4.903 0 0 0 1.244-4.87Z"
                        style={{
                          fill: "currentColor",
                          stroke: "currentColor",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                        }}
                      />
                    </svg>
                    <input
                      id="phone"
                      className=" pl-2 w-full outline-none border-none"
                      type="phone"
                      name="phone"
                      onChange={handleChange}
                      placeholder="رقم الهاتف"
                    />
                  </div>
                  <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      className="pl-2 w-full outline-none border-none"
                      type="password"
                      name="password"
                      id="password"
                      onChange={handleChange}
                      placeholder="كلمة السر"
                    />
                  </div>
                  <button
                    type="submit"
                    className="block w-full bg-primary mt-5 py-2 rounded-2xl hover:bg-primaryDark hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                  >
                    تسجيل
                  </button>
                  <div className="flex justify-between mt-4">
                    <span
                      onClick={() => {
                        setAuthState("reset");
                        handleReset();
                      }}
                      className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                    >
                      نسيت كلمة السر؟
                    </span>

                    <div
                      onClick={() => {
                        setAuthState("signin");
                        handleReset();
                      }}
                      className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                    >
                      تسجيل الدخول
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
          {authState === "reset" && (
            <div className="flex w-full lg:w-fulljustify-center items-center bg-white space-y-8">
              <div className="w-full px-8 md:px-8 lg:px-24 sm:px-0">
                <form
                  onSubmit={handleForgetPassword}
                  dir="rtl"
                  className="bg-white rounded-md shadow-2xl p-5"
                >
                  <h1 className="text-gray-800 font-bold text-2xl mb-1">
                    أهلا بيك
                  </h1>
                  <p className="text-sm font-normal text-gray-600 mb-8">
                    اكتب ايميلك علشان تقدر تستعيد كلمة السر
                  </p>
                  <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    <input
                      onChange={handleChange}
                      id="email"
                      className=" pl-2 w-full outline-none border-none"
                      type="email"
                      name="email"
                      placeholder="البريد الالكتروني"
                    />
                  </div>

                  <button
                    type="submit"
                    className="block w-full bg-primary mt-5 py-2 rounded-2xl hover:bg-primaryDark hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                  >
                    استعادة
                  </button>
                  <div className="flex justify-between mt-4">
                    <span
                      onClick={() => {
                        setAuthState("reset");
                        handleReset();
                      }}
                      className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                    >
                      نسيت كلمة السر؟
                    </span>

                    <div
                      onClick={() => {
                        setAuthState("signin");
                        handleReset();
                      }}
                      className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                    >
                      تسجيل الدخول
                    </div>
                    <div
                      onClick={() => {
                        setAuthState("signup");
                        handleReset();
                      }}
                      className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                    >
                      حساب جديد
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Auth;
