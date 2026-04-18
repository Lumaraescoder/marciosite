"use client";
import React, { useState } from "react";
import { useTranslation } from "../../hooks/useLang";
import { LanguageProvider } from "../../hooks/useLang";

// Componente principal
function FaqContent() {
  const { t } = useTranslation();
  const [currentActiveFaq, setCurrentActiveFaq] = useState(0);

  // Dados traduzidos
  const translatedFaqData = [
    {
      question: t("faq_question_1"),
      answer: t("faq_answer_1"),
    },
    {
      question: t("faq_question_2"),
      answer: t("faq_answer_2"),
    },
    {
      question: t("faq_question_3"),
      answer: t("faq_answer_3"),
    },
    {
      question: t("faq_question_4"),
      answer: t("faq_answer_4"),
    },
    {
      question: t("faq_question_5"),
      answer: t("faq_answer_5"),
    },
    {
      question: t("faq_question_6"),
      answer: t("faq_answer_6"),
    },
  ];

  return (
    <>
      {translatedFaqData.map((elm, i) => (
        <div key={i} className="col-12">
          <div
            className={`accordion__item px-20 py-15 border-1 rounded-12 ${
              currentActiveFaq == i ? "is-active" : ""
            } `}
          >
            <div
              className="accordion__button d-flex items-center justify-between"
              onClick={() => setCurrentActiveFaq((pre) => (pre == i ? -1 : i))}
            >
              <div className="button text-16 text-dark-1">{elm.question}</div>

              <div className="accordion__icon size-30 flex-center bg-light-2 rounded-full">
                <i className="icon-plus"></i>
                <i className="icon-minus"></i>
              </div>
            </div>

            <div
              className="accordion__content"
              style={currentActiveFaq == i ? { maxHeight: "150px" } : {}}
            >
              <div className="pt-20">
                <p>{elm.answer}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

// Componente com Provider
export default function Faq() {
  return (
    <LanguageProvider>
      <FaqContent />
    </LanguageProvider>
  );
}
