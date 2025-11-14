import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const showProjectOverView = [
  {
    id: 1,
    imagePath: "/images/project1.png",
    title: "ShopNova",
    shortDesc:
      "a futurstic e-commerce website, with AI facility and Spin a well to get a discount Coupon.",
    desc: "An app built with MERN & TailwindCSS for a fast, user-friendly experience",
  },
  {
    id: 2,
    imagePath: "/images/project2.png",
    title: "Library Management System",
    shortDesc: "A complete LMS dashboard and book management.",
    desc: "Built using MERN, Admin panel, charts & CRUD.",
  },
  {
    id: 3,
    imagePath: "/images/project3.png",
    title: "YC Directory",
    shortDesc: "Startup listing platform UI",
    desc: "Modern UI with React + GSAP transition animations.",
  },
  {
    id: 4,
    imagePath: "/images/project4.png",
    title: "TaskFlow",
    shortDesc: "Task management SaaS UI",
    desc: "Kanban board + drag and drop interactions.",
  },
  {
    id: 5,
    imagePath: "/images/project5.png",
    title: "WebWatch",
    shortDesc: "Track live website uptime",
    desc: "Uptime monitoring & alerts UI.",
  },
];

const isXL = () =>
  typeof window !== "undefined" ? window.innerWidth >= 1280 : true;

