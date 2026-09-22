import { useEffect, useRef, useState } from "react";
import "./FAQ.css";

type Audience = "parents" | "teachers" | "principals" | "students";

interface FAQItem {
  q: string;
  a: string;
} 

interface AudienceData {
  number: string;
  description: string;
  questions: FAQItem[];
}

const faqData: Record<Audience, AudienceData> = {
  parents: {
    number: "01",
    description:
      "Stay informed about academics, attendance, communication and everything happening at school.",
    questions: [
      {
        q: "Can parents track their child's attendance?",
        a: "Yes. Parents can view attendance information through the connected school system, helping them stay aware of regular attendance without waiting for manual updates.",
      },
      {
        q: "Can parents receive school announcements?",
        a: "Important notices, announcements and updates can be shared digitally so parents can access the information from one connected platform.",
      },
      {
        q: "Can parents check academic performance?",
        a: "Parents can access relevant academic information such as examination results, performance updates and other academic records made available by the school.",
      },
      {
        q: "Can parents view fee information?",
        a: "Fee details can be organised digitally, allowing parents to check relevant fee information and payment-related records without relying on repeated manual communication.",
      },
      {
        q: "Can parents communicate with teachers?",
        a: "The system can bring parent-teacher communication into a more organised digital workflow, making it easier to share relevant academic or student-related information.",
      },
    ],
  },

  teachers: {
    number: "02",
    description:
      "Spend less time managing repetitive tasks and more time focusing on teaching and students.",
    questions: [
      {
        q: "Can teachers manage attendance digitally?",
        a: "Teachers can record and manage student attendance digitally, reducing repetitive paperwork and making attendance information easier to maintain.",
      },
      {
        q: "Can teachers manage assignments?",
        a: "Assignments and academic activities can be organised digitally so teachers can keep track of classroom work and student submissions more efficiently.",
      },
      {
        q: "Can teachers access student information?",
        a: "Relevant student information can be made available through the system according to the teacher's role and permissions.",
      },
      {
        q: "Can teachers enter examination marks?",
        a: "Teachers can manage academic assessment information digitally, including entering and maintaining marks where the school's workflow supports it.",
      },
      {
        q: "Can teachers communicate with parents?",
        a: "Teachers can use organised communication workflows to share relevant student or academic updates with parents.",
      },
    ],
  },

  principals: {
    number: "03",
    description:
      "Bring academic, operational and administrative information together for better visibility across the campus.",
    questions: [
      {
        q: "Can principals monitor school performance?",
        a: "A centralised ERP can provide a broader view of academic and operational information, helping school leadership understand what is happening across the campus.",
      },
      {
        q: "Can principals manage multiple departments?",
        a: "Different school functions can be organised within connected modules, giving leadership better visibility while allowing departments to manage their own workflows.",
      },
      {
        q: "Can management access reports?",
        a: "Reports and dashboards can bring important information together, making it easier to review trends, records and operational performance.",
      },
      {
        q: "Can school workflows be customised?",
        a: "ERP workflows can be configured around the school's requirements so that different departments can follow processes that fit their operational needs.",
      },
      {
        q: "Can principals monitor fees and finance?",
        a: "Financial information can be organised within the ERP, giving authorised users a clearer overview of fee collection and related financial activities.",
      },
    ],
  },

  students: {
    number: "04",
    description:
      "Give students easier access to the information they need for academics, schedules and everyday school life.",
    questions: [
      {
        q: "Can students view their academic information?",
        a: "Students can access relevant academic information made available to them, helping them keep track of their learning progress.",
      },
      {
        q: "Can students see their timetable?",
        a: "A digital timetable can help students quickly understand their classes, schedules and academic activities.",
      },
      {
        q: "Can students access examination information?",
        a: "Relevant examination schedules, results and academic information can be made available digitally according to the school's setup.",
      },
      {
        q: "Can students receive school updates?",
        a: "Students can receive relevant announcements and information through the digital communication channels enabled by their school.",
      },
      {
        q: "Can students access learning resources?",
        a: "Schools can organise relevant learning resources digitally, allowing students to access materials according to the modules and permissions provided by the institution.",
      },
    ],
  },
};

