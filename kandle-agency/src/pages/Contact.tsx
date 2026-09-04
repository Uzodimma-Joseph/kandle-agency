import PageHeader from "../components/PageHeader";
import Eyebrow from "../components/Eyebrow";
import ContactForm from "../sections/ContactForm";
import { contactInfo } from "../data/mockData";

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's build the next stage of your business."
        subtitle="Whether you need branding, marketing, a website, or a full growth system — tell us where you are and where you're headed."
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="container-k grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-4">
            <Eyebrow>Reach us directly</Eyebrow>
            <div className="space-y-8 mt-2">
              <div>
                <div className="text-sm text-stone mb-1.5">Email</div>
                {contactInfo.emails.map((email) => (
                  <a key={email} href={`mailto:${email}`} className="block text-lg text-ink hover:text-kandle-green-deep transition-colors break-all">
                    {email}
                  </a>
                ))}
              </div>
              <div>
                <div className="text-sm text-stone mb-1.5">Phone</div>
                <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="block text-lg text-ink hover:text-kandle-green-deep transition-colors">
                  {contactInfo.phone}
                </a>
              </div>
              <div>
                <div className="text-sm text-stone mb-1.5">WhatsApp</div>
                {contactInfo.whatsapp.map((num) => (
                  <div key={num} className="text-lg text-ink">{num}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
