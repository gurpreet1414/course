// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import Select from "react-select";
// import {
//     ShieldCheck,
//     Headphones,
//     Award,
//     BookOpen,
//     Search,
//     Zap,
//     Hammer,
//     Cuboid,
//     PaintRoller,
//     Shovel,
//     Home,
// } from "lucide-react";
// import coursesData from "../data/courses.json";

// /* =========================
//    Dark React Select Styles
// ========================= */
// const customStyles = {
//     control: (base, state) => ({
//         ...base,
//         borderRadius: "16px",
//         padding: "6px 8px",
//         borderColor: state.isFocused
//             ? "rgba(163,230,53,0.6)"
//             : "rgba(255,255,255,0.1)",
//         boxShadow: state.isFocused
//             ? "0 0 0 3px rgba(163,230,53,0.15)"
//             : "none",
//         backgroundColor: "rgba(255,255,255,0.03)",
//         backdropFilter: "blur(16px)",
//         border: state.isFocused
//             ? "1px solid rgba(163,230,53,0.6)"
//             : "1px solid rgba(255,255,255,0.1)",
//         minHeight: "52px",
//         transition: "all 0.25s ease",
//         color: "#fff",
//     }),

//     menu: (base) => ({
//         ...base,
//         borderRadius: "16px",
//         overflow: "hidden",
//         zIndex: 9999999,
//         border: "1px solid rgba(255,255,255,0.1)",
//         boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
//         backgroundColor: "#080808",
//     }),

//     option: (base, state) => ({
//         ...base,
//         backgroundColor: state.isFocused
//             ? "rgba(163,230,53,0.12)"
//             : "#080808",
//         color: state.isFocused ? "#a3e635" : "rgba(255,255,255,0.7)",
//         cursor: "pointer",
//         padding: "12px 16px",
//         transition: "all 0.2s ease",
//     }),

//     placeholder: (base) => ({
//         ...base,
//         color: "rgba(255,255,255,0.35)",
//         fontSize: "16px",
//     }),

//     singleValue: (base) => ({
//         ...base,
//         color: "#ffffff",
//         fontWeight: 500,
//     }),

//     input: (base) => ({
//         ...base,
//         color: "#ffffff",
//     }),

//     dropdownIndicator: (base, state) => ({
//         ...base,
//         color: state.isFocused ? "#a3e635" : "rgba(255,255,255,0.3)",
//         transition: "all 0.2s ease",
//     }),

//     indicatorSeparator: () => ({
//         display: "none",
//     }),
// };

// /* =========================
//    Animated Grid with Mouse Tracking Spotlight
// ========================= */
// function AnimatedGrid({ mouseX, mouseY }) {
//     return (
//         <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
//             {/* Grid pattern */}
//             <div
//                 className="absolute inset-0 opacity-[0.035] transition-all duration-300"
//                 style={{
//                     backgroundImage:
//                         "linear-gradient(to right, #a3e635 1px, transparent 1px), linear-gradient(to bottom, #a3e635 1px, transparent 1px)",
//                     backgroundSize: "64px 64px",
//                 }}
//             />

//             {/* Spotlight Radial Glow following the mouse */}
//             <div
//                 className="absolute inset-0 transition-opacity duration-300 opacity-100"
//                 style={{
//                     background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(163, 230, 53, 0.075), transparent 80%)`,
//                 }}
//             />

//             {/* Radial glows */}
//             <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-500/[0.04] blur-[100px]" />
//             <div className="absolute -left-32 top-1/2 h-[350px] w-[350px] rounded-full bg-cyan-500/[0.03] blur-[80px]" />
//             <div className="absolute -right-32 bottom-0 h-[350px] w-[350px] rounded-full bg-lime-400/[0.03] blur-[80px]" />

//             {/* Animated scan lines */}
//             <motion.div
//                 animate={{ x: ["-100%", "200%"] }}
//                 transition={{ duration: 12, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
//                 className="absolute top-[30%] h-px w-1/3 bg-gradient-to-r from-transparent via-lime-400/20 to-transparent"
//             />
//             <motion.div
//                 animate={{ x: ["200%", "-100%"] }}
//                 transition={{ duration: 15, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
//                 className="absolute top-[65%] h-px w-1/4 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent"
//             />
//         </div>
//     );
// }

