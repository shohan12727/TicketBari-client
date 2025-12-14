import React from "react";

const faqs = [
  {
    id: 1,
    question: "How can I book a ticket on TicketBari?",
    answer:
      "Simply search for your route, select a ticket, choose your desired quantity, and click the Book Now button. Your booking will be saved with a pending status until the vendor approves it.",
  },
  {
    id: 2,
    question: "What payment methods are supported?",
    answer:
      "We support secure online payments through Stripe, including debit and credit cards. All transactions are encrypted and safe.",
  },
  {
    id: 3,
    question: "Can I cancel my booking?",
    answer:
      "You can cancel your booking only before the vendor accepts your request. Once accepted, cancellation is no longer available.",
  },
  {
    id: 4,
    question: "What happens if a vendor rejects my booking?",
    answer:
      "If a vendor rejects your booking, the status will be marked as rejected and no payment will be required from your side.",
  },
  {
    id: 5,
    question: "Is my payment refundable?",
    answer:
      "Refund policies depend on the vendor. If a trip is canceled or an issue occurs, our support team will assist you based on the vendor's refund policy.",
  },
  {
    id: 6,
    question: "How do I become a vendor on TicketBari?",
    answer:
      "After registering, contact the admin or request a role change. Once approved, you will be able to add and manage tickets from your vendor dashboard.",
  },
];

const CommonQandA = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16 bg-base-100 text-base-content">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Common <span className="text-primary">Questions & Answers</span>
        </h2>
        <p className="text-base-content/70 max-w-2xl mx-auto">
          Click on a question to expand or collapse the answer.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="collapse collapse-arrow bg-base-200 rounded-xl"
          >
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              {faq.question}
            </div>
            <div className="collapse-content text-base-content/70">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommonQandA;
