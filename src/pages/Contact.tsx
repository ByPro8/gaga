import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../components/TextInput";
import EmailInput from "../components/EmailInput";
import TextArea from "../components/TextArea";
import Menu from "../components/Menu";
import BackToHome from "../components/BackToHome";
import { useSiteSettings } from "../context/SiteSettingsContext";

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  // Hidden spam-bot trap (real visitors never see or fill this)
  botcheck: string;
}

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export default function Contact() {
  const { settings } = useSiteSettings();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>();

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const heading = settings?.contactHeading || "Contact";
  const introText = settings?.contactIntroText;
  const publicEmail = settings?.contactEmail;

  async function onSubmit(formData: ContactFormValues) {
    // Ignore silent spam bots that filled the hidden honeypot
    if (formData.botcheck) return;

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setSubmitStatus("error");
      setErrorMessage(
        "Contact form key is not configured yet (add VITE_WEB3FORMS_ACCESS_KEY to .env.local).",
      );
      return;
    }

    setSubmitStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          from_name: "GAGALENS Portfolio",
          name: formData.name.trim(),
          email: formData.email.trim(),
          replyto: formData.email.trim(),
          subject: `[GAGALENS] ${formData.subject.trim()}`,
          message: formData.message.trim(),
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (response.ok && result.success) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
        setErrorMessage(
          result.message || "Could not send message. Please try again.",
        );
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage("Network error — please check your connection and try again.");
    }
  }

  return (
    <div className="mb-10 flex min-h-screen w-full flex-col pb-10 lg:flex-row">
      <Menu />
      <div className="flex w-full min-w-[300px] max-w-[700px] flex-col px-8 pt-[54px] sm:px-10 lg:pt-[58px]">
        <h1 className="mb-6 flex items-center text-[29px] font-normal text-gray-500">
          <span className="lg:hidden">
            <BackToHome />
          </span>
          {heading}
        </h1>

        {introText && (
          <p className="mb-5 whitespace-pre-line text-lg leading-relaxed text-gray-500">
            {introText}
          </p>
        )}

        {publicEmail && (
          <p className="mb-6 text-gray-500">
            Email:{" "}
            <a
              href={`mailto:${publicEmail}`}
              className="text-gray-700 underline underline-offset-4 transition-colors hover:text-black"
            >
              {publicEmail}
            </a>
          </p>
        )}

        {/* Success confirmation */}
        {submitStatus === "success" && (
          <div className="mb-6 rounded-md border border-gaga bg-gaga1/30 px-4 py-3 text-sm text-gray-700">
            Thank you! Your message has been sent — Gaga will get back to you soon.
          </div>
        )}

        {/* Error banner */}
        {submitStatus === "error" && errorMessage && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="w-full space-y-5"
        >
          {/* Invisible spam honeypot field */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
            {...register("botcheck")}
          />

          <TextInput
            id="name"
            label="Name"
            placeholder="Enter your name"
            register={register}
            errorMessage={errors.name?.message}
          />

          <EmailInput
            id="email"
            label="Email Address"
            placeholder="Enter your email"
            register={register}
            errorMessage={errors.email?.message}
          />

          <TextInput
            id="subject"
            label="Subject"
            placeholder="Enter subject"
            register={register}
            errorMessage={errors.subject?.message}
          />

          <TextArea
            id="message"
            label="Message"
            placeholder="Write your message"
            rows={5}
            register={register}
            errorMessage={errors.message?.message}
          />

          <div className="pt-2 text-center sm:text-left">
            <button
              type="submit"
              disabled={submitStatus === "sending"}
              className="rounded-md bg-gaga1 px-16 py-3.5 text-base font-demi text-gray-700 transition-colors hover:bg-gaga disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitStatus === "sending" ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