// /* =========================
//    Tilt Card Component for 3D Parallax Hover
// ========================= */
// function TiltCard({ children, className }) {
//     const [rotateX, setRotateX] = useState(0);
//     const [rotateY, setRotateY] = useState(0);

//     const handleMouseMove = (e) => {
//         const el = e.currentTarget;
//         const rect = el.getBoundingClientRect();
//         const width = rect.width;
//         const height = rect.height;
//         const mouseX = e.clientX - rect.left - width / 2;
//         const mouseY = e.clientY - rect.top - height / 2;

//         // Max rotation 10 degrees
//         const rX = -(mouseY / (height / 2)) * 10;
//         const rY = (mouseX / (width / 2)) * 10;

//         setRotateX(rX);
//         setRotateY(rY);
//     };

//     const handleMouseLeave = () => {
//         setRotateX(0);
//         setRotateY(0);
//     };

//     return (
//         <motion.div
//             onMouseMove={handleMouseMove}
//             onMouseLeave={handleMouseLeave}
//             animate={{ rotateX, rotateY }}
//             transition={{ type: "spring", stiffness: 350, damping: 25 }}
//             style={{ transformStyle: "preserve-3d", perspective: 1000 }}
//             className={className}
//         >
//             {children}
//         </motion.div>
//     );
// }

// function HeroSection() {
//     const router = useRouter();
//     const [selectedTrade, setSelectedTrade] = useState("");
//     const [selectedLevel, setSelectedLevel] = useState("");
//     const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
//     const [hoveredNode, setHoveredNode] = useState(null);
//     const containerRef = useRef(null);

//     const handleMouseMove = (e) => {
//         if (!containerRef.current) return;
//         const rect = containerRef.current.getBoundingClientRect();
//         setMouseCoords({
//             x: e.clientX - rect.left,
//             y: e.clientY - rect.top,
//         });
//     };

//     const handleSearch = () => {
//         if (selectedTrade) {
//             let url = `/courses?trade=${selectedTrade}`;
//             if (selectedLevel) {
//                 url += `&level=${selectedLevel}`;
//             }
//             router.push(url);
//         } else {
//             router.push("/courses");
//         }
//     };

//     const availableLevels =
//         coursesData.find((t) => t.slug === selectedTrade)?.levels || [];

//     const features = [
//         { icon: ShieldCheck, text: "UK Accredited" },
//         { icon: Headphones, text: "Expert Support" },
//         { icon: Award, text: "High Pass Rate" },
//         { icon: BookOpen, text: "Flexible Learning" },
//     ];

//     const tradeOptions = coursesData.map((trade) => ({
//         value: trade.slug,
//         label: trade.trade,
//     }));

//     const levelOptions = availableLevels.map((lvl) => ({
//         value: lvl.level,
//         label: `Level ${lvl.level}`,
//     }));

//     // Trade Nodes on the Left and Right margins of the Hero
//     const tradeNodes = [
//         { id: "node-carpentry", title: "Carpentry", icon: Hammer, style: { left: "4%", top: "18%" }, pathId: 0, d: "M 120 114 C 300 114, 450 380, 600 380" },
//         { id: "node-brickwork", title: "Bricklaying", icon: Cuboid, style: { left: "1.5%", top: "48%" }, pathId: 1, d: "M 60 294 C 250 294, 450 380, 600 380" },
//         { id: "node-painting", title: "Painting", icon: PaintRoller, style: { left: "4%", top: "78%" }, pathId: 2, d: "M 120 474 C 300 474, 450 380, 600 380" },
//         { id: "node-electrical", title: "Electrical", icon: Zap, style: { right: "4%", top: "18%" }, pathId: 3, d: "M 1080 114 C 900 114, 750 380, 600 380" },
//         { id: "node-roofing", title: "Roofing", icon: Home, style: { right: "1.5%", top: "48%" }, pathId: 4, d: "M 1140 294 C 950 294, 750 380, 600 380" },
//         { id: "node-plastering", title: "Plastering", icon: Shovel, style: { right: "4%", top: "78%" }, pathId: 5, d: "M 1080 474 C 900 474, 750 380, 600 380" },
//     ];

//     return (
//         <section
//             ref={containerRef}
//             onMouseMove={handleMouseMove}
//             className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#020202] px-4 sm:px-6 lg:px-8 py-28"
//         >
//             <AnimatedGrid mouseX={mouseCoords.x} mouseY={mouseCoords.y} />

