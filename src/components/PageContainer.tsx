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

export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fadeVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="flex h-screen w-full min-w-0 flex-col text-gray-500 sm:flex-col lg:flex-[1_1_0%] lg:flex-row"
    >
      {children}
    </motion.div>
  );
}
