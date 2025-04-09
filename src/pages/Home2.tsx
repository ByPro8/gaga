import Menu from "../components/Menu";
import MainImage from "../components/MainImage";
import TabletMenu from "../components/TabletMenu";
import { motion } from "framer-motion";
import Menu2 from "../components/Menu2";

const fadeVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
const pageTransition = {
  duration: 0.5,
  ease: "easeInOut",
};

export default function Home2() {
  return (
    <motion.div
      variants={fadeVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="relative min-h-screen w-full"
    >
      <img
        src="/home.webp"
        alt="Background"
        className="fixed inset-0 -z-10 h-full w-full object-cover"
      />

      {/* Content on top of background */}
      <div className="z-10 flex min-h-screen w-full sm:flex-col lg:flex-row">
        <Menu2 isHome={true} />
        {/* <MainImage /> */}
        <TabletMenu />
      </div>
    </motion.div>
  );
}
