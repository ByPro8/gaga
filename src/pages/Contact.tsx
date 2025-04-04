// import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../components/TextInput";
import EmailInput from "../components/EmailInput";
import TextArea from "../components/TextArea";
import Menu from "../components/Menu";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  // const [popupMessage, setPopupMessage] = useState<string | null>(null);
  // const [showPopup, setShowPopup] = useState(false);

  ////////////////////////////////////////////////////////////////////// const { register, handleSubmit } = useForm<FormData>();
  const { register } = useForm<FormData>();

  // const onSubmit = () => {
  //   // Trigger a popup message after form submission
  //   setPopupMessage("Form submitted successfully! 🎉");
  //   triggerPopup();

  //   // Optional: Reset the form after submission
  //   reset();
  // };

  // const triggerPopup = () => {
  //   setShowPopup(true);
  //   setTimeout(() => {
  //     setShowPopup(false);
  //   }, 2000);
  // };

  return (
    <div className="mb-10 flex min-h-screen w-full flex-col pb-10 lg:flex-row">
      <Menu />
      {/* {popupMessage && (
        <div
          className={`absolute left-1/2 top-4 w-80 -translate-x-1/2 transform rounded bg-green-500 p-3 text-center text-white transition-opacity duration-500 ${
            showPopup ? "opacity-100" : "opacity-0"
          }`}
        >
          {popupMessage}
        </div>
      )} */}

      {/* Contact form */}

      <div className="mx-auto mt-10 flex w-full min-w-[300px] max-w-[700px] flex-col px-8 sm:px-16">
        {/* Contact Us heading aligned to the left */}
        <h2 className="mb-4 text-left text-xl font-normal text-gray-500">
          Contact Us
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
              className="rounded bg-gaga1 px-6 py-3 text-gray-500 transition hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
