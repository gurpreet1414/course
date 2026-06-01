// "use client";

// import React, { useRef, useState } from "react";
// import Link from "next/link";
// import {
//   motion,
//   useMotionValueEvent,
//   useReducedMotion,
//   useScroll,
//   useSpring,
//   useTransform,
// } from "framer-motion";
// import {
//   Shield,
//   Activity,
//   ShieldCheck,
//   HeartPulse,
//   HardHat,
//   ShieldAlert,
//   Clock3,
//   BadgePoundSterling,
//   ArrowUpRight,
//   Sparkles,
//   CheckCircle2,
// } from "lucide-react";

// const courses = [
//   {
//     title: "CITB Health & Safety",
//     duration: "1 Day",
//     price: "£85",
//     icon: Shield,
//     image:
//       "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
//     description:
//       "A practical entry-level course designed for learners who want to begin or progress in construction safely and confidently.",
//   },
//   {
//     title: "NEBOSH",
//     duration: "5 Days",
//     price: "£450",
//     icon: Activity,
//     image:
//       "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=80",
//     description:
//       "A respected safety qualification for professionals who want stronger workplace health and safety knowledge.",
//   },
//   {
//     title: "IOSH Managing Safely",
//     duration: "3 Days",
//     price: "£350",
//     icon: ShieldCheck,
//     image:
//       "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80",
//     description:
//       "Perfect for managers and supervisors who need practical safety skills for day-to-day team responsibility.",
//   },
//   {
//     title: "First Aid",
//     duration: "1 Day",
//     price: "£50",
//     icon: HeartPulse,
//     image:
//       "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80",
//     description:
//       "Learn essential first aid skills to respond confidently in workplace and emergency situations.",
//   },
//   {
//     title: "EUSR Course",
//     duration: "1 Day",
//     price: "£110",
//     icon: HardHat,
//     image:
//       "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?auto=format&fit=crop&w=1400&q=80",
//     description:
//       "A focused course for learners working around utility, construction, and site-based environments.",
//   },
//   {
//     title: "SSSTS",
//     duration: "2 Days",
//     price: "£195",
//     icon: ShieldAlert,
//     image:
//       "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=1400&q=80",
//     description:
//       "Ideal for site supervisors who want to manage safety, compliance, and site teams more effectively.",
//   },
// ];

// function clamp(value, min, max) {
//   return Math.min(Math.max(value, min), max);
// }

// function PopularCourses() {
//   const sectionRef = useRef(null);
//   const shouldReduceMotion = useReducedMotion();
//   const [activeIndex, setActiveIndex] = useState(0);

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start start", "end end"],
//   });

//   const progress = useSpring(scrollYProgress, {
//     stiffness: shouldReduceMotion ? 140 : 78,
//     damping: shouldReduceMotion ? 40 : 34,
//     mass: shouldReduceMotion ? 0.2 : 0.75,
//   });

//   const stackProgress = useTransform(progress, (value) =>
//     clamp((value - 0.035) / 0.93, 0, 1)
//   );

//   const titleOpacity = useTransform(progress, [0, 0.08, 0.94, 1], [0, 1, 1, 0.5]);
//   const titleY = useTransform(
//     progress,
//     [0, 0.08, 0.94, 1],
//     [18, 0, 0, -12]
//   );

//   useMotionValueEvent(stackProgress, "change", (latest) => {
//     const nextIndex = clamp(
//       Math.round(latest * (courses.length - 1)),
//       0,
//       courses.length - 1
//     );

//     setActiveIndex((currentIndex) =>
//       currentIndex === nextIndex ? currentIndex : nextIndex
//     );
//   });

//   return (
//     <section
//       ref={sectionRef}
//       className="relative isolate bg-[#07120c] text-white"
//     >
//       <div
//         className="relative"
//         style={{
//           height: `calc(${courses.length * 96}svh + 14rem)`,
//         }}
//       >
//         <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
//           <div className="pointer-events-none absolute inset-0">
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(149,193,31,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.09),transparent_36%)]" />
//             <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:72px_72px]" />
//             <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
//           </div>

