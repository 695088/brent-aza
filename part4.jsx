import { useState } from "react";

const LABELS = [
  "Age",
  "Income",
  "Household",
  "Cooking",
  "Financial, Q1",
  "Financial, Q2",
  "Convenience, Q1",
  "Convenience, Q2",
  "Environmental, Q1",
  "Environmental, Q2",
  "Download",
  "Waste",
];

const SHORT_LABELS = [
  "Age",
  "Income",
  "Household",
  "Cooking",
  "Fin. Q1",
  "Fin. Q2",
  "Conv. Q1",
  "Conv. Q2",
  "Env. Q1",
  "Env. Q2",
  "Download",
  "Waste",
];

const GROUPS = [
  { label: "Demographics", indices: [0, 1, 2, 3], color: "#2563eb" },
  { label: "Financial Motivation", indices: [4, 5], color: "#dc2626" },
  { label: "Convenience", indices: [6, 7], color: "#d97706" },
  { label: "Environmental", indices: [8, 9], color: "#16a34a" },
  { label: "Attitudinal", indices: [10, 11], color: "#7c3aed" },
];

const corrData = [
  [1.00, 0.01, -0.11, 0.09, -0.09, 0.05, 0.67, 0.66, -0.01, 0.11, -0.11, -0.13],
  [0.01, 1.00, 0.02, 0.05, 0.67, 0.70, -0.08, 0.09, 0.14, -0.08, -0.00, -0.10],
  [-0.11, 0.02, 1.00, -0.01, -0.06, 0.14, -0.01, -0.09, 0.16, -0.10, -0.02, 0.59],
  [0.09, 0.05, -0.01, 1.00, 0.06, 0.06, 0.06, -0.09, 0.10, 0.16, -0.72, 0.01],
  [-0.09, 0.67, -0.06, 0.06, 1.00, 0.48, -0.11, -0.00, 0.10, -0.07, -0.04, -0.11],
  [0.05, 0.70, 0.14, 0.06, 0.48, 1.00, -0.05, 0.07, 0.15, -0.01, 0.02, 0.04],
  [0.67, -0.08, -0.01, 0.06, -0.11, -0.05, 1.00, 0.43, -0.04, 0.24, -0.08, -0.05],
  [0.66, 0.09, -0.09, -0.09, -0.00, 0.07, 0.43, 1.00, 0.05, 0.03, 0.05, -0.11],
  [-0.01, 0.14, 0.16, 0.10, 0.10, 0.15, -0.04, 0.05, 1.00, 0.22, -0.13, 0.13],
  [0.11, -0.08, -0.10, 0.16, -0.07, -0.01, 0.24, 0.03, 0.22, 1.00, -0.11, -0.11],
  [-0.11, -0.00, -0.02, -0.72, -0.04, 0.02, -0.08, 0.05, -0.13, -0.11, 1.00, -0.12],
  [-0.13, -0.10, 0.59, 0.01, -0.11, 0.04, -0.05, -0.11, 0.13, -0.11, -0.12, 1.00],
];

const INSIGHTS = [
  {
    row: 4, col: 1,
    title: "Financial Motivation Q1 × Income",
    r: 0.67,
    direction: "positive",
    text: "As household income decreases, respondents more strongly agree they are bothered by money wasted on food (coded 1 = Strongly Agree). Lower-income households feel the sting of food waste most acutely, making financial pain the primary adoption driver for this segment.",
  },
  {
    row: 5, col: 1,
    title: "Financial Motivation Q2 × Income",
    r: 0.70,
    direction: "positive",
    text: "As household income decreases, respondents more strongly agree they would pay for an app that reduces their grocery bill. Budget-constrained households show the greatest willingness to invest in PantryPal precisely because the ROI—stopping $1,500/year in waste—is most meaningful to them.",
  },
  {
    row: 6, col: 0,
    title: "Convenience Q1 × Age",
    r: 0.67,
    direction: "positive",
    text: "As respondents increase in age, they show less agreement that minimal manual entry would increase their app usage. Younger users are significantly more sensitive to digital friction, making low-effort onboarding a critical design requirement for the primary target segment.",
  },
  {
    row: 7, col: 0,
    title: "Convenience Q2 × Age",
    r: 0.66,
    direction: "positive",
    text: "As respondents increase in age, they show less agreement that an auto-suggestion feature would simplify their daily routine. Younger respondents place a far higher premium on AI-driven automation, reinforcing that the meal-suggestion engine is most compelling for the 22–37 age segment.",
  },
  {
    row: 10, col: 3,
    title: "Download Intent × Cooking Frequency",
    r: -0.72,
    direction: "negative",
    text: "As cooking frequency increases, Download Intent decreases in code value—meaning respondents are more likely to download (coded 1 = Definitely Would). Frequent home cooks have the highest daily exposure to expiring ingredients and the strongest motivation to act, making them the most conversion-ready segment.",
  },
];

