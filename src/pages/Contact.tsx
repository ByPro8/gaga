import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../components/TextInput";
import EmailInput from "../components/EmailInput";
import TextArea from "../components/TextArea";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = () => {
    // Trigger a popup message after form submission
    setPopupMessage("Form submitted successfully! 🎉");
    triggerPopup();

    // Optional: Reset the form after submission
    reset();
  };

  const triggerPopup = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div className="relative mx-auto max-w-xl bg-white p-4">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-500">
        Contact Us
      </h2>

      {/* Popup message */}
      {popupMessage && (
        <div
          className={`absolute left-1/2 top-4 w-80 -translate-x-1/2 transform rounded bg-green-500 p-3 text-center text-white transition-opacity duration-500 ${
            showPopup ? "opacity-100" : "opacity-0"
          }`}
        >
          {popupMessage}
        </div>
      )}

      {/* Contact form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        name="contact" // Required for Netlify form handling
        method="POST"
        data-netlify="true" // This is needed for Netlify form submission
        className="space-y-6"
      >
        {/* Hidden field for Netlify form handling */}
        <input type="hidden" name="form-name" value="contact" />

        <TextInput
          id="firstName"
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          register={register}
        />
        <TextInput
          id="lastName"
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          register={register}
        />
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
            className="rounded bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