//             {/* INTERACTIVE SVG TRADE CONNECTING NETWORK */}
//             <svg
//                 className="pointer-events-none absolute inset-0 z-0 h-full w-full hidden lg:block select-none"
//                 viewBox="0 0 1200 600"
//                 fill="none"
//                 preserveAspectRatio="none"
//             >
//                 {tradeNodes.map((node) => {
//                     const isNodeActive = hoveredNode === node.id || selectedTrade === node.id.replace("node-", "");
//                     return (
//                         <g key={node.id}>
//                             {/* Static faint path line */}
//                             <path
//                                 d={node.d}
//                                 stroke={isNodeActive ? "rgba(163, 230, 53, 0.35)" : "rgba(163, 230, 53, 0.08)"}
//                                 strokeWidth={isNodeActive ? "2.5" : "1.5"}
//                                 strokeLinecap="round"
//                                 className="transition-all duration-300"
//                             />

//                             {/* Moving energy sparks */}
//                             <motion.circle
//                                 r={isNodeActive ? "4" : "2.8"}
//                                 fill="rgb(163 230 53)"
//                                 initial={{ opacity: 0 }}
//                                 animate={{
//                                     opacity: [0, 1, 1, 0],
//                                     offsetDistance: ["0%", "100%"],
//                                 }}
//                                 transition={{
//                                     duration: isNodeActive ? 3.5 : 6,
//                                     delay: node.pathId * 0.45,
//                                     repeat: Infinity,
//                                     ease: "easeInOut",
//                                 }}
//                                 style={{
//                                     offsetPath: `path("${node.d}")`,
//                                     filter: "drop-shadow(0 0 8px rgb(163 230 53))",
//                                 }}
//                             />
//                         </g>
//                     );
//                 })}
//             </svg>

//             {/* FLOATING TRADE NODE BADGES (DESKTOP) */}
//             <div className="absolute inset-0 z-20 pointer-events-none hidden lg:block select-none max-w-7xl mx-auto">
//                 {tradeNodes.map((node) => {
//                     const isSelected = selectedTrade === node.id.replace("node-", "");
//                     return (
//                         <motion.div
//                             key={node.id}
//                             style={node.style}
//                             onMouseEnter={() => setHoveredNode(node.id)}
//                             onMouseLeave={() => setHoveredNode(null)}
//                             onClick={() => {
//                                 const slug = node.id.replace("node-", "");
//                                 setSelectedTrade(slug);
//                                 setSelectedLevel("");
//                             }}
//                             whileHover={{ scale: 1.08 }}
//                             className={`absolute pointer-events-auto flex flex-col items-center gap-2 cursor-pointer group`}
//                         >
//                             <div
//                                 className={`flex h-13 w-13 items-center justify-center rounded-2xl border transition-all duration-300 shadow-lg backdrop-blur-md
//                   ${isSelected
//                                         ? "border-lime-400/80 bg-lime-400/10 shadow-[0_0_25px_rgba(163,230,53,0.4)]"
//                                         : "border-white/10 bg-white/[0.03] group-hover:border-lime-400/40 group-hover:bg-lime-400/5 group-hover:shadow-[0_0_20px_rgba(163,230,53,0.25)]"
//                                     }`}
//                             >
//                                 <node.icon
//                                     className={`h-5.5 w-5.5 transition-colors duration-300
//                     ${isSelected ? "text-lime-400" : "text-white/70 group-hover:text-lime-400"}`}
//                                 />
//                             </div>
//                             <span
//                                 className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300
//                   ${isSelected ? "text-lime-400" : "text-white/40 group-hover:text-lime-400"}`}
//                             >
//                                 {node.title}
//                             </span>
//                         </motion.div>
//                     );
//                 })}
//             </div>

//             {/* HERO CONTENT CONTAINER */}
//             <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
//                 {/* Label Badge */}
//                 {/* <motion.div
//           initial={{ opacity: 0, y: -12 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="mb-6 flex w-fit items-center gap-2 rounded-full border border-lime-400/25 bg-lime-400/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.15)]"
//         >
//           <Zap className="h-3.5 w-3.5 animate-pulse" />
//           Construction Training Platform
//         </motion.div> */}

