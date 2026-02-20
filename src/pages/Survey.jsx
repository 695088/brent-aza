import { useState } from "react";

const COLORS = {
  bg: "#faf7f2",
  card: "#ffffff",
  ink: "#1a1208",
  muted: "#7a6e5f",
  accent: "#c8401a",
  accentLight: "#f5e8e2",
  border: "#e8e0d4",
  gold: "#b8860b",
  goldLight: "#fdf6e3",
  success: "#2d6a4f",
};

const sections = [
  {
    id: "demographic",
    label: "Section A",
    title: "Demographic Profile",
    subtitle: "4 questions · Ordinal scale",
    color: COLORS.accent,
    questions: [
      { id: "d1", text: "What is your age?", type: "single", options: ["Under 22", "22 – 29", "30 – 37", "38 – 45", "46 – 55", "56 or older"] },
      { id: "d2", text: "What is your annual household income?", type: "single", options: ["Under $30,000", "$30,000 – $49,999", "$50,000 – $74,999", "$75,000 – $99,999", "$100,000 – $149,999", "$150,000 or more"] },
      { id: "d3", text: "How many people currently live in your household?", type: "single", options: ["1 person (just me)", "2 people", "3 people", "4 people", "5 or more people"] },
      { id: "d4", text: "How often do you cook meals at home each week?", type: "single", options: ["Rarely (0 – 1 times)", "Occasionally (2 – 3 times)", "Regularly (4 – 5 times)", "Very frequently (6 – 7 times)", "Multiple times per day"] },
    ],
  },
  {
    id: "likert",
    label: "Section B",
    title: "Buying Factors",
    subtitle: "3 constructs · 2 questions each · 5-point Likert scale",
    color: COLORS.gold,
    constructs: [
      {
        name: "Construct 1: Financial Motivation",
        description: "Measures sensitivity to household food cost waste as a driver of product adoption.",
        questions: [
          { id: "l1", text: "I am bothered by how much money my household spends on food that ultimately gets thrown away." },
          { id: "l2", text: "I would pay for an app if I believed it could meaningfully reduce my monthly grocery bill." },
        ],
      },
      {
        name: "Construct 2: Convenience & Ease of Use",
        description: "Measures how strongly ease of daily interaction influences purchase intent.",
        questions: [
          { id: "l3", text: "I am more likely to use a food management app regularly if it requires minimal manual data entry." },
          { id: "l4", text: "An app that automatically suggests meals based on ingredients I already have would simplify my daily routine." },
        ],
      },
      {
        name: "Construct 3: Environmental & Sustainability Values",
        description: "Measures the degree to which eco-conscious values drive willingness to adopt waste-reduction tools.",
        questions: [
          { id: "l5", text: "Reducing the amount of food I throw away is personally important to me for environmental reasons." },
          { id: "l6", text: "I actively look for products and services that help me live in a more environmentally responsible way." },
        ],
      },
    ],
  },
  {
    id: "attitudinal",
    label: "Section C",
    title: "Attitudinal & Behavioral",
    subtitle: "2 questions · Ordinal response scales",
    color: COLORS.success,
    questions: [
      { id: "a1", text: "How likely are you to download a free app that tracks your pantry's expiration dates and suggests meals based on what's about to expire?", type: "single", options: ["Definitely would not download it", "Probably would not download it", "Neutral / unsure", "Probably would download it", "Definitely would download it"] },
      { id: "a2", text: "In the past 6 months, how often have you thrown away food because it expired before you could use it?", type: "single", options: ["Never", "Once or twice", "About once a month", "A few times a month", "Almost every week"] },
    ],
  },
];

const likertLabels = ["Strongly\nAgree", "Agree", "Neutral", "Disagree", "Strongly\nDisagree"];
const likertValues = ["SA", "A", "N", "D", "SD"];