//           <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-4 py-5 sm:px-6 lg:px-8">
//             <motion.div
//               style={{ opacity: titleOpacity, y: titleY }}
//               className="mx-auto mb-4 max-w-4xl text-center sm:mb-6"
//             >
//               <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#95c11f]/30 bg-[#95c11f]/10 px-4 py-2 text-[11px] font-black uppercase text-[#c9ff5d] backdrop-blur sm:mb-4">
//                 <Sparkles className="h-4 w-4" />
//                 Popular Courses
//               </div>

//               <h2 className="text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
//                 Choose your next{" "}
//                 <span className="bg-gradient-to-r from-[#95c11f] via-lime-200 to-cyan-200 bg-clip-text text-transparent">
//                   qualification
//                 </span>
//               </h2>

//               <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/65 sm:mt-4 sm:text-base">
//                 Explore trusted construction and safety training with clear
//                 duration, starting price, and flexible booking support.
//               </p>
//             </motion.div>

//             <div className="relative mx-auto h-[56svh] min-h-[380px] max-h-[620px] w-full max-w-6xl sm:h-[62svh] sm:min-h-[430px]">
//               <CourseDots courses={courses} activeIndex={activeIndex} />

//               <div className="absolute inset-x-3 bottom-3 top-8 rounded-[1.35rem] border border-white/10 bg-white/[0.035] shadow-2xl backdrop-blur-md sm:inset-x-8 sm:rounded-[1.9rem]" />

//               {courses.map((course, index) => (
//                 <CourseStackCard
//                   key={course.title}
//                   course={course}
//                   index={index}
//                   total={courses.length}
//                   activeIndex={activeIndex}
//                   progress={stackProgress}
//                   shouldReduceMotion={shouldReduceMotion}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function CourseDots({ courses, activeIndex }) {
//   return (
//     <div
//       aria-hidden="true"
//       className="pointer-events-none absolute right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 sm:flex lg:right-6"
//     >
//       {courses.map((course, index) => (
//         <span
//           key={course.title}
//           className={`h-2.5 w-2.5 rounded-full border transition duration-300 ${
//             activeIndex === index
//               ? "border-[#c9ff5d] bg-[#c9ff5d] shadow-[0_0_18px_rgba(201,255,93,0.7)]"
//               : "border-white/25 bg-white/10"
//           }`}
//         />
//       ))}
//     </div>
//   );
// }

// function CourseStackCard({
//   course,
//   index,
//   total,
//   activeIndex,
//   progress,
//   shouldReduceMotion,
// }) {
//   const Icon = course.icon;
//   const isActive = activeIndex === index;
//   const stackDistance = Math.abs(activeIndex - index);
//   const zIndex = isActive ? total + 10 : total - stackDistance;

//   const current = useTransform(progress, (value) => value * (total - 1));
//   const diff = useTransform(current, (value) => value - index);

//   const y = useTransform(diff, (distance) => {
//     if (distance >= 0) {
//       const depth = clamp(distance, 0, 4);
//       return -depth * 34;
//     }

//     const depth = clamp(Math.abs(distance), 0, 4);
//     return depth * 30 + 8;
//   });

//   const scale = useTransform(diff, (distance) => {
//     if (distance >= 0) {
//       return 1 - clamp(distance, 0, 4) * 0.035;
//     }

//     return 1 - clamp(Math.abs(distance), 0, 4) * 0.03;
//   });

//   const rotateZ = useTransform(diff, (distance) => {
//     if (shouldReduceMotion) return 0;

//     if (distance >= 0) {
//       return -clamp(distance, 0, 4) * 0.45;
//     }

//     return clamp(Math.abs(distance), 0, 4) * 0.35;
//   });

//   const opacity = useTransform(diff, (distance) => {
//     const depth = Math.abs(distance);

//     if (depth > 4.2) return 0;
//     if (depth > 3) {
//       return 1 - (depth - 3) / 1.2;
//     }

//     return distance > 0 ? 0.9 : 1;
//   });

