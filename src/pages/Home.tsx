import Menu from "../components/Menu";
import MainImage from "../components/MainImage";
import TabletMenu from "../components/TabletMenu";
import MobileBGIMG from "../components/MobileBGIMG";

// import { motion } from "framer-motion";

// const fadeVariant = {
//   initial: { opacity: 0 },
//   animate: { opacity: 1 },
//   exit: { opacity: 0 },
// };
// const pageTransition = {
//   duration: 0.5,
//   ease: "easeInOut",
// };

export default function Home() {
  return (
    // <motion.div
    //   variants={fadeVariant}
    //   initial="initial"
    //   animate="animate"
    //   exit="exit"
    //   transition={pageTransition}
    //   className="relative min-h-screen w-full"
    // >
    <div className="relative min-h-screen w-full">
      <MobileBGIMG />
      <h1>test</h1>
      {/* Content on top of background */}
      <div className="z-10 flex min-h-screen w-full sm:flex-col lg:flex-row">
        <Menu isHome={true} />
        <MainImage />
        <TabletMenu />
      </div>
    </div>
    // </motion.div>
  );
}
