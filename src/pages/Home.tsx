import { motion } from "framer-motion";
import Menu from "../components/Menu";
import TabletMenu from "../components/TabletMenu";

// Define the animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const pageTransition = {
  duration: 0.5,
  ease: "easeInOut",
};

export default function Projects() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className=""
    >
      <div className="relative min-h-screen w-full">
        {" "}
        <img
          src="/home.webp"
          alt="Background"
          className="fixed inset-0 -z-10 h-full w-full object-cover"
        />
        {/* Content on top of background */}
        <div className="z-10 flex min-h-screen w-full sm:flex-col lg:flex-row">
          <Menu isHome={true} />
          <TabletMenu />
          {/* other components */}
        </div>
      </div>
    </motion.div>
  );
}

//
