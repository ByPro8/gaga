import AboutTextImg from "../components/AboutTextImage";
import Menu from "../components/Menu";
import { motion } from "framer-motion";
const fadeVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
const pageTransition = {
  duration: 0.5,
  ease: "easeInOut",
};

export default function About() {
  return (
    <motion.div
      variants={fadeVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="mb-10 flex min-h-screen w-full flex-col pb-10 lg:flex-row"
    >
      <Menu />
      <div className="mt-[60px] flex-1 lg:mx-10">
        <AboutTextImg className="mb-10 lg:max-w-[1300px]" />
      </div>
    </motion.div>
  );
}
