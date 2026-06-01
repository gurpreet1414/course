"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Image from "next/image";

const paths = [
  {
    level: "Level 2",
    title: "Worker",
    cardName: "Blue Card",
    image: "/metalicc.png",
    description:
      "Start your construction career with the essential skills, safety knowledge, and site-readiness needed to work confidently as a qualified worker.",
    points: ["Entry-level pathway", "Site safety basics", "Practical job skills"],
  },
  {
    level: "Level 3",
    title: "Supervisor",
    cardName: "Gold Card",
    image: "/goldenm.png",
    description:
      "Step into a leadership role by learning how to manage teams, coordinate daily site tasks, and maintain high safety and quality standards.",
    points: ["Team supervision", "Worksite coordination", "Leadership growth"],
  },
  {
    level: "Level 4/5",
    title: "Senior / Advanced",
    cardName: "Green Card",
    image: "/greenm.png",
    description:
      "Build advanced expertise for senior responsibilities, complex site operations, and higher-level decision-making across construction projects.",
    points: ["Advanced skills", "Senior responsibilities", "Project confidence"],
  },
  {
    level: "Level 6",
    title: "Manager",
    cardName: "Black Card",
    image: "/blackm.png",
    description:
      "Progress into management with the knowledge to lead projects, guide teams, manage compliance, and take ownership of construction delivery.",
    points: ["Project management", "Compliance leadership", "Career progression"],
  },
];

function AnimatedWords({ text, scrollYProgress, start, middle, end }) {
  const words = text.split(" ");

  return (
    <h3 className="text-white mb-5 flex max-w-2xl flex-wrap gap-x-3 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
      {words.map((word, wordIndex) => {
        const wordStart = start + wordIndex * 0.008;
        const wordEnd = end - 0.06;

        const y = useTransform(
          scrollYProgress,
          [wordStart, middle, wordEnd],
          [20, 0, -20]
        );

        const rotateX = useTransform(
          scrollYProgress,
          [wordStart, middle, wordEnd],
          [10, 0, -8]
        );

        return (
          <motion.span
            key={`${word}-${wordIndex}`}
            style={{
              opacity: 1,
              y,
              rotateX,
              filter: "blur(0px)",
              transformPerspective: 900,
              transformStyle: "preserve-3d",
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        );
      })}
    </h3>
  );
}

function FloatingBackground({ scrollYProgress }) {
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yOne = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const yTwo = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{ rotate, y: yOne, scale }}
        className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-lime-500/[0.06] blur-3xl"
      />

      <motion.div
        style={{ rotate, y: yTwo }}
        className="absolute -right-24 bottom-20 h-96 w-96 rounded-full bg-cyan-500/[0.04] blur-3xl"
      />

      <motion.div
        style={{ y: yOne }}
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-lime-400/[0.03] blur-2xl"
      />
    </div>
  );
}

