import Menu from "../components/Menu";
import MainImage from "../components/MainImage";
import TabletMenu from "../components/TabletMenu";
import { motion } from "framer-motion";

const fadeVariant = {
  initial: { opacity: 4 },
  animate: { opacity: 4 },
  exit: { opacity: 4 },
};

export default function Home() {
  return (
    <motion.div
      variants={fadeVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="flex min-h-screen w-full flex-col lg:flex-row"
    >
      {/* ...rest of your Projects content (unchanged) */}
      <div className="flex min-h-screen w-full sm:flex-col lg:flex-row">
        <Menu isHome={true} />
        <MainImage />

        <TabletMenu />
      </div>
    </motion.div>

    // <div className="relative min-h-screen w-full">
    //   {/* Background image */}
    //   <img
    //     src="/home.webp"
    //     alt="Background"
    //     className="fixed inset-0 -z-10 h-full w-full object-cover"
    //   />

    //   {/* Content on top of background */}
    //   <div className="z-10 flex min-h-screen w-full sm:flex-col lg:flex-row">
    //     <Menu isHome={true} />
    //     <TabletMenu />
    //     {/* other components */}
    //   </div>
    // </div>
  );
}