//                 {/* Kinetic Staggered Typography */}
//                 <div className="overflow-hidden">
//                     <motion.h1
//                         initial={{ opacity: 0, y: 40 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
//                         className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white"
//                     >
//                         Learn. Qualify.
//                         <br />
//                         <span className="bg-gradient-to-r from-lime-400 via-lime-400 to-lime-400 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(163,230,53,0.15)]">
//                             Build Your Future.
//                         </span>
//                     </motion.h1>
//                 </div>

//                 {/* Subtitle / Description */}
//                 <motion.p
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
//                     className="mt-6 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-white/60 font-medium leading-relaxed"
//                 >
//                     CITB courses, NVQs, and CSCS cards — everything you need to work on
//                     site, get qualified, and grow your construction career faster.
//                 </motion.p>

//                 {/* SEARCH CONSOLE (GLASS COCKPIT PANEL) */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30, scale: 0.98 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
//                     className="relative mt-10 w-full max-w-3xl mx-auto bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 z-30 transition-all duration-300 hover:border-lime-400/25 hover:shadow-[0_25px_60px_rgba(163,230,53,0.06)]"
//                 >
//                     {/* TRADE SELECT */}
//                     <div className="w-full sm:w-[45%] px-1">
//                         <Select
//                             options={tradeOptions}
//                             value={tradeOptions.find((t) => t.value === selectedTrade)}
//                             onChange={(option) => {
//                                 setSelectedTrade(option?.value || "");
//                                 setSelectedLevel("");
//                             }}
//                             placeholder="Select Trade"
//                             isSearchable
//                             styles={customStyles}
//                             menuPortalTarget={typeof window !== "undefined" ? document.body : null}
//                             menuPosition="fixed"
//                             className="text-white text-base"
//                         />
//                     </div>

//                     {/* DIVIDER */}
//                     <div className="hidden sm:block h-9 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />

//                     {/* LEVEL SELECT */}
//                     <div className="w-full sm:w-[35%] px-1">
//                         <Select
//                             options={levelOptions}
//                             value={levelOptions.find((l) => l.value === selectedLevel)}
//                             onChange={(option) => setSelectedLevel(option?.value || "")}
//                             placeholder="Select Level"
//                             isDisabled={!selectedTrade}
//                             styles={customStyles}
//                             isSearchable
//                             menuPortalTarget={typeof window !== "undefined" ? document.body : null}
//                             menuPosition="fixed"
//                             className="text-white text-base"
//                         />
//                     </div>

//                     {/* SEARCH BUTTON */}
//                     <motion.button
//                         onClick={handleSearch}
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         className="w-full cursor-pointer sm:w-auto flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-300 text-black font-extrabold px-7 py-4 rounded-xl shadow-[0_0_30px_rgba(163,230,53,0.3)] hover:shadow-[0_0_40px_rgba(163,230,53,0.45)] transition-all duration-300 whitespace-nowrap group"
//                     >
//                         <Search className="w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
//                         <span>Find Courses</span>
//                     </motion.button>
//                 </motion.div>

//                 {/* FEATURES ROW WITH 3D TILT CARDS */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
//                     className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full relative"
//                 >
//                     {features.map((feature, idx) => (
//                         <TiltCard
//                             key={idx}
//                             className="flex flex-col items-center justify-center gap-2 bg-white/[0.02] hover:bg-lime-400/[0.04] backdrop-blur-md px-4 py-4 rounded-xl border border-white/5 hover:border-lime-400/20 shadow-sm cursor-default transition-all duration-300"
//                         >
//                             <div className="bg-lime-400/10 p-2 rounded-full">
//                                 <feature.icon className="w-4.5 h-4.5 text-lime-400" />
//                             </div>
//                             <span className="text-sm font-bold text-white/80 select-none">
//                                 {feature.text}
//                             </span>
//                         </TiltCard>
//                     ))}
//                 </motion.div>

//                 {/* Scroll Indicator mouse */}
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 1.1, duration: 0.6 }}
//                     className="mt-14 flex flex-col items-center gap-2 select-none pointer-events-none"
//                 >
//                     <motion.div
//                         animate={{ y: [0, 6, 0] }}
//                         transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
//                         className="w-5 h-8.5 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
//                     >
//                         <motion.div
//                             animate={{ opacity: [1, 0.3, 1], y: [0, 6, 0] }}
//                             transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
//                             className="w-1 h-2 rounded-full bg-lime-400"
//                         />
//                     </motion.div>
//                 </motion.div>
//             </div>
//         </section>
//     );
// }

// export default HeroSection;