export default function Insights() {
  const [activeAudience, setActiveAudience] =
    useState<Audience>("parents");

  const [openQuestion, setOpenQuestion] =
    useState<number | null>(null);

  const [switching, setSwitching] = useState(false);

  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    Array(5).fill(false)
  );

  const [progress, setProgress] = useState(20);

  const heroVisualRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLImageElement>(null);
  const bulbRef = useRef<HTMLDivElement>(null);

  const data = faqData[activeAudience];

  /* --------------------------------
     FAQ ITEMS REVEAL
  -------------------------------- */
  useEffect(() => {
    setVisibleItems(Array(5).fill(false));

    const timers = data.questions.map((_, index) =>
      window.setTimeout(() => {
        setVisibleItems((previous) => {
          const next = [...previous];
          next[index] = true;
          return next;
        });
      }, 100 + index * 120)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [activeAudience, data.questions.length]);

  /* --------------------------------
     SCROLL REVEAL
  -------------------------------- */
  useEffect(() => {
    const elements =
      document.querySelectorAll<HTMLElement>(
        ".insights-section .reveal"
      );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) =>
      observer.observe(element)
    );

    return () => observer.disconnect();
  }, []);

  /* --------------------------------
     BULB INTERACTION
  -------------------------------- */
  useEffect(() => {
    const bulb = bulbRef.current;

    if (!bulb) return;

    let timer: number | undefined;
    let hovering = false;

    const mouseEnter = () => {
      hovering = true;

      let step = 0;

      timer = window.setInterval(() => {
        if (!hovering) return;

        step++;

        const movement =
          Math.sin(step * 1.7) * 12;

        const rotation =
          Math.sin(step * 1.25) * 4;

        bulb.style.transform = `
          translateY(${ -16 + movement }px)
          rotate(${ -4 + rotation }deg)
          scale(${1.08 + Math.sin(step * 1.4) * 0.035})
        `;
      }, 120);
    };

    const mouseLeave = () => {
      hovering = false;

      if (timer) {
        clearInterval(timer);
      }

      bulb.style.transform = "";
    };

    bulb.addEventListener(
      "mouseenter",
      mouseEnter
    );

    bulb.addEventListener(
      "mouseleave",
      mouseLeave
    );

    return () => {
      bulb.removeEventListener(
        "mouseenter",
        mouseEnter
      );

      bulb.removeEventListener(
        "mouseleave",
        mouseLeave
      );

      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  /* --------------------------------
     AUDIENCE SWITCH
  -------------------------------- */
  const changeAudience = (audience: Audience) => {
    if (audience === activeAudience) return;

    setSwitching(true);
    setOpenQuestion(null);

    window.setTimeout(() => {
      setActiveAudience(audience);
      setProgress(20);
      setSwitching(false);
    }, 300);
  };

  /* --------------------------------
     FAQ OPEN / CLOSE
  -------------------------------- */
  const handleQuestion = (index: number) => {
    const isOpen = openQuestion === index;

    if (isOpen) {
      setOpenQuestion(null);
      return;
    }

    setOpenQuestion(index);

    const percentage =
      ((index + 1) /
        data.questions.length) *
      100;

    setProgress(percentage);
  };

  return (
    <div className="insights-section">

      {/* =========================
          HERO
      ========================= */}
      <section className="insights-hero">

        <div className="hero-grid"></div>

        <div className="hero-orbit orbit-one"></div>
        <div className="hero-orbit orbit-two"></div>

        <div className="hero-glow glow-one"></div>
        <div className="hero-glow glow-two"></div>

        <span className="hero-particle p1"></span>
        <span className="hero-particle p2"></span>
        <span className="hero-particle p3"></span>
        <span className="hero-particle p4"></span>
        <span className="hero-particle p5"></span>

        {/* LEFT */}
        <div className="hero-content reveal">

          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            INSIGHTS / FAQ
          </div>

          <h1>
            Questions deserve
            <span>better answers.</span>
          </h1>

          <p>
            Every school has different questions.
            Explore clear answers designed around
            the people who keep your campus moving.
          </p>

          <div className="hero-meta">
            <span>01 — Parents</span>
            <span>02 — Teachers</span>
            <span>03 — Principals</span>
            <span>04 — Students</span>
          </div>

        </div>

        {/* RIGHT VISUAL */}
        <div
          className="hero-visual reveal"
          ref={heroVisualRef}
        >

          <div className="visual-aura"></div>

          <div className="visual-ring ring-main"></div>

          <div className="visual-ring ring-small"></div>

          {/* CHILD */}
          <div className="child-stage">

            <img
              ref={childRef}
              className="thinking-child"
              src="/assets/faq1.png"
              alt="Student thinking"
            />

            <div className="child-shadow"></div>

          </div>

          {/* BULB */}
          <div
            className="idea-bulb"
            ref={bulbRef}
          >

            <div className="bulb-orbit"></div>

            <div className="bulb-rays">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>

            <div className="bulb-glow"></div>

            <div className="bulb">

              <div className="bulb-glass"></div>

              <div className="bulb-filament"></div>

              <div className="bulb-base"></div>

            </div>

            <div className="idea-label">
              <span>THINK</span>
              <strong>Better answers.</strong>
            </div>

          </div>

          {/* THOUGHT CARDS */}
          <div className="thought-chip chip-one">
            <span>01</span>
            Attendance
          </div>

          <div className="thought-chip chip-two">
            <span>02</span>
            Fees
          </div>

          <div className="thought-chip chip-three">
            <span>03</span>
            Results
          </div>

        </div>
      </section>


      {/* =========================
          AUDIENCE SELECTOR
      ========================= */}
      <section className="audience-section">

        <div className="audience-intro">

          <div className="faq-background-image">
            <img
              src="/assets/faq2.png"
              alt="FAQ2"
            />
          </div>

          <div className="section-heading reveal">

            <h2>
              Different people.
              <br />
              <span>Different questions.</span>
            </h2>

            <p>
              Choose who you are and discover
              answers that actually matter
              to your role.
            </p>

          </div>

        </div>


        <div className="audience-switch reveal">

          <button
            className={`audience-btn ${
              activeAudience === "parents"
                ? "active"
                : ""
            }`}
            onClick={() =>
              changeAudience("parents")
            }
          >
            <span className="button-number">
              01
            </span>

            <span>
              <small>FOR</small>
              Parents
            </span>

            <b>↗</b>
          </button>


          <button
            className={`audience-btn ${
              activeAudience === "teachers"
                ? "active"
                : ""
            }`}
            onClick={() =>
              changeAudience("teachers")
            }
          >
            <span className="button-number">
              02
            </span>

            <span>
              <small>FOR</small>
              Teachers
            </span>

            <b>↗</b>
          </button>


          <button
            className={`audience-btn ${
              activeAudience === "principals"
                ? "active"
                : ""
            }`}
            onClick={() =>
              changeAudience("principals")
            }
          >
            <span className="button-number">
              03
            </span>

            <span>
              <small>FOR</small>
              Principals
            </span>

            <b>↗</b>
          </button>


          <button
            className={`audience-btn ${
              activeAudience === "students"
                ? "active"
                : ""
            }`}
            onClick={() =>
              changeAudience("students")
            }
          >
            <span className="button-number">
              04
            </span>

            <span>
              <small>FOR</small>
              Students
            </span>

            <b>↗</b>
          </button>

        </div>

      </section>


      {/* =========================
          FAQ
      ========================= */}
      <section
        className="faq-section"
        id="faq"
      >

        <div className="faq-background-orb"></div>


        {/* LEFT */}
        <div className="faq-intro reveal">

          <div className="faq-counter">
            <span>
              {data.number}
            </span>
          </div>

          <span className="section-label">
            YOUR QUESTIONS
          </span>

          <h2>
            {activeAudience === "parents" && (
              <>
                For parents who
                <em>want to stay connected.</em>
              </>
            )}

            {activeAudience === "teachers" && (
              <>
                For teachers who
                <em>keep learning moving.</em>
              </>
            )}

            {activeAudience === "principals" && (
              <>
                For principals who
                <em>see the bigger picture.</em>
              </>
            )}

            {activeAudience === "students" && (
              <>
                For students who
                <em>keep learning forward.</em>
              </>
            )}
          </h2>

          <p>
            {data.description}
          </p>


          <div className="mini-note">

            <div className="note-icon">
              <span>+</span>
            </div>

            <div>
              <strong>
                One connected platform.
              </strong>

              <span>
                Less searching. More knowing.
              </span>
            </div>

          </div>


          {/* PROGRESS */}
          <div className="faq-progress">

            <div className="progress-top">

              <span>
                QUESTION FLOW
              </span>

              <span>
                {openQuestion === null
                  ? `01 / ${String(
                      data.questions.length
                    ).padStart(2, "0")}`
                  : `${String(
                      openQuestion + 1
                    ).padStart(2, "0")} / ${String(
                      data.questions.length
                    ).padStart(2, "0")}`}
              </span>

            </div>

            <div className="progress-line">

              <span
                style={{
                  width: `${progress}%`,
                }}
              ></span>

            </div>

          </div>

        </div>


        {/* RIGHT */}
        <div
          className="faq-list"
          style={{
            opacity: switching ? 0 : 1,
            transform: switching
              ? "translateY(25px)"
              : "translateY(0)",
          }}
        >

          {data.questions.map(
            (item, index) => {

              const isOpen =
                openQuestion === index;

              return (
                <article
                  key={item.q}
                  className={`faq-item ${
                    visibleItems[index]
                      ? "visible"
                      : ""
                  } ${
                    isOpen ? "open" : ""
                  }`}
                  onMouseMove={(event) => {
                    const rect =
                      event.currentTarget.getBoundingClientRect();

                    const x =
                      event.clientX -
                      rect.left;

                    const y =
                      event.clientY -
                      rect.top;

                    event.currentTarget.style.background = `
                      radial-gradient(
                        180px circle at
                        ${x}px ${y}px,
                        rgba(214,168,63,.12),
                        rgba(255,255,255,.035)
                      )
                    `;
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background =
                      "";
                  }}
                >

                  <button
                    className="faq-question"
                    aria-expanded={isOpen}
                    onClick={() =>
                      handleQuestion(index)
                    }
                  >

                    <span className="question-number">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span className="question-text">
                      {item.q}
                    </span>

                    <span className="question-icon">
                      +
                    </span>

                  </button>


                  <div className="faq-answer">

                    <div className="faq-answer-inner">
                      {item.a}
                    </div>

                  </div>

                </article>
              );
            }
          )}

        </div>

      </section>

    </div>
  );
}