import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import "./Services.css";

const features = [
  {
    title: "AI Summarizer",
    description:
      "Our AI-powered summarizer quickly condenses documents into concise, actionable briefs.",
  },
  {
    title: "Multi-language Support",
    description:
      "Supports summaries and translations in English, Hindi, Spanish, and more.",
  },
  {
    title: "Multiple File Formats",
    description:
      "Handles PDF, DOCX, TXT, and more for versatile document processing.",
  },
  {
    title: "Secure Login",
    description:
      "User authentication ensures personalized access to your dashboard.",
  },
  {
    title: "Modern & Responsive",
    description:
      "Mobile-responsive design ensures optimal experience on any device.",
  },
];

function useScrollAnimation(delayStep = 150) {
  const refs = useRef([]);
  const [visibleIndexes, setVisibleIndexes] = useState([]);

  useEffect(() => {
    const observers = [];

    refs.current.forEach((element, index) => {
      if (!element) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleIndexes((prev) =>
                  prev.includes(index) ? prev : [...prev, index]
                );
              }, delayStep * index);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [delayStep]);

  return { refs, visibleIndexes };
}

export default function Services() {
  const { refs, visibleIndexes } = useScrollAnimation(180);

  return (
    <>
      <Header />
      <main className="services-container">
        <section className="services__section">
          <h2 className="services__title">Our Services</h2>

          <div className="timeline">
            {features.map(({ title, description }, i) => {
              const alignLeft = i % 2 === 0;
              const isVisible = visibleIndexes.includes(i);
              return (
                <article
                  key={i}
                  className={`timeline__item ${
                    alignLeft ? "timeline__item--left" : "timeline__item--right"
                  } ${isVisible ? "timeline__item--visible" : ""}`}
                  ref={(el) => (refs.current[i] = el)}
                  tabIndex={isVisible ? 0 : -1}
                >
                  <div className="timeline__content">
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                  <span className="timeline__circle" aria-hidden="true"></span>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