function CareerSlide({ path, index, scrollYProgress }) {
  const total = paths.length;

  const start = index / total;

  const enter = start + 0.1 / total;

  // Reduced hold time
  const holdStart = start + 0.22 / total;
  const holdEnd = start + 0.58 / total;

  const end = (index + 1) / total;

  const middle = (holdStart + holdEnd) / 2;

  const isFirst = index === 0;

  const opacity = useTransform(
    scrollYProgress,
    [start, enter, holdStart, holdEnd, end],
    [0, 1, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start, enter, holdStart, holdEnd, end],
    isFirst ? [80, 0, 0, 0, -120] : [150, 0, 0, 0, -150]
  );

  const scale = useTransform(
    scrollYProgress,
    [start, enter, holdStart, holdEnd, end],
    isFirst ? [0.96, 1, 1, 1, 1.04] : [0.72, 1, 1, 1, 1.08]
  );

  const rotateX = useTransform(
    scrollYProgress,
    [start, enter, holdStart, holdEnd, end],
    isFirst ? [0, 0, 0, 0, -10] : [25, 0, 0, 0, -22]
  );

  const rotateY = useTransform(
    scrollYProgress,
    [start, enter, holdStart, holdEnd, end],
    isFirst ? [0, 0, 0, 0, 10] : [-22, 0, 0, 0, 22]
  );

  const z = useTransform(
    scrollYProgress,
    [start, enter, holdStart, holdEnd, end],
    isFirst ? [0, 0, 0, 0, 120] : [-420, 0, 0, 0, 260]
  );

  const contentX = useTransform(
    scrollYProgress,
    [start, enter, holdStart, holdEnd, end],
    isFirst ? [-40, 0, 0, 0, 70] : [-120, 0, 0, 0, 90]
  );

  const imageX = useTransform(
    scrollYProgress,
    [start, enter, holdStart, holdEnd, end],
    isFirst ? [40, 0, 0, 0, -90] : [150, 0, 0, 0, -110]
  );

  const imageRotateX = useTransform(
    scrollYProgress,
    [start, enter, holdStart, holdEnd, end],
    isFirst ? [0, 0, 0, 0, -10] : [24, 0, 0, 0, -18]
  );

  const imageRotateY = useTransform(
    scrollYProgress,
    [start, enter, holdStart, holdEnd, end],
    isFirst ? [0, 0, 0, 0, 12] : [-28, 0, 0, 0, 22]
  );

  const imageRotateZ = useTransform(
    scrollYProgress,
    [start, enter, holdStart, holdEnd, end],
    isFirst ? [0, 0, 0, 0, 4] : [-8, 0, 0, 0, 7]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [start, enter, holdStart, holdEnd, end],
    isFirst ? [0.96, 1, 1, 1, 1.04] : [0.75, 1, 1, 1, 1.08]
  );

  const descriptionOpacity = useTransform(
    scrollYProgress,
    [start, enter, holdStart, holdEnd, end],
    [0, 1, 1, 1, 0]
  );

  const descriptionY = useTransform(
    scrollYProgress,
    [start, enter, holdStart, holdEnd, end],
    [35, 0, 0, 0, -35]
  );

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        rotateX,
        rotateY,
        z,
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
      }}
      className="absolute inset-0 flex items-center will-change-transform"
    >
      <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Left Content */}
        <motion.div style={{ x: contentX }} className="order-2 lg:order-1">
          <motion.div
            style={{
              opacity: descriptionOpacity,
              y: descriptionY,
            }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-5 py-2 shadow-lg backdrop-blur-md border border-white/10"
          >
            <Sparkles className="text-lime-400 h-4 w-4" />
            <span className="text-lime-400 text-xs font-bold uppercase tracking-widest">
              {path.level}
            </span>
            <CheckCircle2 className="text-lime-400 h-4 w-4" />
          </motion.div>

          <AnimatedWords
            text={path.title}
            scrollYProgress={scrollYProgress}
            start={start}
            middle={middle}
            end={end}
          />

          <motion.p
            style={{
              opacity: descriptionOpacity,
              y: descriptionY,
            }}
            className="text-white max-w-xl text-lg font-medium leading-8 sm:text-xl"
          >
            {path.description}
          </motion.p>

          <motion.div
            style={{
              opacity: descriptionOpacity,
              y: descriptionY,
            }}
            className="mt-8 grid max-w-xl gap-4 sm:grid-cols-3"
          >
            {path.points.map((point, pointIndex) => (
              <motion.div
                key={point}
                style={{
                  transformPerspective: 900,
                  transformStyle: "preserve-3d",
                }}
                initial={{
                  opacity: 0,
                  y: 40,
                  rotateX: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: pointIndex * 0.12,
                  ease: "easeOut",
                }}
                viewport={{ once: false, amount: 0.4 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md"
              >
                <CheckCircle2 className="text-lime-400 mb-3 h-5 w-5" />
                <p className="text-white text-sm font-bold">{point}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            style={{
              opacity: descriptionOpacity,
              y: descriptionY,
            }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button className="bg-lime-400 hover:bg-lime-300 group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-black shadow-[0_0_30px_rgba(163,230,53,0.2)] transition-all duration-300 hover:scale-105">
              View {path.cardName}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <span className="text-white text-sm font-semibold">
              {path.cardName}
            </span>
          </motion.div>
        </motion.div>

        {/* Right Image Card */}
        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <motion.div
            style={{
              x: imageX,
              scale: imageScale,
              rotateX: imageRotateX,
              rotateY: imageRotateY,
              rotateZ: imageRotateZ,
              transformPerspective: 1200,
              transformStyle: "preserve-3d",
            }}
            className="relative aspect-[1.58] w-full rounded-[2.5rem]"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative h-full w-full overflow-hidden rounded-[2rem]"
            >
              <Image
                src={path.image}
                alt={path.cardName}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>

            <motion.div
              animate={{
                opacity: [0.45, 1, 0.45],
                scale: [1, 1.06, 1],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-4 -top-4 rounded-full bg-lime-400 px-5 py-3 text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_30px_rgba(163,230,53,0.4)]"
            >
              {path.title}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function CareerProgress({ scrollYProgress }) {
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="absolute right-6 top-1/2 hidden h-64 -translate-y-1/2 lg:block">
      <div className="relative h-full w-[3px] overflow-hidden rounded-full bg-white/10">
        <motion.div
          style={{ height: progressHeight }}
          className="bg-lime-400 absolute left-0 top-0 w-full rounded-full shadow-[0_0_10px_rgba(163,230,53,0.5)]"
        />
      </div>

      <div className="absolute -left-[6px] top-0 flex h-full flex-col justify-between">
        {paths.map((item) => (
          <div
            key={item.cardName}
            className="h-4 w-4 rounded-full border-2 border-[#020202] bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.4)]"
          />
        ))}
      </div>
    </div>
  );
}

function CareerPath() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.35,
  });

  return (
    <section
      ref={sectionRef}
      className="relative mt-20 h-[720vh] bg-[#020202]"
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-16">
        <FloatingBackground scrollYProgress={smoothScrollProgress} />

        <div className="container relative mx-auto h-[800px] px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            style={{
              y: useTransform(smoothScrollProgress, [0, 1], [0, -120]),
              opacity: useTransform(smoothScrollProgress, [0, 0.12], [1, 0]),
            }}
            className="absolute left-4 top-0 z-20 sm:left-6 lg:left-8"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-lime-400 text-xs font-bold uppercase tracking-widest">
                Your Career Path
              </span>
              <CheckCircle2 className="text-lime-400 h-4 w-4" />
            </div>

            <h2 className="text-white text-3xl font-extrabold leading-tight sm:text-6xl">
              One Path. Many Opportunities.
            </h2>
          </motion.div>

          {/* Slides */}
          <div
            className="relative h-full pt-28"
            style={{
              perspective: "1400px",
              transformStyle: "preserve-3d",
            }}
          >
            {paths.map((path, index) => (
              <CareerSlide
                key={path.cardName}
                path={path}
                index={index}
                scrollYProgress={smoothScrollProgress}
              />
            ))}
          </div>

          <CareerProgress scrollYProgress={smoothScrollProgress} />
        </div>
      </div>
    </section>
  );
}

export default CareerPath;