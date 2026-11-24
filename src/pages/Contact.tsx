import { useState } from "react";
import { useForm } from "react-hook-form";
import PageContainer from "../components/PageContainer";
import Menu from "../components/Menu";
import ContentContainer from "../components/ContentContainer";
import ContactIcons from "../components/ContactIcons";
import TextInput from "../components/TextInput";
import EmailInput from "../components/EmailInput";
import TextArea from "../components/TextArea";
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
      setErrorMessage(
        "Network error — please check your connection and try again.",
      );
    }
  }

  return (
    <PageContainer>
      <Menu />
      <ContentContainer>
        {/* Single semantic page heading (tablet & desktop already highlight "Contact" in the nav) */}
        <h1 className="sr-only">{heading}</h1>

        {/* Mobile/Tablet/1024px: single column (centered on tablet).
            1280px+ (15" Mac & wide monitors): clean 2-column split — info left, form right */}
        <div className="mx-auto w-full max-w-[640px] lg:mx-0 lg2:grid lg2:max-w-[1040px] lg2:grid-cols-[minmax(260px,340px)_minmax(0,1fr)] lg2:items-start lg2:gap-14 xl:gap-16">
          {/* LEFT COLUMN (top on smaller screens): intro, email, quiet location details */}
          <div>
            {/* Subtle section eyebrow on mobile only (matches About mobile look) */}
            <div className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400 sm:hidden">
              <span className="h-1.5 w-1.5 rounded-full bg-gaga" />
              <span>{heading}</span>
            </div>

            {introText && (
              <p className="mb-6 whitespace-pre-line text-[16px] leading-[1.8] text-gray-500 sm:text-[17px]">
                {introText}
              </p>
            )}

            <div className="mb-8 space-y-3 border-t border-gray-100 pt-5 text-sm text-gray-500 lg2:mb-0">
              {publicEmail && (
                <div>
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-gray-400">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${publicEmail}`}
                    className="mt-0.5 inline-block text-base text-gray-700 underline decoration-gray-300 underline-offset-4 transition-colors hover:text-black hover:decoration-gaga"
                  >
                    {publicEmail}
                  </a>
                </div>
              )}

              <div>
                <span className="block text-[11px] uppercase tracking-[0.18em] text-gray-400">
                  Based in
                </span>
                <p className="mt-0.5 text-base text-gray-600">
                  Tbilisi, Georgia · Available worldwide
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (below on smaller screens): inquiry form */}
          <div>
            {/* Success confirmation */}
            {submitStatus === "success" && (
              <div
                role="status"
                aria-live="polite"
                className="mb-6 rounded border border-gaga bg-gaga1/30 px-4 py-3 text-sm text-gray-700"
              >
                Thank you! Your message has been sent — Gaga will get back to
                you soon.
              </div>
            )}

            {/* Error banner */}
            {submitStatus === "error" && errorMessage && (
              <div
                role="alert"
                aria-live="polite"
                className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
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

              {/* Single Name field + Email side-by-side on tablet/desktop */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <TextInput
                  id="name"
                  label="Name"
                  placeholder="Your name"
                  autoComplete="name"
                  register={register}
                  errorMessage={errors.name?.message}
                />

                <EmailInput
                  id="email"
                  label="Email"
                  placeholder="you@example.com"
                  register={register}
                  errorMessage={errors.email?.message}
                />
              </div>

              <TextInput
                id="subject"
                label="Subject"
                placeholder="Project inquiry, exhibition, collaboration..."
                register={register}
                errorMessage={errors.subject?.message}
              />

              <TextArea
                id="message"
                label="Message"
                placeholder="Tell Gaga a bit about your project..."
                rows={5}
                register={register}
                errorMessage={errors.message?.message}
              />

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={submitStatus === "sending"}
                  className="w-full rounded bg-gaga1 py-3.5 text-base font-demi text-gray-800 transition-colors hover:bg-gaga disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-12"
                >
                  {submitStatus === "sending" ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>

            {/* Show social links on mobile/tablet Contact page since the desktop sidebar isn't visible */}
            <ContactIcons
              align="left"
              className="mt-10 border-t border-gray-100 pt-6 lg:hidden"
            />
          </div>
        </div>
      </ContentContainer>
    </PageContainer>
  );
}
