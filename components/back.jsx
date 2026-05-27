// "use client";
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { Search, MapPin, ChevronDown, ShieldCheck, Headphones, Award, BookOpen, Star } from 'lucide-react';
// import coursesData from '../data/courses.json';

// function HeroSection() {
//   const router = useRouter();
//   const [selectedTrade, setSelectedTrade] = useState('');
//   const [selectedLevel, setSelectedLevel] = useState('');

//   const handleSearch = () => {
//     if (selectedTrade) {
//       let url = `/courses?trade=${selectedTrade}`;
//       if (selectedLevel) {
//         url += `&level=${selectedLevel}`;
//       }
//       router.push(url);
//     } else {
//       router.push('/courses');
//     }
//   };

//   const availableLevels = coursesData.find(t => t.slug === selectedTrade)?.levels || [];
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
//   };

//   return (
//     <section className="relative w-full min-h-[600px] lg:min-h-[750px] flex items-center overflow-hidden pt-10 pb-12 lg:pt-20 lg:pb-0">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

//         {/* Left Content Side */}
//         <motion.div
//           className="lg:col-span-7 flex flex-col justify-center space-y-6 z-10"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >

//           {/* Main Heading */}
//           <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-[64px] font-extrabold tracking-tight text-secondary leading-[1.1]">
//             Learn. Qualify. <br />
//             <span className="text-primary">Build Your Future.</span>
//           </motion.h1>

//           {/* Description */}
//           <motion.p variants={itemVariants} className="text-muted text-base sm:text-lg max-w-xl font-medium leading-relaxed">
//             CITB courses, NVQs and CSCS cards — everything you need to work on site and grow your career.
//           </motion.p>

//           {/* Search Box Panel */}
//           <motion.div variants={itemVariants} className="w-full max-w-2xl bg-white p-2.5 rounded-full shadow-card flex flex-col sm:flex-row items-center gap-2 sm:gap-4 border border-gray-100">

//             {/* Trade Dropdown */}
//             <div className="w-full sm:w-[45%] flex items-center justify-between px-4 py-2 cursor-pointer group relative">
//               <select
//                 value={selectedTrade}
//                 onChange={(e) => {
//                   setSelectedTrade(e.target.value);
//                   setSelectedLevel(''); // Reset level when trade changes
//                 }}
//                 className="w-full appearance-none bg-transparent text-muted text-sm font-medium group-hover:text-foreground transition-colors focus:outline-none"
//               >
//                 <option value="">Select Trade</option>
//                 {coursesData.map((trade) => (
//                   <option key={trade.slug} value={trade.slug}>
//                     {trade.trade}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown className="w-4 h-4 text-muted group-hover:text-foreground flex-shrink-0 absolute right-4 pointer-events-none" />
//             </div>

//             {/* Divider */}
//             <div className="hidden sm:block h-8 w-[1px] bg-gray-200"></div>

//             {/* Level Dropdown */}
//             <div className="w-full sm:w-[35%] flex items-center justify-between px-4 py-2 cursor-pointer group relative">
//               <select
//                 value={selectedLevel}
//                 onChange={(e) => setSelectedLevel(e.target.value)}
//                 disabled={!selectedTrade}
//                 className="w-full appearance-none bg-transparent text-muted text-sm font-medium group-hover:text-foreground transition-colors focus:outline-none disabled:opacity-50"
//               >
//                 <option value="">Select Level</option>
//                 {availableLevels.map((lvl) => (
//                   <option key={lvl.id} value={lvl.level}>
//                     Level {lvl.level}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown className="w-4 h-4 text-muted group-hover:text-foreground flex-shrink-0 absolute right-4 pointer-events-none" />
//             </div>

//             {/* Search Button */}
//             <button
//               onClick={handleSearch}
//               className="w-full sm:w-auto bg-primary hover:bg-accent text-white font-semibold text-sm px-8 py-3.5 rounded-full shadow-md transition-all duration-300 ml-auto whitespace-nowrap"
//             >
//               Search
//             </button>
//           </motion.div>

//           {/* Bottom Features Row */}
//           <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4">
//             {[
//               { icon: ShieldCheck, text: "UK Accredited" },
//               { icon: Headphones, text: "Expert Support" },
//               { icon: Award, text: "High Pass Rate" },
//               { icon: BookOpen, text: "Flexible Learning" }
//             ].map((feature, idx) => (
//               <div key={idx} className="flex items-center gap-2">
//                 <div className="bg-normal p-1.5 rounded-full">
//                   <feature.icon className="w-4 h-4 text-primary" />
//                 </div>
//                 <span className="text-xs sm:text-sm font-semibold text-secondary">{feature.text}</span>
//               </div>
//             ))}
//           </motion.div>

//         </motion.div>

//         {/* Right Image Side */}
//         <motion.div
//           className="lg:col-span-5 relative w-full h-full min-h-[400px] flex items-center justify-center lg:justify-end mt-8 lg:mt-0"
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
//         >
//           {/* Main Worker Image */}
//           <div className="relative w-full h-full z-10">
//             {/* The background blob/shape behind the image */}
//             <div className="absolute inset-0 "></div>

//             <img
//               src="/banner.png"
//               alt="Construction Professional"
//               className="w-full h-full"
//               onError={(e) => {
//                 // Fallback if banner.png is missing
//                 e.target.style.display = 'none';
//                 e.target.parentElement.innerHTML += '<div class="w-full h-full bg-gray-200 rounded-tl-[100px] rounded-br-[100px] flex items-center justify-center text-muted font-medium">Image Placeholder</div>';
//               }}
//             />
//           </div>
//         </motion.div>

//       </div>

//       {/* Decorative background element */}
//       <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f4ebd0]/30 -z-20 rounded-bl-[200px]"></div>
//     </section>
//   );
// }

// export default HeroSection;