function SingleQuestion({ q, sectionColor, answers, setAnswers }) {
  return (
    <div style={{ marginBottom: "1.8rem", paddingBottom: "1.8rem", borderBottom: `1px solid ${COLORS.border}` }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 600, color: COLORS.ink, lineHeight: 1.5, marginBottom: "0.9rem" }}>{q.text}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
        {q.options.map((opt, i) => {
          const selected = answers[q.id] === opt;
          return (
            <label
              key={i}
              style={{
                display: "flex", alignItems: "center", gap: "0.65rem", cursor: "pointer",
                padding: "0.5rem 0.75rem", borderRadius: "8px",
                background: selected ? sectionColor + "12" : "transparent",
                border: `1px solid ${selected ? sectionColor : "transparent"}`,
                transition: "all 0.15s",
              }}
            >
              <div style={{
                width: 16, height: 16, borderRadius: "50%",
                border: `2px solid ${selected ? sectionColor : COLORS.border}`,
                background: selected ? sectionColor : "transparent",
                flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {selected && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
              </div>
              <input type="radio" name={q.id} value={opt} checked={selected} onChange={() => setAnswers({ ...answers, [q.id]: opt })} style={{ display: "none" }} />
              <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.88rem", color: selected ? COLORS.ink : COLORS.muted, fontWeight: selected ? 600 : 400 }}>{opt}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function LikertQuestion({ q, sectionColor, answers, setAnswers }) {
  return (
    <div style={{ marginBottom: "1.6rem", paddingBottom: "1.6rem", borderBottom: `1px solid ${COLORS.border}` }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 600, color: COLORS.ink, lineHeight: 1.5, marginBottom: "1rem" }}>{q.text}</p>
      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "space-between" }}>
        {likertValues.map((val, i) => {
          const selected = answers[q.id] === val;
          return (
            <button
              key={val}
              onClick={() => setAnswers({ ...answers, [q.id]: val })}
              style={{
                flex: 1, padding: "0.6rem 0.2rem", borderRadius: "10px",
                border: `1.5px solid ${selected ? sectionColor : COLORS.border}`,
                background: selected ? sectionColor + "18" : COLORS.bg,
                cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", transition: "all 0.15s",
              }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: "50%",
                border: `2px solid ${selected ? sectionColor : COLORS.border}`,
                background: selected ? sectionColor : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
              </div>
              <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.65rem", color: selected ? sectionColor : COLORS.muted, fontWeight: selected ? 700 : 400, textAlign: "center", lineHeight: 1.2, whiteSpace: "pre-line" }}>{likertLabels[i]}</span>
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.3rem" }}>
        <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.65rem", color: COLORS.muted, fontStyle: "italic" }}>← Most positive</span>
        <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.65rem", color: COLORS.muted, fontStyle: "italic" }}>Most negative →</span>
      </div>
    </div>
  );
}

export default function Survey() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState("demographic");
  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / 12) * 100);

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Lato:wght@400;600;700&display=swap');`}</style>
        <div style={{ textAlign: "center", maxWidth: 460 }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🥦</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 700, color: COLORS.ink, marginBottom: "0.5rem" }}>Thank you!</h2>
          <p style={{ fontFamily: "'Lato', sans-serif", color: COLORS.muted, lineHeight: 1.7 }}>
            Your responses have been recorded. You've helped shape PantryPal into a product that truly serves real households.
          </p>
          <div style={{ marginTop: "1.5rem", padding: "1rem 1.5rem", background: COLORS.accentLight, borderRadius: "12px", border: `1px solid ${COLORS.accent}33` }}>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: COLORS.accent, fontWeight: 600, margin: 0 }}>{answered} of 12 questions answered</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'Lato', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Lato:wght@300;400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { font-family: 'Lato', sans-serif; }
      `}</style>

      <div style={{ background: COLORS.ink, padding: "2.5rem 1.5rem 2rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: COLORS.accent + "22" }} />
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-block", padding: "3px 12px", borderRadius: "99px", background: COLORS.accent + "33", border: `1px solid ${COLORS.accent}55`, color: COLORS.accent, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.9rem" }}>Customer Discovery Survey</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 700, color: "#faf7f2", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "0.5rem" }}>
            Help Us Build <span style={{ color: COLORS.accent }}>PantryPal</span>
          </h1>
          <p style={{ color: "#9e9689", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: 500 }}>
            A 3-minute survey to understand how households manage food, waste, and grocery spending. Your input directly shapes the product.
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
              <span style={{ fontSize: "0.75rem", color: "#9e9689" }}>{answered} of 12 questions answered</span>
              <span style={{ fontSize: "0.75rem", color: COLORS.accent, fontWeight: 600 }}>{progress}%</span>
            </div>
            <div style={{ height: 4, background: "#2a2416", borderRadius: 4 }}>
              <div style={{ height: "100%", width: `${progress}%`, background: COLORS.accent, borderRadius: 4, transition: "width 0.4s ease" }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: "#f0ece4", borderBottom: `1px solid ${COLORS.border}`, padding: "0 1.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", gap: 0 }}>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                padding: "0.9rem 1.2rem", background: "transparent", border: "none",
                borderBottom: `3px solid ${activeSection === s.id ? s.color : "transparent"}`,
                color: activeSection === s.id ? COLORS.ink : COLORS.muted,
                fontWeight: activeSection === s.id ? 700 : 400, fontSize: "0.82rem",
                cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
              }}
            >
              <span style={{ color: s.color, fontWeight: 700, marginRight: "0.3rem" }}>{s.label}</span>
              {s.title}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
        {sections.map((section) =>
          activeSection === section.id && (
            <div key={section.id}>
              <div style={{
                background: section.color + "0e", border: `1px solid ${section.color}28`, borderRadius: "14px",
                padding: "1.2rem 1.5rem", marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem",
              }}>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 700, color: section.color }}>{section.title}</div>
                  <div style={{ fontSize: "0.78rem", color: COLORS.muted, marginTop: "2px" }}>{section.subtitle}</div>
                </div>
                <div style={{ padding: "4px 12px", borderRadius: "99px", background: section.color + "18", border: `1px solid ${section.color}44`, color: section.color, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>{section.label}</div>
              </div>

              {section.questions && section.questions.map((q) => (
                <SingleQuestion key={q.id} q={q} sectionColor={section.color} answers={answers} setAnswers={setAnswers} />
              ))}

              {section.constructs && section.constructs.map((construct, ci) => (
                <div key={ci} style={{ marginBottom: "2.2rem", background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: "14px", padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "1.2rem", paddingBottom: "1rem", borderBottom: `1px solid ${COLORS.border}` }}>
                    <div style={{ width: 32, height: 32, borderRadius: "8px", background: section.color + "22", border: `1.5px solid ${section.color}55`, display: "flex", alignItems: "center", justifyContent: "center", color: section.color, fontWeight: 800, fontSize: "0.85rem", flexShrink: 0, fontFamily: "'Cormorant Garamond', serif" }}>{ci + 1}</div>
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: COLORS.ink, fontSize: "1rem" }}>{construct.name}</div>
                      <div style={{ fontSize: "0.78rem", color: COLORS.muted, lineHeight: 1.5, marginTop: "2px" }}>{construct.description}</div>
                    </div>
                  </div>
                  {construct.questions.map((q) => (
                    <LikertQuestion key={q.id} q={q} sectionColor={section.color} answers={answers} setAnswers={setAnswers} />
                  ))}
                </div>
              ))}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.5rem" }}>
                <button
                  onClick={() => { const idx = sections.findIndex(s => s.id === activeSection); if (idx > 0) setActiveSection(sections[idx - 1].id); }}
                  disabled={sections.findIndex(s => s.id === activeSection) === 0}
                  style={{ padding: "0.7rem 1.4rem", borderRadius: "8px", border: `1px solid ${COLORS.border}`, background: "transparent", color: COLORS.muted, fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", opacity: sections.findIndex(s => s.id === activeSection) === 0 ? 0.3 : 1 }}
                >
                  ← Previous
                </button>
                {activeSection !== "attitudinal" ? (
                  <button
                    onClick={() => { const idx = sections.findIndex(s => s.id === activeSection); setActiveSection(sections[idx + 1].id); }}
                    style={{ padding: "0.7rem 1.8rem", borderRadius: "8px", background: section.color, color: "#fff", border: "none", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}
                  >
                    Next Section →
                  </button>
                ) : (
                  <button
                    onClick={() => setSubmitted(true)}
                    style={{ padding: "0.7rem 1.8rem", borderRadius: "8px", background: COLORS.success, color: "#fff", border: "none", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}
                  >
                    Submit Survey ✓
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