function interpolateColor(r) {
  if (r >= 1) return { bg: "#005f00", text: "#ffffff" };
  if (r <= -1) return { bg: "#7f0000", text: "#ffffff" };
  if (r > 0) {
    const t = r;
    const R = Math.round(255 * (1 - t * 0.98));
    const G = Math.round(130 + (255 - 130) * (1 - t));
    const B = Math.round(255 * (1 - t * 0.98));
    const brightness = R * 0.299 + G * 0.587 + B * 0.114;
    return {
      bg: `rgb(${R},${G},${B})`,
      text: brightness < 145 ? "#ffffff" : "#1a1a1a",
    };
  } else {
    const t = -r;
    const R = Math.round(180 + (255 - 180) * (1 - t));
    const G = Math.round(255 * (1 - t * 0.98));
    const B = Math.round(255 * (1 - t * 0.98));
    const brightness = R * 0.299 + G * 0.587 + B * 0.114;
    return {
      bg: `rgb(${R},${G},${B})`,
      text: brightness < 145 ? "#ffffff" : "#1a1a1a",
    };
  }
}

function getGroupColor(idx) {
  for (const g of GROUPS) {
    if (g.indices.includes(idx)) return g.color;
  }
  return "#374151";
}

export default function CorrelationMatrix() {
  const [hovered, setHovered] = useState(null);
  const [activeInsight, setActiveInsight] = useState(null);
  const [activeTab, setActiveTab] = useState("matrix");
  const n = 12;

  const isStrongPair = (i, j) => {
    return INSIGHTS.some(
      (ins) => (ins.row === i && ins.col === j) || (ins.row === j && ins.col === i)
    );
  };

  const getInsight = (i, j) => {
    return INSIGHTS.find(
      (ins) => (ins.row === i && ins.col === j) || (ins.row === j && ins.col === i)
    );
  };

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#0f1117",
      minHeight: "100vh",
      color: "#e8e0d4",
      padding: "0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;600;700&display=swap');
        * { box-sizing: border-box; }
        .matrix-cell {
          transition: transform 0.12s ease, box-shadow 0.12s ease;
          cursor: default;
        }
        .matrix-cell:hover {
          transform: scale(1.18);
          z-index: 10;
          box-shadow: 0 4px 16px rgba(0,0,0,0.5);
        }
        .strong-cell {
          cursor: pointer;
          outline: 2px solid rgba(255,255,255,0.7);
          outline-offset: -1px;
        }
        .strong-cell:hover {
          outline: 2px solid #ffffff;
        }
        .tab-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.6rem 1.4rem;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }
        .tab-btn:hover { color: #e8e0d4; }
        .insight-card {
          transition: all 0.2s;
          cursor: pointer;
        }
        .insight-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .legend-swatch {
          display: inline-block;
          width: 14px;
          height: 14px;
          border-radius: 2px;
          margin-right: 5px;
          vertical-align: middle;
        }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #1a1d27; }
        ::-webkit-scrollbar-thumb { background: #3a3f52; border-radius: 3px; }
      `}</style>

      {/* ── Header ── */}
      <div style={{
        background: "linear-gradient(180deg, #0a0d14 0%, #0f1117 100%)",
        borderBottom: "1px solid #1e2333",
        padding: "2.5rem 2rem 0",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "#4a7fa5", marginBottom: "0.6rem",
          }}>
            PantryPal · Customer Survey Analysis
          </div>
          <h1 style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            fontWeight: 700, color: "#f0ece4",
            letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "0.5rem",
          }}>
            Correlation Matrix
          </h1>
          <p style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: "0.9rem", color: "#6b7280", lineHeight: 1.6,
            maxWidth: 600, marginBottom: "1.8rem",
          }}>
            Pearson r values across 12 survey variables (n = 160). Lower triangle only.
            Diagonal suppressed. Bold outline = |r| &gt; 0.60.
          </p>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #1e2333" }}>
            {["matrix", "insights"].map((tab) => (
              <button
                key={tab}
                className="tab-btn"
                onClick={() => setActiveTab(tab)}
                style={{
                  color: activeTab === tab ? "#e8e0d4" : "#4b5563",
                  borderBottom: `2px solid ${activeTab === tab ? "#4a7fa5" : "transparent"}`,
                }}
              >
                {tab === "matrix" ? "Correlation Matrix" : "Strong Correlations"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem" }}>

        {activeTab === "matrix" && (
          <>
            {/* Group legend */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: "0.5rem 1.5rem",
              marginBottom: "1.5rem",
            }}>
              {GROUPS.map((g) => (
                <div key={g.label} style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.75rem", color: "#9ca3af",
                }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: g.color, flexShrink: 0,
                  }} />
                  {g.label}
                </div>
              ))}
            </div>

            {/* Matrix + tooltip */}
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ overflowX: "auto", flex: "1 1 auto" }}>
                <table style={{
                  borderCollapse: "separate", borderSpacing: 2,
                  tableLayout: "fixed",
                }}>
                  <colgroup>
                    <col style={{ width: 100 }} />
                    {Array.from({ length: n }).map((_, i) => (
                      <col key={i} style={{ width: 52 }} />
                    ))}
                  </colgroup>
                  <thead>
                    <tr>
                      <th style={{ background: "transparent" }} />
                      {SHORT_LABELS.map((lbl, j) => (
                        <th key={j} style={{
                          height: 90, verticalAlign: "bottom",
                          padding: "0 0 6px 0",
                          textAlign: "center",
                        }}>
                          <div style={{
                            display: "inline-block",
                            writingMode: "vertical-rl",
                            transform: "rotate(180deg)",
                            fontFamily: "'Source Sans 3', sans-serif",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            color: getGroupColor(j),
                            letterSpacing: "0.03em",
                            whiteSpace: "nowrap",
                          }}>
                            {lbl}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: n }).map((_, i) => (
                      <tr key={i}>
                        <td style={{
                          fontFamily: "'Source Sans 3', sans-serif",
                          fontSize: "0.7rem", fontWeight: 600,
                          color: getGroupColor(i),
                          textAlign: "right",
                          paddingRight: 8,
                          whiteSpace: "nowrap",
                          userSelect: "none",
                        }}>
                          {SHORT_LABELS[i]}
                        </td>
                        {Array.from({ length: n }).map((_, j) => {
                          if (j > i) {
                            return (
                              <td key={j} style={{
                                width: 52, height: 40,
                                background: "#141720",
                                borderRadius: 3,
                              }} />
                            );
                          }
                          if (j === i) {
                            return (
                              <td key={j} style={{
                                width: 52, height: 40,
                                background: "#1e2333",
                                borderRadius: 3,
                                textAlign: "center",
                                fontFamily: "'Source Sans 3', sans-serif",
                                fontSize: "0.8rem",
                                color: "#3a4055",
                                fontWeight: 700,
                              }}>
                                —
                              </td>
                            );
                          }
                          const r = corrData[i][j];
                          const { bg, text } = interpolateColor(r);
                          const strong = isStrongPair(i, j);
                          const isHovered = hovered?.i === i && hovered?.j === j;
                          return (
                            <td
                              key={j}
                              className={`matrix-cell${strong ? " strong-cell" : ""}`}
                              style={{
                                width: 52, height: 40,
                                background: bg,
                                borderRadius: 3,
                                textAlign: "center",
                                fontFamily: "'Source Sans 3', sans-serif",
                                fontSize: "0.72rem",
                                fontWeight: strong ? 700 : 400,
                                color: text,
                                position: "relative",
                                userSelect: "none",
                              }}
                              onMouseEnter={() => setHovered({ i, j, r, bg })}
                              onMouseLeave={() => setHovered(null)}
                              onClick={() => {
                                if (strong) {
                                  const ins = getInsight(i, j);
                                  setActiveInsight(ins);
                                  setActiveTab("insights");
                                }
                              }}
                            >
                              {r.toFixed(2)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tooltip / hover detail */}
              <div style={{
                width: 220, flexShrink: 0,
                background: "#141720",
                border: "1px solid #1e2333",
                borderRadius: 12,
                padding: "1.2rem",
                minHeight: 180,
                transition: "all 0.2s",
              }}>
                {hovered ? (
                  <>
                    <div style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "0.65rem", fontWeight: 700,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      color: "#4b5563", marginBottom: "0.8rem",
                    }}>
                      Cell Detail
                    </div>
                    <div style={{
                      display: "flex", alignItems: "center",
                      gap: "0.5rem", marginBottom: "0.6rem",
                    }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 6,
                        background: hovered.bg, flexShrink: 0,
                      }} />
                      <div style={{
                        fontFamily: "'Libre Baskerville', serif",
                        fontSize: "1.4rem", fontWeight: 700,
                        color: "#f0ece4",
                      }}>
                        {hovered.r.toFixed(2)}
                      </div>
                    </div>
                    <div style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "0.78rem", color: "#9ca3af",
                      lineHeight: 1.6,
                    }}>
                      <span style={{ color: getGroupColor(hovered.i), fontWeight: 600 }}>
                        {LABELS[hovered.i]}
                      </span>
                      {" × "}
                      <span style={{ color: getGroupColor(hovered.j), fontWeight: 600 }}>
                        {LABELS[hovered.j]}
                      </span>
                    </div>
                    <div style={{
                      marginTop: "0.8rem",
                      padding: "0.5rem 0.7rem",
                      background: "#0f1117",
                      borderRadius: 6,
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "0.75rem",
                      color: Math.abs(hovered.r) > 0.60 ? "#fbbf24" : "#6b7280",
                    }}>
                      {Math.abs(hovered.r) > 0.60
                        ? "⚡ Strong correlation — click to see insight"
                        : Math.abs(hovered.r) > 0.30
                        ? "Moderate correlation"
                        : "Weak / negligible correlation"}
                    </div>
                  </>
                ) : (
                  <div style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "0.78rem", color: "#374151",
                    lineHeight: 1.7, textAlign: "center",
                    paddingTop: "2rem",
                  }}>
                    Hover any cell<br />to see details.<br /><br />
                    <span style={{ color: "#4b5563" }}>
                      Bold-outlined cells have |r| &gt; 0.60.<br />Click them for insights.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Color scale legend */}
            <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.72rem", color: "#4b5563", fontWeight: 600 }}>
                r = −1
              </span>
              <div style={{
                height: 12, width: 200, borderRadius: 6,
                background: "linear-gradient(to right, rgb(180,0,0), rgb(255,255,255), rgb(0,130,0))",
                border: "1px solid #1e2333",
              }} />
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.72rem", color: "#4b5563", fontWeight: 600 }}>
                r = +1
              </span>
              <span style={{
                marginLeft: "1rem",
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.72rem", color: "#374151",
              }}>
                <span className="legend-swatch" style={{ background: "#1e2333", border: "1px solid #2a2f40" }} />
                Diagonal (suppressed)
                &nbsp;&nbsp;
                <span className="legend-swatch" style={{ background: "#141720" }} />
                Upper triangle (hidden)
              </span>
            </div>
          </>
        )}

        {activeTab === "insights" && (
          <div>
            <div style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.75rem", color: "#6b7280",
              marginBottom: "1.5rem", lineHeight: 1.6,
              padding: "0.8rem 1rem",
              background: "#141720", borderRadius: 8,
              borderLeft: "3px solid #4a7fa5",
            }}>
              <strong style={{ color: "#9ca3af" }}>Coding note:</strong> Likert items coded
              1 = Strongly Agree → 5 = Strongly Disagree. Download Intent coded
              1 = Definitely Would → 5 = Definitely Would Not. A positive r between
              a demographic and Likert item means higher demographic values coincide
              with higher (less agreeable) Likert scores.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {INSIGHTS.map((ins, idx) => {
                const isActive = activeInsight?.title === ins.title;
                const rColor = ins.r > 0 ? "#22c55e" : "#ef4444";
                return (
                  <div
                    key={idx}
                    className="insight-card"
                    onClick={() => setActiveInsight(isActive ? null : ins)}
                    style={{
                      background: isActive ? "#141720" : "#0f1117",
                      border: `1px solid ${isActive ? "#2a3045" : "#1a1f2e"}`,
                      borderLeft: `4px solid ${rColor}`,
                      borderRadius: 10,
                      padding: "1.2rem 1.5rem",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                      <div>
                        <div style={{
                          fontFamily: "'Libre Baskerville', serif",
                          fontSize: "1rem", fontWeight: 700,
                          color: "#e8e0d4", marginBottom: "0.2rem",
                        }}>
                          {ins.title}
                        </div>
                        <div style={{
                          fontFamily: "'Source Sans 3', sans-serif",
                          fontSize: "0.72rem", color: "#4b5563",
                          letterSpacing: "0.06em", textTransform: "uppercase",
                        }}>
                          {ins.direction === "positive" ? "Positive correlation" : "Negative correlation"}
                        </div>
                      </div>
                      <div style={{
                        flexShrink: 0,
                        fontFamily: "'Libre Baskerville', serif",
                        fontSize: "1.5rem", fontWeight: 700,
                        color: rColor,
                        minWidth: 64, textAlign: "right",
                      }}>
                        r = {ins.r.toFixed(2)}
                      </div>
                    </div>

                    {isActive && (
                      <div style={{
                        marginTop: "1rem",
                        paddingTop: "1rem",
                        borderTop: "1px solid #1e2333",
                      }}>
                        {/* Mini matrix highlight */}
                        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", alignItems: "center" }}>
                          <div style={{
                            padding: "4px 10px", borderRadius: 6,
                            background: getGroupColor(ins.col) + "22",
                            border: `1px solid ${getGroupColor(ins.col)}44`,
                            fontFamily: "'Source Sans 3', sans-serif",
                            fontSize: "0.75rem", fontWeight: 600,
                            color: getGroupColor(ins.col),
                          }}>
                            {LABELS[ins.col]}
                          </div>
                          <div style={{ color: "#4b5563", fontSize: "0.85rem" }}>×</div>
                          <div style={{
                            padding: "4px 10px", borderRadius: 6,
                            background: getGroupColor(ins.row) + "22",
                            border: `1px solid ${getGroupColor(ins.row)}44`,
                            fontFamily: "'Source Sans 3', sans-serif",
                            fontSize: "0.75rem", fontWeight: 600,
                            color: getGroupColor(ins.row),
                          }}>
                            {LABELS[ins.row]}
                          </div>
                          <div style={{
                            marginLeft: "auto",
                            width: 36, height: 36, borderRadius: 6,
                            background: interpolateColor(ins.r).bg,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: "'Source Sans 3', sans-serif",
                            fontSize: "0.72rem", fontWeight: 700,
                            color: interpolateColor(ins.r).text,
                          }}>
                            {ins.r.toFixed(2)}
                          </div>
                        </div>
                        <p style={{
                          fontFamily: "'Source Sans 3', sans-serif",
                          fontSize: "0.88rem", color: "#9ca3af",
                          lineHeight: 1.75, margin: 0,
                        }}>
                          {ins.text}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
              <button
                onClick={() => setActiveTab("matrix")}
                style={{
                  background: "transparent",
                  border: "1px solid #1e2333",
                  borderRadius: 8,
                  padding: "0.6rem 1.4rem",
                  color: "#4b5563",
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.target.style.color = "#9ca3af"; e.target.style.borderColor = "#2a3045"; }}
                onMouseLeave={(e) => { e.target.style.color = "#4b5563"; e.target.style.borderColor = "#1e2333"; }}
              >
                ← Back to Matrix
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #141720",
        padding: "1rem 2rem",
        textAlign: "center",
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: "0.7rem",
        color: "#374151",
        letterSpacing: "0.06em",
      }}>
        PantryPal Customer Survey · n = 160 respondents · Pearson Correlation · February 2026
      </div>
    </div>
  );
}