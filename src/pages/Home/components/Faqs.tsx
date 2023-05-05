import React, { useState } from "react";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";

import { ReactComponent as ArrowIcon } from "../../../assets/icons/down_arrow.svg";
import useGetFaqs from "../../../hooks/useGetFaqs";
import { IFaqs } from "../../../constants/types";

interface IFaqsCardProps extends IFaqs {
  index: number;
}

const FaqCard: React.FC<IFaqsCardProps> = ({ index, question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div layout="position" className="faqs_cards_section-card">
      <motion.div
        className="faqs_cards_section-card_header"
        onClick={() => setIsOpen((o) => !o)}
      >
        <h3>
          {index}. {question}
        </h3>
        <div className={isOpen ? "active" : undefined}>
          <ArrowIcon />
        </div>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div className="faqs_cards_section-card_description">
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Faqs: React.FC = () => {
  const { data, isLoading, error } = useGetFaqs();

  if (!data.length || isLoading || error) return null;

  return (
    <section id="faqs" className="faqs">
      <div className="mx pad">
        <div className="faqs_container">
          <div className="mb-30">
            <h1 className="mb-30">
              Faq<span className="color-primary">s</span>
            </h1>
            <p>
              Frequently asked questions (FAQ) or Questions and Answers (Q&A),
              are listed questions and answers, all supposed to be commonly
              asked in some context
            </p>
          </div>
          <LayoutGroup id={Math.random().toString()}>
            <motion.div layout className="faqs_cards_section">
              {data.map((val, index) => {
                return (
                  <FaqCard key={index.toString()} {...val} index={index + 1} />
                );
              })}
            </motion.div>
          </LayoutGroup>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
