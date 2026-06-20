import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

const FAQS = [
  { number: "01", question: "Are you a care agency?", answer: <><strong>No.</strong> Daily Assist UK is <strong>not a care agency</strong>.<br />We provide <strong>non-medical home help and companionship</strong>, such as cleaning, errands, welfare check-ins, and practical daily support. We do not offer regulated personal care.</> },
  { number: "02", question: "Do you provide personal care or give medication?", answer: <><strong>No.</strong><br></br> We do not provide personal care services such as washing, dressing, toileting, administering medication, ог any clinical tasks. This allows us to remain focused оп <strong>practical home support апd lifestyle assistance.</strong></> },
  { number: "03", question: "Are your staff DBS checked?", answer: <><strong>Yes. <br /></strong> All Daily Assist UK staff are <strong>DBS checked</strong>, carefully selected, апd trained to work respectfully апd safely in people's homes.</> },
  { number: "04", question: "Are you insured?", answer: <><strong>Yes.</strong><br />  Daily Assist UK is <strong>fully insured</strong>, giving peace of mind to our clients апd their families.</> },
  { number: "05", question: "Do I need to commit long-term?", answer: <><strong>No.</strong><br /> There is <strong>no long-term commitment</strong> required. Services are flexible апd can be adjusted ог stopped at any time with reasonable notice.</> },
  { number: "06", question: "Can families receive updates about visits?", answer: <><strong>Yes (with consent).</strong><br /> We can provide <strong>updates and reassurance</strong> to family members, helping them stay informed апd confident that their loved one is supported. </>},
  { number: "07", question: "Do you provide transport to appointments?", answer: <><strong>Yes.</strong><br />  We offer <strong> accompanied transport </strong> to GP appointments, hospitals, hairdressers, social events, апd community activities, including support during the visit where appropriate.</> },
  { number: "08", question: "What if my needs change over time?", answer: <><strong>That’s completely fine.</strong><br />  We regularly <strong>review services</strong> and can adjust visit frequency, tasks, ог support levels as needs change.</> },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => setOpenIndex((prev) => (prev === index ? null : index));

  return (
    <section className="w-full bg-gradient-to-b from-[#e6edf3] via-[#e9eef2] to-[#f3e9d7] py-24 px-6">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#2d2d2d] mb-12">
          Frequently Asked Questions
        </h2>

        <div>
          {FAQS.map((faq, index) => (
            <div key={index} className="border-b border-[#dcdcdc]">

              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between py-6 text-left"
                aria-expanded={openIndex === index}
              >
                <div className="flex items-center gap-6">
                  <span className="text-2xl font-bold text-[#555] w-8 flex-shrink-0">
                    {faq.number}
                  </span>
                  <span className="text-base font-bold md:text-3xl font-medium text-[#333]">
                    {faq.question}
                  </span>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {openIndex === index ? (
                    <FiX size={22} className="text-[#f5c045]" />
                  ) : (
                    <FiPlus size={22} className="text-[#f5c045]" />
                  )}
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="text-[#555] text-lg leading-relaxed pb-6 pl-14">
                  {faq.answer}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
