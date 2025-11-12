import React from "react";
import TitleHeader from "../Components/TitleHeader";
import { testimonials } from "../constants";
import GlowCard from "../Components/GlowCard";

const TestimonialSection = () => {
  return (
    <section id="testimonials" className="flex-center section-padding">
      <div className="size-full md:px-10 px-5">
        <TitleHeader
          title={"What People Say About Me"}
          sub={"Client Feedback Highlight"}
        />
        <div className="lg:columns-3 md:columns-2 columns-1 mt-16">
          {testimonials.map(({name, imgPath, mentions, review}, idx) => (
            <GlowCard card={{name, imgPath, mentions, review}}>
              <div className="flex items-center gap-3 ">
                <div>
                  <img src={imgPath} alt={name} />
                </div>
                <p className="font-bold">{name}</p>
                <p className="text-white-50">{mentions}</p>
                
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