const ShowcaseSection = () => {
  // DOM refs
  const sectionRef = useRef(null);
  const cardLeftRef = useRef(null); // big left card (project1Ref)
  const cardRightTopRef = useRef(null); // project2Ref
  const cardRightBottomRef = useRef(null); // project3Ref
  const nextBtnRef = useRef(null);
  const prevBtnRef = useRef(null);

  // Indices to show currently in each slot
  const [leftIdx, setLeftIdx] = useState(0);
  const [rightTopIdx, setRightTopIdx] = useState(1);
  const [rightBottomIdx, setRightBottomIdx] = useState(2);

  // Keep a lock while animating (prevent double clicks)
  const animatingRef = useRef(false);

  // Keep ScrollTrigger animations (existing) via useGSAP
  useGSAP(() => {
    const projects = [
      cardLeftRef.current,
      cardRightTopRef.current,
      cardRightBottomRef.current,
    ];

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    projects.forEach((card, idx) => {
      if (!card) return;
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

  // helper to animate button click glow + scale
  const animateButtonClick = (btn) => {
    if (!btn) return;
    gsap.fromTo(
      btn,
      { scale: 1, boxShadow: "0 0 0px rgba(255,255,255,0)" },
      {
        scale: 1.12,
        boxShadow: "0 0 20px rgba(255,255,255,0.15)",
        duration: 0.18,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      }
    );
  };

  // core NEXT animation
  const handleNext = () => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    animateButtonClick(nextBtnRef.current);

    const leftEl = cardLeftRef.current;
    const rtEl = cardRightTopRef.current;
    const rbEl = cardRightBottomRef.current;

    // compute next indices but don't set them yet
    const total = showProjectOverView.length;
    const nextLeft = rightTopIdx;
    const nextRightTop = rightBottomIdx;
    const nextRightBottom = (rightBottomIdx + 1) % total;

    // choose animation depending on screen size
    if (isXL()) {
      // XL: complex zig-zag keyframe paths (approximation using keyframes)
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          // after animation completes, rotate indices to new positions
          setLeftIdx(nextLeft);
          setRightTopIdx(nextRightTop);
          setRightBottomIdx(nextRightBottom);
          // reset transforms (ensure elements are clean)
          gsap.set([leftEl, rtEl, rbEl], { clearProps: "all" });
          animatingRef.current = false;
        },
      });

      // Left card (current) - zig zag and fade out
      tl.to(leftEl, {
        keyframes: [
          { x: 200, y: -150, duration: 0.22 }, // push to right-top
          { x: -150, y: 0, duration: 0.28 }, // swing to left
          { x: -200, y: 160, opacity: 0, duration: 0.3 }, // exit bottom-left and fade
        ],
      }, 0);

      // Right-top moves to Left slot (entering)
      // Start it from a slightly top-right offset to mimic incoming motion
      tl.fromTo(rtEl,
        { x: 150, y: -100, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.6 },
        0.12
      );

      // Right-bottom moves up into Right-top
      tl.fromTo(rbEl,
        { x: 150, y: 120, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.52 },
        0.26
      );

      // The incoming new Right-bottom should slide in from left-side of the screen.
      // We'll create a temporary DOM clone to animate the incoming card from off-screen left -> into right-bottom slot.
      // To avoid DOM reordering complexity, animate the right-bottom slot itself after a short delay: first move it slightly left (off-screen) then bring in.
      // NOTE: actual content swap occurs onComplete, so we just animate rbEl quickly to give feel.
      tl.fromTo(rbEl,
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45 },
        0.45
      );

    } else {
      // Mobile / < XL: simpler page-like slide (left card slides left, right-top becomes left, right-bottom becomes rightTop, new rightBottom slides in)
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          setLeftIdx(nextLeft);
          setRightTopIdx(nextRightTop);
          setRightBottomIdx(nextRightBottom);
          gsap.set([leftEl, rtEl, rbEl], { clearProps: "all" });
          animatingRef.current = false;
        },
      });

      // slide left out
      tl.to(leftEl, { x: -300, opacity: 0, duration: 0.45 }, 0);

      // right-top -> left (slide left into place)
      tl.fromTo(rtEl, { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45 }, 0.12);

      // right-bottom -> right-top
      tl.fromTo(rbEl, { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45 }, 0.22);
    }
  };

  // core PREV animation (reverse directions)
  const handlePrev = () => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    animateButtonClick(prevBtnRef.current);

    const leftEl = cardLeftRef.current;
    const rtEl = cardRightTopRef.current;
    const rbEl = cardRightBottomRef.current;

    const total = showProjectOverView.length;
    // previous rotation:
    // left -> becomes rightTop
    // rightTop -> becomes rightBottom
    // previous card becomes left (which is leftIdx - 1)
    const prevLeft = (leftIdx - 1 + total) % total;
    const nextLeft = prevLeft;
    const nextRightTop = leftIdx; // current left becomes rightTop
    const nextRightBottom = rightTopIdx; // current rightTop becomes rightBottom

    if (isXL()) {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          setLeftIdx(nextLeft);
          setRightTopIdx(nextRightTop);
          setRightBottomIdx(nextRightBottom);
          gsap.set([leftEl, rtEl, rbEl], { clearProps: "all" });
          animatingRef.current = false;
        },
      });

      // Current left moves toward right-top and exits to top-right then fade
      tl.to(leftEl, {
        keyframes: [
          { x: -200, y: 150, duration: 0.22 }, // down-left
          { x: 150, y: 0, duration: 0.28 }, // swing right
          { x: 260, y: -160, opacity: 0, duration: 0.3 }, // exit top-right and fade
        ],
      }, 0);

      // Right-top moves to right-bottom
      tl.fromTo(rtEl, { x: 0, y: 0, opacity: 1 }, { x: 0, y: 120, opacity: 1, duration: 0.45 }, 0.12);

      // Right-bottom moves off-screen right (to make room)
      tl.to(rbEl, { x: 300, opacity: 0, duration: 0.45 }, 0.22);

      // Incoming previous card (nextLeft) should appear from right side into left slot
      tl.fromTo(leftEl,
        { x: 400, y: -100, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.55 },
        0.45
      );

    } else {
      // Mobile: simple slide-right action
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          setLeftIdx(nextLeft);
          setRightTopIdx(nextRightTop);
          setRightBottomIdx(nextRightBottom);
          gsap.set([leftEl, rtEl, rbEl], { clearProps: "all" });
          animatingRef.current = false;
        },
      });

      // left slides right out
      tl.to(leftEl, { x: 300, opacity: 0, duration: 0.45 }, 0);

      // rightTop -> rightBottom
      tl.fromTo(rtEl, { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45 }, 0.12);

      // rightBottom -> left
      tl.fromTo(rbEl, { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45 }, 0.22);
    }
  };

  // Keep indices consistent if showProjectOverView length or viewport changes
  useEffect(() => {
    const total = showProjectOverView.length;
    // safety clamp
    setLeftIdx((v) => (v >= 0 && v < total ? v : 0));
    setRightTopIdx((v) => (v >= 0 && v < total ? v : 1 % total));
    setRightBottomIdx((v) => (v >= 0 && v < total ? v : 2 % total));
  }, []);

  // in case window resizes and user toggles between mobile/xl behaviour, we can clear transforms
  useEffect(() => {
    const onResize = () => {
      gsap.set([cardLeftRef.current, cardRightTopRef.current, cardRightBottomRef.current], { clearProps: "all" });
    };
    if (typeof window !== "undefined") {
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }
  }, []);

  // helper to render a card using an index
  const renderCard = (idx, variant = "left") => {
    const data = showProjectOverView[idx];
    if (!data) return null;

    return (
      <div className={`card ${variant === "left" ? "first-project-wrapper" : "project"}`}>
        <div className="image-wrapper">
          <img src={data.imagePath} alt={data.title} />
        </div>
        <div className="text-content">
          <h2 className="">{data.title} {variant === "left" && <> - <span className="font-normal">{data.shortDesc}</span></>}</h2>
          {variant === "left" && <p className="text-white-50 md:text-xl">{data.desc}</p>}
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} id="work" className="app-showcase">
      <div className="w-full ">
        <div className="showcaselayout">
          {/* Left  */}
          <div className="first-project-wrapper" ref={cardLeftRef}>
            <div className="image-wrapper bg-black">
              <img src={showProjectOverView[leftIdx].imagePath} alt={showProjectOverView[leftIdx].title} className="object-fill px-5 md:px-10 xl:px-20" />
            </div>
            <div className="text-content">
              <h2>
                {showProjectOverView[leftIdx].title} - <span className="font-normal">{showProjectOverView[leftIdx].shortDesc}</span>
              </h2>
              <p className="text-white-50 md:text-xl">
                {showProjectOverView[leftIdx].desc}
              </p>
            </div>
          </div>

          {/* Right  */}
          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={cardRightTopRef}>
              <div className="image-wrapper bg-[#ffefdb] ">
                <img src={showProjectOverView[rightTopIdx].imagePath} alt={showProjectOverView[rightTopIdx].title} />
              </div>
              <h2>{showProjectOverView[rightTopIdx].title}</h2>
            </div>
            <div className="project" ref={cardRightBottomRef}>
              <div className="image-wrapper bg-[#ffe7eb] ">
                <img src={showProjectOverView[rightBottomIdx].imagePath} alt={showProjectOverView[rightBottomIdx].title} />
              </div>
              <h2>{showProjectOverView[rightBottomIdx].title}</h2>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-5 mt-6">
          <button
            ref={prevBtnRef}
            onClick={handlePrev}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg transition-all"
          >
            Prev
          </button>

          <span className="text-xl font-bold">
            {leftIdx + 1} / {showProjectOverView.length}
          </span>

          <button
            ref={nextBtnRef}
            onClick={handleNext}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg transition-all"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
