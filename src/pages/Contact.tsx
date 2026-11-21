import { useForm } from "react-hook-form";
import TextInput from "../components/TextInput";
import EmailInput from "../components/EmailInput";
import TextArea from "../components/TextArea";
import Menu from "../components/Menu";
import BackToHome from "../components/BackToHome";
import { useSiteSettings } from "../context/SiteSettingsContext";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { register } = useForm<FormData>();
  const { settings } = useSiteSettings();

  const heading = settings?.contactHeading || "Contact";
  const introText = settings?.contactIntroText;
  const publicEmail = settings?.contactEmail;

  return (
    <div className="mb-10 flex min-h-screen w-full flex-col pb-10 lg:flex-row">
      <Menu />
      <div className="flex w-full min-w-[300px] max-w-[700px] flex-col px-8 pt-[60px] sm:px-10">
        <h2 className="mb-4 flex items-center gap-2 text-left text-xl font-normal text-gray-500">
          <BackToHome /> {heading}
        </h2>

        {introText && (
          <p className="mb-4 whitespace-pre-line text-gray-500">{introText}</p>
        )}

        {publicEmail && (
          <p className="mb-6 text-gray-500">
            Email:{" "}
            <a
              href={`mailto:${publicEmail}`}
              className="underline transition-colors hover:text-black"
            >
              {publicEmail}
            </a>
          </p>
        )}

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
              className="rounded-md bg-gaga1 px-24 py-4 text-gray-500 transition hover:bg-gaga lg:px-24"
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