//   const imageScale = useTransform(diff, [-1, 0, 1], [1.05, 1, 1.03]);
//   const contentY = useTransform(diff, [-0.65, 0, 0.9], [18, 0, -24]);
//   const contentOpacity = useTransform(
//     diff,
//     [-0.75, -0.15, 0, 0.42, 0.95],
//     [0, 0.32, 1, 0.45, 0]
//   );

//   return (
//     <motion.article
//       aria-hidden={!isActive}
//       style={{
//         y,
//         scale,
//         rotateZ,
//         opacity,
//         zIndex,
//       }}
//       className={`absolute inset-x-0 top-0 mx-auto h-full w-full max-w-6xl overflow-hidden rounded-[1.35rem] border border-white/15 bg-[#0b1710] shadow-[0_30px_90px_rgba(0,0,0,0.45)] will-change-transform sm:rounded-[2rem] ${
//         isActive ? "pointer-events-auto" : "pointer-events-none"
//       }`}
//     >
//       <motion.img
//         src={course.image}
//         alt={course.title}
//         style={{ scale: imageScale }}
//         className="absolute inset-0 h-full w-full object-cover"
//       />

//       <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/68 to-black/25" />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-transparent to-black/28" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(149,193,31,0.28),transparent_34%)]" />
//       <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#95c11f]/80 to-transparent" />

//       <motion.div
//         style={{
//           y: contentY,
//           opacity: contentOpacity,
//         }}
//         className="relative z-10 flex h-full flex-col justify-between gap-4 p-4 sm:p-8 lg:p-10"
//       >
//         <div className="flex items-start justify-between gap-3">
//           <div className="flex min-w-0 items-start gap-3 sm:gap-4">
//             <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#95c11f]/35 bg-[#95c11f]/15 shadow-[0_0_34px_rgba(149,193,31,0.28)] backdrop-blur sm:h-16 sm:w-16">
//               {!shouldReduceMotion && (
//                 <motion.span
//                   animate={{ rotate: 360 }}
//                   transition={{
//                     duration: 10,
//                     repeat: Infinity,
//                     ease: "linear",
//                   }}
//                   className="absolute inset-[-5px] rounded-[1.2rem] border border-dashed border-[#95c11f]/35 sm:rounded-[1.35rem]"
//                 />
//               )}
//               <Icon className="relative z-10 h-6 w-6 text-[#caff5f] sm:h-8 sm:w-8" />
//             </div>

//             <div className="min-w-0">
//               <p className="text-[10px] font-black uppercase text-[#caff5f] sm:text-xs">
//                 Course 0{index + 1}
//               </p>
//               <h3 className="mt-2 max-w-3xl text-2xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
//                 {course.title}
//               </h3>
//             </div>
//           </div>

//           <div className="hidden rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs font-black uppercase text-white/65 backdrop-blur sm:block">
//             {index + 1}/{total}
//           </div>
//         </div>

//         <div className="max-w-3xl">
//           <p className="max-w-2xl text-xs leading-6 text-white/75 sm:text-base sm:leading-7 lg:text-lg">
//             {course.description}
//           </p>

//           <div className="mt-4 grid max-w-xl grid-cols-2 gap-3 sm:mt-6">
//             <InfoPill
//               icon={Clock3}
//               label="Duration"
//               value={course.duration}
//               shouldReduceMotion={shouldReduceMotion}
//             />
//             <InfoPill
//               icon={BadgePoundSterling}
//               label="Starting from"
//               value={course.price}
//               shouldReduceMotion={shouldReduceMotion}
//             />
//           </div>

//           <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
//             <motion.div
//               whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }}
//               whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
//               className="inline-flex"
//             >
//               <Link
//                 href="/courses"
//                 tabIndex={isActive ? 0 : -1}
//                 className="inline-flex items-center gap-2 rounded-full bg-[#95c11f] px-5 py-3 text-xs font-black text-[#07120c] shadow-[0_18px_45px_rgba(149,193,31,0.28)] transition hover:bg-lime-300 sm:px-6 sm:text-sm"
//               >
//                 View Course
//                 <ArrowUpRight className="h-4 w-4" />
//               </Link>
//             </motion.div>

