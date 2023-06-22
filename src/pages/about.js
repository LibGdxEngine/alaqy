import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import profilePic from "../../public/images/OIC.jpg";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import Activities from "@/components/Activities";
import Experience from "@/components/Experience";
import TransitionEffect from "@/components/TransitionEffect";

const AnimatedNumbers = ({ value }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current && latest.toFixed(0) <= value) {
        ref.current.textContent = latest.toFixed(0);
      }
    });
  }, [springValue, value]);
  return <span ref={ref}></span>;
};

const About = () => {
  return (
    <>
      <Head>
        <title>ألاقي</title>
        <meta name="description" content="ألاقي" />
      </Head>
      <TransitionEffect />
      <main className="dark:text-light flex w-full flex-col items-center justify-center">
        <Layout className="pt-16">
          <AnimatedText
            text={`ألاقي - سهل عليك المهمة`}
            className="mb-16 lg:!text-6xl sm:!text-5xl xs:!text-3xl sm:mb-8"
          />
          <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
            <div
              dir="rtl"
              className="col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-8"
            >
              <h2
                dir="rtl"
                className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75"
              >
                تعريف بالتطبيق
              </h2>
              <p dir="rtl" className="font-medium">
                تطبيق ألاقي هو تطبيق بحث عن المنتجات يساعد المستخدمين على
                العثور على المنتجات التي يبحثون عنها بسهولة وسرعة. يتيح التطبيق
                للمستخدمين إدخال مصطلحات البحث والبحث عن المنتجات في مجموعة
                واسعة من الفئات مثل الملابس والأحذية والإلكترونيات والأجهزة
                المنزلية والمزيد.
              </p>
              <p dir="rtl" className="my-4 font-medium">
                يتميز تطبيق ألاقي بواجهة مستخدم بسيطة وسهلة الاستخدام، حيث
                يمكن للمستخدمين البحث عن المنتجات باستخدام الكلمات الرئيسية أو
                العبارات الأكثر تحديدًا. يقوم التطبيق بالبحث في قاعدة بيانات
                كبيرة للمنتجات ويعرض نتائج البحث بطريقة سهلة القراءة والاستخدام.
                بالإضافة إلى ذلك، يوفر التطبيق ميزات إضافية مثل إمكانية فرز
                النتائج حسب السعر أو التقييمات أو العلامة التجارية، وإمكانية حفظ
                المنتجات المفضلة في قائمة مرجعية للرجوع إليها لاحقًا، وإمكانية
                مشاركة المنتجات مع الآخرين عبر وسائل التواصل الاجتماعي. باختصار،
              </p>
              <p className="font-medium">
                يعد تطبيق ألاقي خيارًا ممتازًا لأي شخص يبحث عن طريقة سهلة
                وفعالة للعثور على المنتجات التي يحتاجها، مع واجهة مستخدم بسيطة
                وميزات إضافية تجعل تجربة البحث عن المنتجات أكثر سلاسة وراحة.
              </p>
            </div>
            <div
              className="col-span-3 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8
            dark:bg-dark dark:border-light xl:col-span-4 md:order-1 md:col-span-8
            "
            >
              <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light" />
              <Image
                src={profilePic}
                priority={true}
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
                alt="Ahmed Fathy"
                className="w-full h-auto rounded-2xl"
              />
            </div>
            <div className="col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row xl:items-center md:order-3">
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumbers value={65} />+
                </span>
                <h2
                  className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base
                xs:text-sm
                "
                >
                  نوع من أنواع المنتجات
                </h2>
              </div>
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumbers value={5600} />+
                </span>
                <h2
                  className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base
                xs:text-sm"
                >
                  مستخدم
                </h2>
              </div>
              <div className="flex flex-col items-end justify-center xl:items-center">
                <span className="inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl">
                  <AnimatedNumbers value={11230} />+
                </span>
                <h2
                  className="text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base
                xs:text-sm"
                >
                  منتج تم البحث عنه
                </h2>
              </div>
            </div>
          </div>
          <Activities />
          <Experience />
        </Layout>
      </main>
    </>
  );
};

export default About;
