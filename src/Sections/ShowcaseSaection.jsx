import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
const ShowcaseSaection = () => {
  const sectionRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);

  useGSAP(() => {
    const projects = [
      project1Ref.current,
      project2Ref.current,
      project3Ref.current,
    ];
    gsap.fromTo(
      sectionRef.current,
      {
        opacity: 0,
      },
      { opacity: 1, duration: 1.5 }
    );

    projects.forEach((card, idx) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (idx + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <setion ref={sectionRef} id="work" className="app-showcase">
      <div className="w-full ">
        <div className="showcaselayout">
          {/* Left  */}
          <div className="first-project-wrapper" ref={project1Ref}>
            <div className="image-wrapper bg-black">
              <img src="/images/project1.png" alt="project1" className="object-fill px-5 md:px-10 xl:px-20" />
            </div>
            <div className="text-content">
              <h2>
                <span>ShopNova</span> a futurstic e-commerce website, with AI facility and Spin a well to get a discount Coupon.

              </h2>
              <p className="text-white-50 md:text-xl">
                An app built with MERN & TaileindCSS for a fast,
                user-friendly experience
              </p>
            </div>
          </div>

          {/* Right  */}
          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={project2Ref}>
              <div className="image-wrapper bg-[#ffefdb] ">
                <img
                  src="/images/project2.png"
                  alt="Libraray Mangement Platform"
                />
              </div>
              <h2>Library Mangement System</h2>
            </div>
            <div className="project" ref={project3Ref}>
              <div className="image-wrapper bg-[#ffe7eb] ">
                <img src="/images/project3.png" alt="YC directory" />
              </div>
              <h2>YC Directory - A startup Showcase App</h2>
            </div>
          </div>
        </div>
      </div>
    </setion>
  );
};

export default ShowcaseSaection;