//             <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-3 text-[11px] font-semibold text-white/65 backdrop-blur sm:text-xs">
//               <CheckCircle2 className="h-4 w-4 shrink-0 text-[#caff5f]" />
//               Flexible booking available
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.article>
//   );
// }

// function InfoPill({ icon: Icon, label, value, shouldReduceMotion }) {
//   return (
//     <motion.div
//       whileHover={shouldReduceMotion ? undefined : { y: -3 }}
//       className="rounded-2xl border border-white/10 bg-black/35 p-3 backdrop-blur-md sm:p-4"
//     >
//       <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 sm:mb-3 sm:h-9 sm:w-9">
//         <Icon className="h-4 w-4 text-[#caff5f]" />
//       </div>

//       <p className="text-[10px] font-bold uppercase text-white/45 sm:text-xs">
//         {label}
//       </p>

//       <p className="mt-1 text-base font-black text-white sm:text-lg">{value}</p>
//     </motion.div>
//   );
// }

// export default PopularCourses;


"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Shield,
  Activity,
  ShieldCheck,
  HeartPulse,
  HardHat,
  ShieldAlert,
  Clock3,
  BadgePoundSterling,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const courses = [
  {
    title: "CITB Health & Safety",
    duration: "1 Day",
    price: "£85",
    icon: Shield,
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    description:
      "A practical entry-level course designed for learners who want to begin or progress in construction safely and confidently.",
  },
  {
    title: "NEBOSH",
    duration: "5 Days",
    price: "£450",
    icon: Activity,
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=80",
    description:
      "A respected safety qualification for professionals who want stronger workplace health and safety knowledge.",
  },
  {
    title: "IOSH Managing Safely",
    duration: "3 Days",
    price: "£350",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80",
    description:
      "Perfect for managers and supervisors who need practical safety skills for day-to-day team responsibility.",
  },
  {
    title: "First Aid",
    duration: "1 Day",
    price: "£50",
    icon: HeartPulse,
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80",
    description:
      "Learn essential first aid skills to respond confidently in workplace and emergency situations.",
  },
  {
    title: "EUSR Course",
    duration: "1 Day",
    price: "£110",
    icon: HardHat,
    image:
      "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?auto=format&fit=crop&w=1400&q=80",
    description:
      "A focused course for learners working around utility, construction, and site-based environments.",
  },
  {
    title: "SSSTS",
    duration: "2 Days",
    price: "£195",
    icon: ShieldAlert,
    image:
      "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=1400&q=80",
    description:
      "Ideal for site supervisors who want to manage safety, compliance, and site teams more effectively.",
  },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function PopularCourses() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: shouldReduceMotion ? 140 : 86,
    damping: shouldReduceMotion ? 40 : 32,
    mass: shouldReduceMotion ? 0.2 : 0.65,
  });

  /*
    Safe timing:
    - Heading comes first using whileInView animation.
    - Card appears shortly after heading.
    - Stack animation starts early, not after a long scroll.
  */
  const stackProgress = useTransform(progress, (value) =>
    clamp((value - 0.035) / 0.92, 0, 1)
  );

  const titleExitOpacity = useTransform(
    progress,
    [0, 0.9, 1],
    [1, 1, 0.55]
  );

  const titleExitY = useTransform(progress, [0, 0.9, 1], [0, 0, -12]);

  const cardsExitOpacity = useTransform(
    progress,
    [0, 0.92, 1],
    [1, 1, 0.55]
  );

  const cardsExitY = useTransform(progress, [0, 0.92, 1], [0, 0, -14]);

  const headingContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
      },
    },
  };

  const headingItem = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 22,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(10px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardIntro = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 34,
      scale: shouldReduceMotion ? 1 : 0.985,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(8px)",
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        delay: shouldReduceMotion ? 0 : 0.28,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  useMotionValueEvent(stackProgress, "change", (latest) => {
    const nextIndex = clamp(
      Math.round(latest * (courses.length - 1)),
      0,
      courses.length - 1
    );

    setActiveIndex((currentIndex) =>
      currentIndex === nextIndex ? currentIndex : nextIndex
    );
  });

  return (
    <section ref={sectionRef} className="relative isolate bg-[#07120c] text-white">
      <div
        className="relative"
        style={{
          height: `calc(${courses.length * 100}svh + 12rem)`,
        }}
      >
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(149,193,31,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.09),transparent_36%)]" />
            <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:72px_72px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
          </div>

          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
            <motion.div
              style={{
                opacity: titleExitOpacity,
                y: titleExitY,
              }}
              variants={headingContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.45 }}
              className="mx-auto mb-7 max-w-4xl text-center sm:mb-9 lg:mb-20"
            >
              <motion.div
                variants={headingItem}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#95c11f]/30 bg-[#95c11f]/10 px-4 py-2 text-[11px] font-black uppercase text-[#c9ff5d] backdrop-blur"
              >
                <Sparkles className="h-4 w-4" />
                Popular Courses
              </motion.div>

              <motion.h2
                variants={headingItem}
                className="text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
              >
                Choose your next{" "}
                <span className="bg-gradient-to-r from-[#95c11f] via-lime-200 to-cyan-200 bg-clip-text text-transparent">
                  qualification
                </span>
              </motion.h2>

              <motion.p
                variants={headingItem}
                className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base"
              >
                Explore trusted construction and safety training with clear
                duration, starting price, and flexible booking support.
              </motion.p>
            </motion.div>

            <motion.div
              style={{
                opacity: cardsExitOpacity,
                y: cardsExitY,
              }}
              variants={cardIntro}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.28 }}
              className="relative mx-auto h-[61svh] min-h-[455px] max-h-[720px] w-full max-w-6xl sm:h-[65svh] sm:min-h-[500px] lg:h-[67svh]"
            >
              <CourseDots courses={courses} activeIndex={activeIndex} />

              <div className="absolute inset-x-3 bottom-3 top-8 rounded-[1.35rem] border border-white/10 bg-white/[0.035] shadow-2xl backdrop-blur-md sm:inset-x-8 sm:rounded-[1.9rem]" />

              {courses.map((course, index) => (
                <CourseStackCard
                  key={course.title}
                  course={course}
                  index={index}
                  total={courses.length}
                  activeIndex={activeIndex}
                  progress={stackProgress}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CourseDots({ courses, activeIndex }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 sm:flex lg:right-6"
    >
      {courses.map((course, index) => (
        <span
          key={course.title}
          className={`h-2.5 w-2.5 rounded-full border transition duration-300 ${
            activeIndex === index
              ? "border-[#c9ff5d] bg-[#c9ff5d] shadow-[0_0_18px_rgba(201,255,93,0.7)]"
              : "border-white/25 bg-white/10"
          }`}
        />
      ))}
    </div>
  );
}

function CourseStackCard({
  course,
  index,
  total,
  activeIndex,
  progress,
  shouldReduceMotion,
}) {
  const Icon = course.icon;
  const isActive = activeIndex === index;
  const stackDistance = Math.abs(activeIndex - index);
  const zIndex = isActive ? total + 10 : total - stackDistance;

  const current = useTransform(progress, (value) => value * (total - 1));
  const diff = useTransform(current, (value) => value - index);

const y = useTransform(diff, (distance) => {
  if (distance >= 0) {
    const depth = clamp(distance, 0, 4);
    return -depth * 32;
  }

  const depth = clamp(Math.abs(distance), 0, 4);
  return depth * 28 + 8;
});

  const scale = useTransform(diff, (distance) => {
    if (distance >= 0) {
      return 1 - clamp(distance, 0, 4) * 0.032;
    }

    return 1 - clamp(Math.abs(distance), 0, 4) * 0.028;
  });

  const rotateZ = useTransform(diff, (distance) => {
    if (shouldReduceMotion) return 0;

    if (distance >= 0) {
      return -clamp(distance, 0, 4) * 0.45;
    }

    return clamp(Math.abs(distance), 0, 4) * 0.35;
  });

  const opacity = useTransform(diff, (distance) => {
    const depth = Math.abs(distance);

    if (depth > 4.2) return 0;
    if (depth > 3) {
      return 1 - (depth - 3) / 1.2;
    }

    return distance > 0 ? 0.9 : 1;
  });

  const imageScale = useTransform(diff, [-1, 0, 1], [1.05, 1, 1.03]);
  const contentY = useTransform(diff, [-0.65, 0, 0.9], [18, 0, -24]);

  const contentOpacity = useTransform(
    diff,
    [-0.75, -0.15, 0, 0.42, 0.95],
    [0, 0.32, 1, 0.45, 0]
  );

  return (
    <motion.article
      aria-hidden={!isActive}
      style={{
        y,
        scale,
        rotateZ,
        opacity,
        zIndex,
      }}
      className={`absolute inset-x-0 top-0 mx-auto h-full w-full max-w-6xl overflow-hidden rounded-[1.35rem] border border-white/15 bg-[#0b1710] shadow-[0_30px_90px_rgba(0,0,0,0.45)] will-change-transform sm:rounded-[2rem] ${
        isActive ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <motion.img
        src={course.image}
        alt={course.title}
        style={{ scale: imageScale }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/68 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-transparent to-black/28" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(149,193,31,0.28),transparent_34%)]" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#95c11f]/80 to-transparent" />

      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
        className="relative z-10 flex h-full flex-col justify-between gap-5 p-5 sm:p-8 lg:p-12"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3 sm:gap-4">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#95c11f]/35 bg-[#95c11f]/15 shadow-[0_0_34px_rgba(149,193,31,0.28)] backdrop-blur sm:h-16 sm:w-16">
              {!shouldReduceMotion && (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-[-5px] rounded-[1.2rem] border border-dashed border-[#95c11f]/35 sm:rounded-[1.35rem]"
                />
              )}

              <Icon className="relative z-10 h-6 w-6 text-[#caff5f] sm:h-8 sm:w-8" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase text-[#caff5f] sm:text-xs">
                Course 0{index + 1}
              </p>

              <h3 className="mt-2 max-w-3xl text-2xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {course.title}
              </h3>
            </div>
          </div>

          <div className="hidden rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs font-black uppercase text-white/65 backdrop-blur sm:block">
            {index + 1}/{total}
          </div>
        </div>

        <div className="max-w-3xl">
          <p className="max-w-2xl text-xs leading-6 text-white/75 sm:text-base sm:leading-7 lg:text-lg">
            {course.description}
          </p>

          <div className="mt-5 grid max-w-xl grid-cols-2 gap-3 sm:mt-7">
            <InfoPill
              icon={Clock3}
              label="Duration"
              value={course.duration}
              shouldReduceMotion={shouldReduceMotion}
            />

            <InfoPill
              icon={BadgePoundSterling}
              label="Starting from"
              value={course.price}
              shouldReduceMotion={shouldReduceMotion}
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 sm:mt-7 sm:gap-3">
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              className="inline-flex"
            >
              <Link
                href="/courses"
                tabIndex={isActive ? 0 : -1}
                className="inline-flex items-center gap-2 rounded-full bg-[#95c11f] px-5 py-3 text-xs font-black text-[#07120c] shadow-[0_18px_45px_rgba(149,193,31,0.28)] transition hover:bg-lime-300 sm:px-6 sm:text-sm"
              >
                View Course
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-3 text-[11px] font-semibold text-white/65 backdrop-blur sm:text-xs">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#caff5f]" />
              Flexible booking available
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

function InfoPill({ icon: Icon, label, value, shouldReduceMotion }) {
  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      className="rounded-2xl border border-white/10 bg-black/35 p-3 backdrop-blur-md sm:p-4"
    >
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 sm:mb-3 sm:h-9 sm:w-9">
        <Icon className="h-4 w-4 text-[#caff5f]" />
      </div>

      <p className="text-[10px] font-bold uppercase text-white/45 sm:text-xs">
        {label}
      </p>

      <p className="mt-1 text-base font-black text-white sm:text-lg">{value}</p>
    </motion.div>
  );
}

export default PopularCourses;