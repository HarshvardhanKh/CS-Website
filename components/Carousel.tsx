import { useState } from "react";

const faqs = [
  {
    question: "How does SaaS differ from traditional software?",
    answer: "SaaS is subscription-based and centrally hosted. Users pay a recurring fee to access the software over the internet, eliminating the need for upfront costs and ongoing maintenance.",
  },
  {
    question: "How customizable is SaaS software?",
    answer: "Most SaaS platforms offer a range of customization options including branding, workflows, and integrations via APIs — without requiring deep technical expertise.",
  },
  {
    question: "What happens to my data if I cancel my subscription?",
    answer: "Typically, you'll have a grace period to export your data. After that, it may be permanently deleted per the vendor's data retention policy.",
  },
  {
    question: "What are the benefits of using SaaS?",
    answer: "SaaS offers lower upfront costs, automatic updates, scalability, and accessibility from any device with an internet connection.",
  },
  {
    question: "How does pricing work for SaaS products?",
    answer: "SaaS pricing is usually tiered — based on users, features, or usage volume. Most vendors offer monthly or annual billing with discounts for longer commitments.",
  },
  {
    question: "Is my data secure with SaaS providers?",
    answer: "Reputable SaaS vendors implement enterprise-grade security including encryption, SOC 2 compliance, and regular third-party audits to keep your data protected.",
  },
  {
    question: "Can I integrate SaaS tools with my existing stack?",
    answer: "Yes — most modern SaaS platforms offer REST APIs, webhooks, and native integrations with popular tools like Slack, Zapier, Salesforce, and more.",
  },
];

function AccordionItem({
  faq,
  isOpen,
  onClick,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        borderRadius: 18,
        background: isOpen ? "#ffffff" : "#f5f5f3",
        border: isOpen ? "1px solid #e8e8e6" : "1px solid transparent",
        boxShadow: isOpen
          ? "0 4px 32px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)"
          : "none",
        transition: "box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 28px",
      }}>
        <span style={{
          fontSize: 15,
          fontWeight: isOpen ? 600 : 500,
          color: isOpen ? "#0f0f0f" : "#6b6b6b",
          lineHeight: 1.4,
          transition: "color 0.2s ease",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {faq.question}
        </span>

        <div style={{
          marginLeft: 20,
          flexShrink: 0,
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: isOpen ? "#0f0f0f" : "#e4e4e1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), background 0.2s ease",
          willChange: "transform",
        }}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke={isOpen ? "#fff" : "#888"} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Answer — GPU-only transform, zero reflow */}
      <div style={{
        display: "grid",
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        transition: "grid-template-rows 0.28s cubic-bezier(0.4,0,0.2,1)",
        willChange: "grid-template-rows",
      }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(-6px)",
            transition: "opacity 0.22s ease, transform 0.22s ease",
            willChange: "opacity, transform",
          }}>
            <p style={{
              margin: 0,
              padding: "0 28px 20px",
              fontSize: 14,
              color: "#71717a",
              lineHeight: 1.75,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <section style={{
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "96px 80px",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{ width: "100%", maxWidth: 1100, display: "flex", gap: 96, alignItems: "flex-start" }}>

          {/* Left */}
          <div style={{ flexShrink: 0, width: 220, position: "sticky", top: 112 }}>
            <span style={{
              display: "block", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.2em", color: "#a1a1aa",
              textTransform: "uppercase", marginBottom: 20,
            }}>
              Support
            </span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 84, fontWeight: 900,
              lineHeight: 0.9, letterSpacing: "-0.03em",
              color: "#ffffff", margin: 0,
            }}>
              FAQs
            </h2>
            <div style={{ marginTop: 32, width: 32, height: 3, borderRadius: 999, background: "#ffffff" }} />
            <p style={{ marginTop: 20, fontSize: 14, color: "#a1a1aa", lineHeight: 1.65 }}>
              Everything you need to know about our platform.
            </p>
          </div>

          {/* Right */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
            <p style={{ marginTop: 16, fontSize: 13, color: "#a1a1aa", paddingLeft: 4 }}>
              Still have questions?{" "}
              <a href="#" style={{ color: "#27272a", textDecoration: "underline", textUnderlineOffset: 3 }}>
                Talk to our team →
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}