import { useForm, SubmitHandler } from "react-hook-form";
import TextInput from "../components/TextInput";
import EmailInput from "../components/EmailInput";
import TextArea from "../components/TextArea";
import Menu from "../components/Menu";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate(); // Initialize useNavigate

  // The form submission handler
  const onSubmit: SubmitHandler<FormData> = (data, event) => {
    // Prevent the default form submission (this prevents page reload)
    event?.preventDefault();
    console.log(data);

    // This is the trick:
    // Netlify will automatically handle the form submission
    // because of `data-netlify="true"`

    // If you want to programmatically handle the redirect to the /submitted page,
    // you can add a hidden field in the form for `redirect` to send the user there.
    navigate("/submitted"); // Navigate to '/submitted' after form submission
  };

  return (
    <div className="mb-10 flex min-h-screen w-full flex-col pb-10 lg:flex-row">
      <Menu />

      <div className="mx-auto mt-10 flex w-full min-w-[300px] max-w-[700px] flex-col px-8 sm:px-16">
        <h2 className="mb-4 text-left text-xl font-normal text-gray-500">
          Contact Us
        </h2>
        <h1 className="text-gray-500">
          For all pricing and booking inquiries, please fill out the form below.
          Please include as much relevant information as possible, for example,
          the location of the project, amount of images needed, intended usage
          of the images, and timeframe for project completion. I look forward to
          hearing from you.
        </h1>

        {/* Netlify form with manual submit handling */}
        <form
          name="contact" // Netlify form name
          onSubmit={handleSubmit(onSubmit)} // Use react-hook-form's onSubmit
          method="POST"
          data-netlify="true" // This tells Netlify to handle the form submission
          data-netlify-honeypot="bot-field" // Honeypot for bot prevention
          className="w-full space-y-6"
        >
          <input type="hidden" name="form-name" value="contact" />

          {/* Hidden redirect field to send users to /submitted after submission */}
          <input type="hidden" name="redirect" value="/submitted" />

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
