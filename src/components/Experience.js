import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import LiIcon from "./LiIcon";

const Details = ({ position, company, companyLink, time, address, work }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between md:w-[80%"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg dir-rtl text-right">
          {position}&nbsp;{" "}
          <a
            href={companyLink}
            target="_blank"
            className="text-primary dark:text-primaryDark capitalize dir-rtl text-right"
          >
            {company}
          </a>
        </h3>

        <p
          dir="rtl"
          className="font-medium w-full md:text-sm dir-rtl text-right mt-1"
        >
          {work}
        </p>
      </motion.div>
    </li>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  return (
    <div className="my-64">
      <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
        ألاقي ازاي؟
      </h2>
      <div ref={ref} className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top dark:bg-light
          md:w-[2px] md:left-[30px] xs:left-[20px]
          "
        />
        <ul className="w-full flex flex-col items-center justify-between ml-4 xs:ml-2">
          <Details
            position={`ابعتلنا صورة واسم المنتج`}
            company={`📷 علشان نلاقيه`}
            companyLink={`/`}
            time={`حاول تكتب وصف للمنتج`}
            address={`ده هيخليك تلاقي أسرع`}
            work={`وألاقي هيعبت طلب البحث لكل المحلات والأسواق اللي ممكن تلاقي عندها طلبك`}
          />
          <Details
            position={`انتظر يوصلك اشعار`}
            company={`⌛بالعروض المناسبة`}
            companyLink={`/`}
            time={`بداية من عام 2014`}
            address={`شارع المدينة المنورة المقطم الهضبة العليا`}
            work={`كل المحلات اللي هنلاقي عندها طلبك هتعرضلك أسعارها ومنتجاتها علشان تقدر تقارن بكل سهولة`}
          />
          <Details
            position={`تواصل مع البائع`}
            company={`💐وألف مبروك يا عم`}
            companyLink={`https://web.facebook.com/aladelcharitableassociation`}
            time={`بداية من عام 2023`}
            address={`المقطم - الهضبة الوسطى`}
            work={`إبدأ كلامك مع البايئع مباشرة من خلال شات سريع وبسيط هيخليك تتفق معاه على كل التفاصيل الباقية`}
          />
        </ul>
      </div>
    </div>
  );
};

export default Experience;
