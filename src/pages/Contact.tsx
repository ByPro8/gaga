// import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../components/TextInput";
import EmailInput from "../components/EmailInput";
import TextArea from "../components/TextArea";
import Menu from "../components/Menu";
import BackToHome from "../components/BackToHome";
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

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { register } = useForm<FormData>();
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
      <div className="flex w-full min-w-[300px] max-w-[700px] flex-col px-8 pt-[60px] sm:px-10">
        <h2 className="mb-4 flex items-center gap-2 text-left text-xl font-normal text-gray-500">
          <BackToHome /> Contact Us
        </h2>
        <h1 className="text-gray-500">
          For all pricing and booking inquiries , please fill out the form
          below. Please include as much relevant information as possible, for
          example, the location of the project, amount of images needed,
          intended usage of the images, and timeframe for project completion. I
          look forward to hearing from you.
        </h1>
        <form
          name="contact"
          method="POST"
          action="/contact"
          className="w-full space-y-6"
        >
          <input type="hidden" name="form-name" value="contact" />

          <div className="flex flex-col lg:flex-row lg:space-x-4">
            <TextInput
              id="firstName"
              label="First Name"
              type="text"
              placeholder="Enter your first name"
              register={register}
              className="w-full lg:w-1/2"
            />
            <TextInput
              id="lastName"
              label="Last Name"
              type="text"
              placeholder="Enter your last name"
              register={register}
              className="w-full lg:w-1/2"
            />
          </div>

          <EmailInput
            id="email"
            label="Email Address"
            placeholder="Enter your email"
            register={register}
          />
          <TextInput
            id="subject"
            label="Subject"
            type="text"
            placeholder="Enter subject"
            register={register}
          />
          <TextArea
            id="message"
            label="Message"
            placeholder="Write your message"
            rows={4}
            register={register}
          />

          <div className="text-center">
            <button
              type="submit"
              className="rounded rounded-md bg-gaga1 px-24 py-4 text-gray-500 transition hover:bg-blue-700 hover:bg-gaga lg:px-24"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;
