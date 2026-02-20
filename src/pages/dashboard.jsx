import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, ReferenceLine
} from "recharts";

/* ─── DATA ──────────────────────────────────────────────────────────────────── */
const N = 160;

const ageData = [
  { label: "Under 22", value: 11 }, { label: "22–29", value: 39 },
  { label: "30–37", value: 40 },   { label: "38–45", value: 29 },
  { label: "46–55", value: 25 },   { label: "56+", value: 16 },
];
const incomeData = [
  { label: "Under $30k", value: 19 }, { label: "$30–50k", value: 28 },
  { label: "$50–75k", value: 35 },    { label: "$75–100k", value: 40 },
  { label: "$100–150k", value: 26 },  { label: "$150k+", value: 12 },
];
const hhData = [
  { label: "1 person", value: 36 }, { label: "2 people", value: 28 },
  { label: "3 people", value: 38 }, { label: "4 people", value: 34 },
  { label: "5+ people", value: 24 },
];
const cookingData = [
  { label: "Rarely", value: 12 },     { label: "Occasionally", value: 31 },
  { label: "Regularly", value: 48 },  { label: "Very Freq.", value: 40 },
  { label: "Multiple/day", value: 29 },
];
const downloadData = [
  { label: "Def. Would", value: 3 },  { label: "Prob. Would", value: 27 },
  { label: "Neutral", value: 58 },    { label: "Prob. Would Not", value: 55 },
  { label: "Def. Would Not", value: 17 },
];
const wasteData = [
  { label: "Never", value: 17 },     { label: "Once/Twice", value: 33 },
  { label: "~Monthly", value: 74 },  { label: "Few/Month", value: 31 },
  { label: "~Weekly", value: 5 },
];

const LIKERT_LABELS = ["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"];
const LIKERT_COLORS = ["#16a34a","#86efac","#e5e7eb","#fca5a5","#dc2626"];

const likertData = {
  "Q5 – Bothered by waste":       [41.9, 34.4, 18.8, 5.0, 0.0],
  "Q6 – Would pay to save":       [36.2, 35.6, 23.8, 4.4, 0.0],
  "Q7 – Less entry = more use":   [3.8, 31.9, 33.8, 27.5, 3.1],
  "Q8 – Auto-suggest simplifies": [5.6, 26.9, 38.1, 23.8, 5.6],
  "Q9 – Env. important":          [0.0, 0.0, 31.2, 35.0, 33.8],
  "Q10 – Eco products":           [0.0, 0.0, 30.0, 38.8, 31.2],
};

const constructRadar = [
  { axis: "Financial\nMotivation", score: 4.08 },
  { axis: "Convenience\n& Ease",   score: 3.04 },
  { axis: "Environmental\nValues", score: 1.98 },
];

const crossData = [
  { cooking: "Rarely",       "Def. Would": 0,   "Prob. Would": 0,    "Neutral": 8.3,  "Prob. Would Not": 25.0, "Def. Would Not": 66.7 },
  { cooking: "Occasionally", "Def. Would": 0,   "Prob. Would": 0,    "Neutral": 12.9, "Prob. Would Not": 61.3, "Def. Would Not": 25.8 },
  { cooking: "Regularly",    "Def. Would": 0,   "Prob. Would": 2.1,  "Neutral": 41.7, "Prob. Would Not": 54.2, "Def. Would Not": 2.1  },
  { cooking: "Very Freq.",   "Def. Would": 2.5, "Prob. Would": 30.0, "Neutral": 57.5, "Prob. Would Not": 10.0, "Def. Would Not": 0    },
  { cooking: "Multiple/day", "Def. Would": 6.9, "Prob. Would": 48.3, "Neutral": 34.5, "Prob. Would Not": 10.3, "Def. Would Not": 0    },
];

const incFinData = [
  { income: "Under $30k", "Q5 – Bothered": 1.11, "Q6 – Would Pay": 1.16 },
  { income: "$30–50k",    "Q5 – Bothered": 1.25, "Q6 – Would Pay": 1.32 },
  { income: "$50–75k",    "Q5 – Bothered": 1.49, "Q6 – Would Pay": 1.71 },
  { income: "$75–100k",   "Q5 – Bothered": 2.28, "Q6 – Would Pay": 2.05 },
  { income: "$100–150k",  "Q5 – Bothered": 2.35, "Q6 – Would Pay": 2.96 },
  { income: "$150k+",     "Q5 – Bothered": 3.25, "Q6 – Would Pay": 3.00 },
];

const corrLabels = ["Age","Income","Household","Cooking","Fin.Q1","Fin.Q2","Conv.Q1","Conv.Q2","Env.Q1","Env.Q2","Download","Waste"];
const corrMatrix = [
  [1.00,0.01,-0.11,0.09,-0.09,0.05,0.67,0.66,-0.01,0.11,-0.11,-0.13],
  [0.01,1.00,0.02,0.05,0.67,0.70,-0.08,0.09,0.14,-0.08,-0.00,-0.10],
  [-0.11,0.02,1.00,-0.01,-0.06,0.14,-0.01,-0.09,0.16,-0.10,-0.02,0.59],
  [0.09,0.05,-0.01,1.00,0.06,0.06,0.06,-0.09,0.10,0.16,-0.72,0.01],
  [-0.09,0.67,-0.06,0.06,1.00,0.48,-0.11,-0.00,0.10,-0.07,-0.04,-0.11],
  [0.05,0.70,0.14,0.06,0.48,1.00,-0.05,0.07,0.15,-0.01,0.02,0.04],
  [0.67,-0.08,-0.01,0.06,-0.11,-0.05,1.00,0.43,-0.04,0.24,-0.08,-0.05],
  [0.66,0.09,-0.09,-0.09,-0.00,0.07,0.43,1.00,0.05,0.03,0.05,-0.11],
  [-0.01,0.14,0.16,0.10,0.10,0.15,-0.04,0.05,1.00,0.22,-0.13,0.13],
  [0.11,-0.08,-0.10,0.16,-0.07,-0.01,0.24,0.03,0.22,1.00,-0.11,-0.11],
  [-0.11,-0.00,-0.02,-0.72,-0.04,0.02,-0.08,0.05,-0.13,-0.11,1.00,-0.12],
  [-0.13,-0.10,0.59,0.01,-0.11,0.04,-0.05,-0.11,0.13,-0.11,-0.12,1.00],
];

const insights = [
  { pair: "Financial Q1 × Income", r: 0.67, dir: "+",
    text: "As household income decreases, respondents more strongly agree they are bothered by money wasted on food (1 = Strongly Agree). Lower-income households feel the sting of food waste most acutely." },
  { pair: "Financial Q2 × Income", r: 0.70, dir: "+",
    text: "As income decreases, respondents more strongly agree they would pay for an app that reduces their grocery bill. Budget-constrained households show the greatest willingness to invest when ROI is clear." },
  { pair: "Convenience Q1 × Age", r: 0.67, dir: "+",
    text: "As age increases, respondents show less agreement that minimal manual entry would increase app usage. Younger users are far more sensitive to digital friction and expect frictionless onboarding." },
  { pair: "Convenience Q2 × Age", r: 0.66, dir: "+",
    text: "As age increases, respondents show less agreement that auto-suggestions would simplify their routine. The AI meal-suggestion engine resonates most strongly with the 22–37 segment." },
  { pair: "Download Intent × Cooking Freq.", r: -0.72, dir: "−",
    text: "As cooking frequency increases, Download Intent code decreases — meaning more likely to download (1 = Definitely Would). Frequent home cooks have the most to gain and are the most conversion-ready segment." },
];

/* ─── HELPERS ───────────────────────────────────────────────────────────────── */
const TABS = ["Demographics","Constructs","Key Relationships","Correlation Matrix","Insights"];

const DEMO_COLORS  = ["#3b82f6","#60a5fa","#93c5fd","#bfdbfe","#dbeafe","#eff6ff"];
const GREEN_COLORS = ["#166534","#16a34a","#4ade80","#bbf7d0","#dcfce7"];
const DL_COLORS    = ["#16a34a","#86efac","#e5e7eb","#fca5a5","#dc2626"];
const COOKING_COLORS = ["#1d4ed8","#3b82f6","#60a5fa","#93c5fd","#bfdbfe"];

function corrColor(r) {
  if (r >= 1)  return { bg: "#14532d", fg: "#fff" };
  if (r <= -1) return { bg: "#7f1d1d", fg: "#fff" };
  if (r > 0) {
    const t = r;
    const R = Math.round(255*(1-t*0.92)), G = Math.round(130+(255-130)*(1-t)), B = Math.round(255*(1-t*0.92));
    const br = R*0.299+G*0.587+B*0.114;
    return { bg: `rgb(${R},${G},${B})`, fg: br < 140 ? "#fff" : "#111" };
  } else {
    const t = -r;
    const R = Math.round(180+(255-180)*(1-t)), G = Math.round(255*(1-t*0.92)), B = Math.round(255*(1-t*0.92));
    const br = R*0.299+G*0.587+B*0.114;
    return { bg: `rgb(${R},${G},${B})`, fg: br < 140 ? "#fff" : "#111" };
  }
}

const pct = (v) => `${v.toFixed(1)}%`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:"#1e293b", border:"1px solid #334155", borderRadius:8, padding:"8px 12px" }}>
      <p style={{ color:"#94a3b8", fontSize:"0.75rem", marginBottom:4 }}>{label}</p>
      {payload.map((p,i) => (
        <p key={i} style={{ color: p.color || "#f1f5f9", fontSize:"0.8rem", margin:"2px 0" }}>
          <span style={{ fontWeight:600 }}>{p.name}:</span> {typeof p.value === "number" ? p.value.toFixed(1) : p.value}
        </p>
      ))}
    </div>
  );
};

/* ─── SUBCOMPONENTS ─────────────────────────────────────────────────────────── */

function StatCard({ label, value, sub, color = "#3b82f6" }) {
  return (
    <div style={{
      background:"#1e293b", border:"1px solid #334155", borderRadius:12,
      padding:"1.2rem 1.4rem", flex:"1 1 160px",
    }}>
      <div style={{ fontSize:"2rem", fontWeight:800, color, fontFamily:"'Playfair Display',serif", lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:"0.75rem", fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.08em", marginTop:"0.4rem" }}>{label}</div>
      {sub && <div style={{ fontSize:"0.72rem", color:"#475569", marginTop:"0.2rem" }}>{sub}</div>}
    </div>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom:"1.5rem" }}>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.4rem", fontWeight:700, color:"#f1f5f9", margin:0 }}>{children}</h2>
      {sub && <p style={{ color:"#64748b", fontSize:"0.82rem", marginTop:"0.3rem" }}>{sub}</p>}
    </div>
  );
}

function ChartCard({ title, children, span = 1 }) {
  return (
    <div style={{
      background:"#1e293b", border:"1px solid #334155", borderRadius:12,
      padding:"1.2rem", gridColumn: `span ${span}`,
    }}>
      <div style={{ fontSize:"0.8rem", fontWeight:700, color:"#64748b", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"1rem" }}>{title}</div>
      {children}
    </div>
  );
}

/* ─── TABS ───────────────────────────────────────────────────────────────────── */

function DemographicsTab() {
  return (
    <div>
      <SectionTitle sub="Who responded to the PantryPal customer survey (n = 160)">Respondent Demographics</SectionTitle>

      <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap", marginBottom:"1.5rem" }}>
        <StatCard label="Total Responses" value="160" color="#3b82f6" />
        <StatCard label="Largest Age Group" value="30–37" sub="40 respondents (25%)" color="#60a5fa" />
        <StatCard label="Most Common Income" value="$75–100k" sub="40 respondents (25%)" color="#f59e0b" />
        <StatCard label="Most Common HH Size" value="3 people" sub="38 respondents (24%)" color="#16a34a" />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"1rem" }}>
        <ChartCard title="Q1 — Age Distribution">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ageData} margin={{ top:4, right:8, bottom:20, left:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="label" tick={{ fill:"#94a3b8", fontSize:11 }} angle={-20} textAnchor="end" interval={0} />
              <YAxis tick={{ fill:"#64748b", fontSize:11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Respondents" radius={[4,4,0,0]}>
                {ageData.map((_, i) => <Cell key={i} fill={DEMO_COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Q2 — Household Income">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={incomeData} margin={{ top:4, right:8, bottom:20, left:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="label" tick={{ fill:"#94a3b8", fontSize:11 }} angle={-20} textAnchor="end" interval={0} />
              <YAxis tick={{ fill:"#64748b", fontSize:11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Respondents" radius={[4,4,0,0]}>
                {incomeData.map((_, i) => <Cell key={i} fill={["#f59e0b","#fbbf24","#fcd34d","#fde68a","#fef3c7","#fffbeb"][i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Q3 — Household Size">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={hhData} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={80} label={({ label, percent }) => `${label}: ${(percent*100).toFixed(0)}%`} labelLine={false}>
                {hhData.map((_, i) => <Cell key={i} fill={["#7c3aed","#8b5cf6","#a78bfa","#c4b5fd","#ede9fe"][i]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Q4 — Cooking Frequency per Week">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={cookingData} layout="vertical" margin={{ top:4, right:8, bottom:4, left:64 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis type="number" tick={{ fill:"#64748b", fontSize:11 }} />
              <YAxis dataKey="label" type="category" tick={{ fill:"#94a3b8", fontSize:11 }} width={64} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Respondents" radius={[0,4,4,0]}>
                {cookingData.map((_, i) => <Cell key={i} fill={COOKING_COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function ConstructsTab() {
  const [activeQ, setActiveQ] = useState("Q5 – Bothered by waste");

  return (
    <div>
      <SectionTitle sub="Likert scale agreement (1 = Strongly Agree → 5 = Strongly Disagree)">Buying Factor Constructs</SectionTitle>

      <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap", marginBottom:"1.5rem" }}>
        <StatCard label="Financial Motivation" value="4.08/5" sub="High agreement — avg across C1 questions" color="#ef4444" />
        <StatCard label="Convenience & Ease" value="3.04/5" sub="Moderate agreement — avg across C2 questions" color="#f59e0b" />
        <StatCard label="Environmental Values" value="1.98/5" sub="Low agreement — avg across C3 questions" color="#16a34a" />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"1rem" }}>
        <ChartCard title="Construct Agreement Summary (avg score out of 5)" span={2}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={[
                { name:"Financial\nMotivation", score:4.08, q1:4.13, q2:4.04 },
                { name:"Convenience\n& Ease",   score:3.04, q1:3.06, q2:3.03 },
                { name:"Environmental\nValues", score:1.98, q1:1.98, q2:1.99 },
              ]}
              margin={{ top:8, right:16, bottom:8, left:0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" tick={{ fill:"#94a3b8", fontSize:11 }} />
              <YAxis domain={[0,5]} tick={{ fill:"#64748b", fontSize:11 }} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={3} stroke="#475569" strokeDasharray="4 4" label={{ value:"Midpoint", fill:"#475569", fontSize:10 }} />
              <Bar dataKey="q1" name="Question 1" fill="#3b82f6" radius={[4,4,0,0]} />
              <Bar dataKey="q2" name="Question 2" fill="#60a5fa" radius={[4,4,0,0]} />
              <Legend wrapperStyle={{ color:"#94a3b8", fontSize:"0.75rem" }} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Question-level Likert Distribution">
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem", marginBottom:"0.8rem" }}>
            {Object.keys(likertData).map((q) => (
              <button key={q} onClick={() => setActiveQ(q)} style={{
                padding:"3px 8px", borderRadius:99, border:"1px solid",
                borderColor: activeQ === q ? "#3b82f6" : "#334155",
                background: activeQ === q ? "#1d4ed8" : "transparent",
                color: activeQ === q ? "#fff" : "#64748b",
                fontSize:"0.7rem", fontWeight:600, cursor:"pointer",
              }}>{q.split("–")[0].trim()}</button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={likertData[activeQ].map((v,i) => ({ label: LIKERT_LABELS[i], pct: v }))}
              margin={{ top:4, right:8, bottom:28, left:0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="label" tick={{ fill:"#94a3b8", fontSize:10 }} angle={-15} textAnchor="end" interval={0} />
              <YAxis tick={{ fill:"#64748b", fontSize:11 }} unit="%" />
              <Tooltip content={<CustomTooltip />} formatter={(v) => [`${v}%`,"% respondents"]} />
              <Bar dataKey="pct" name="% respondents" radius={[4,4,0,0]}>
                {LIKERT_LABELS.map((_, i) => <Cell key={i} fill={LIKERT_COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p style={{ fontSize:"0.7rem", color:"#475569", marginTop:"0.5rem", fontStyle:"italic" }}>{activeQ}</p>
        </ChartCard>

        <ChartCard title="Q11 — App Download Intent">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={downloadData} dataKey="value" nameKey="label" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={2}>
                {downloadData.map((_, i) => <Cell key={i} fill={DL_COLORS[i]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color:"#94a3b8", fontSize:"0.72rem" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Q12 — Past Food Waste Frequency">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={wasteData} margin={{ top:4, right:8, bottom:20, left:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="label" tick={{ fill:"#94a3b8", fontSize:11 }} interval={0} />
              <YAxis tick={{ fill:"#64748b", fontSize:11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Respondents" radius={[4,4,0,0]}>
                {wasteData.map((_, i) => <Cell key={i} fill={["#16a34a","#4ade80","#fde68a","#fca5a5","#dc2626"][i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function RelationshipsTab() {
  return (
    <div>
      <SectionTitle sub="How demographic variables drive construct agreement and download behavior">Key Relationships</SectionTitle>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"1rem" }}>
        <ChartCard title="Income vs Financial Motivation (avg Likert score — lower = more agreement)" span={2}>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={incFinData} margin={{ top:8, right:16, bottom:8, left:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="income" tick={{ fill:"#94a3b8", fontSize:11 }} />
              <YAxis domain={[1,4]} tick={{ fill:"#64748b", fontSize:11 }} label={{ value:"Avg Likert (1=SA)", angle:-90, position:"insideLeft", fill:"#475569", fontSize:10 }} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={3} stroke="#475569" strokeDasharray="4 4" />
              <Line type="monotone" dataKey="Q5 – Bothered" stroke="#ef4444" strokeWidth={2} dot={{ fill:"#ef4444", r:4 }} />
              <Line type="monotone" dataKey="Q6 – Would Pay" stroke="#f97316" strokeWidth={2} dot={{ fill:"#f97316", r:4 }} />
              <Legend wrapperStyle={{ color:"#94a3b8", fontSize:"0.75rem" }} />
            </LineChart>
          </ResponsiveContainer>
          <p style={{ fontSize:"0.72rem", color:"#475569", marginTop:"0.5rem", fontStyle:"italic" }}>r ≈ 0.67–0.70 · As income rises, financial motivation scores rise toward 3–4 (less agreement), confirming the correlation.</p>
        </ChartCard>

        <ChartCard title="Cooking Frequency vs Download Intent (% within each cooking group)" span={2}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={crossData} margin={{ top:8, right:16, bottom:8, left:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="cooking" tick={{ fill:"#94a3b8", fontSize:11 }} />
              <YAxis tick={{ fill:"#64748b", fontSize:11 }} unit="%" domain={[0,100]} />
              <Tooltip content={<CustomTooltip />} formatter={(v) => [`${v}%`]} />
              <Legend wrapperStyle={{ color:"#94a3b8", fontSize:"0.72rem" }} />
              <Bar dataKey="Def. Would" stackId="a" fill="#16a34a" />
              <Bar dataKey="Prob. Would" stackId="a" fill="#86efac" />
              <Bar dataKey="Neutral" stackId="a" fill="#94a3b8" />
              <Bar dataKey="Prob. Would Not" stackId="a" fill="#fca5a5" />
              <Bar dataKey="Def. Would Not" stackId="a" fill="#dc2626" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
          <p style={{ fontSize:"0.72rem", color:"#475569", marginTop:"0.5rem", fontStyle:"italic" }}>r = −0.72 · "Multiple/day" cooks: 55% likely to download. "Rarely" cooks: 92% unlikely. Strongest signal in the dataset.</p>
        </ChartCard>
      </div>
    </div>
  );
}

function CorrMatrixTab() {
  const [hovered, setHovered] = useState(null);
  const n = 12;
  const isStrong = (i, j) => Math.abs(corrMatrix[i][j]) > 0.60 && i !== j;

  const groupOf = (idx) => {
    if (idx <= 3) return "#3b82f6";
    if (idx <= 5) return "#ef4444";
    if (idx <= 7) return "#f59e0b";
    if (idx <= 9) return "#16a34a";
    return "#7c3aed";
  };

  return (
    <div>
      <SectionTitle sub="Pearson r — lower triangle only · diagonal suppressed · |r| > 0.60 outlined">Correlation Matrix (12 × 12)</SectionTitle>
      <div style={{ display:"flex", gap:"1.5rem", flexWrap:"wrap", alignItems:"flex-start" }}>
        <div style={{ overflowX:"auto", flex:"1 1 auto" }}>
          <table style={{ borderCollapse:"separate", borderSpacing:2 }}>
            <thead>
              <tr>
                <th style={{ width:72, minWidth:72 }} />
                {corrLabels.map((lbl,j) => (
                  <th key={j} style={{ width:44, height:80, verticalAlign:"bottom", paddingBottom:4, textAlign:"center" }}>
                    <div style={{
                      writingMode:"vertical-rl", transform:"rotate(180deg)",
                      fontSize:"0.65rem", fontWeight:700, color: groupOf(j),
                      whiteSpace:"nowrap", lineHeight:1,
                    }}>{lbl}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {corrLabels.map((rowLbl, i) => (
                <tr key={i}>
                  <td style={{
                    fontSize:"0.65rem", fontWeight:700, color: groupOf(i),
                    textAlign:"right", paddingRight:6, whiteSpace:"nowrap",
                    userSelect:"none",
                  }}>{rowLbl}</td>
                  {corrLabels.map((_, j) => {
                    if (j > i) return <td key={j} style={{ width:44, height:34, background:"#0f172a", borderRadius:3 }} />;
                    if (j === i) return (
                      <td key={j} style={{ width:44, height:34, background:"#1e293b", borderRadius:3, textAlign:"center", fontSize:"0.75rem", color:"#334155", fontWeight:700 }}>—</td>
                    );
                    const r = corrMatrix[i][j];
                    const { bg, fg } = corrColor(r);
                    const strong = isStrong(i, j);
                    return (
                      <td key={j}
                        style={{
                          width:44, height:34, background:bg, borderRadius:3,
                          textAlign:"center", fontSize:"0.68rem",
                          fontWeight: strong ? 800 : 400, color: fg,
                          outline: strong ? "2px solid rgba(255,255,255,0.8)" : "none",
                          outlineOffset:-1, cursor: strong ? "pointer" : "default",
                          transition:"transform 0.1s",
                          transform: hovered?.i===i && hovered?.j===j ? "scale(1.2)" : "scale(1)",
                          zIndex: hovered?.i===i && hovered?.j===j ? 10 : 1,
                          position:"relative",
                        }}
                        onMouseEnter={() => setHovered({ i, j, r })}
                        onMouseLeave={() => setHovered(null)}
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

        {/* Side panel */}
        <div style={{ width:200, background:"#1e293b", border:"1px solid #334155", borderRadius:10, padding:"1rem", flexShrink:0 }}>
          {hovered ? (
            <>
              <div style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#475569", marginBottom:"0.6rem" }}>Cell Detail</div>
              <div style={{ fontSize:"1.5rem", fontWeight:800, color:"#f1f5f9", fontFamily:"'Playfair Display',serif", marginBottom:"0.4rem" }}>
                {hovered.r.toFixed(2)}
              </div>
              <div style={{ fontSize:"0.75rem", color:"#94a3b8", lineHeight:1.6 }}>
                <span style={{ color: groupOf(hovered.i), fontWeight:700 }}>{corrLabels[hovered.i]}</span>
                {" × "}
                <span style={{ color: groupOf(hovered.j), fontWeight:700 }}>{corrLabels[hovered.j]}</span>
              </div>
              <div style={{
                marginTop:"0.6rem", padding:"6px 8px", borderRadius:6,
                background:"#0f172a",
                fontSize:"0.72rem",
                color: Math.abs(hovered.r) > 0.60 ? "#fbbf24" : "#475569",
              }}>
                {Math.abs(hovered.r) > 0.60 ? "⚡ Strong correlation" : Math.abs(hovered.r) > 0.30 ? "Moderate" : "Weak / negligible"}
              </div>
            </>
          ) : (
            <div style={{ fontSize:"0.75rem", color:"#334155", textAlign:"center", paddingTop:"1.5rem", lineHeight:1.8 }}>
              Hover any cell<br />for details<br /><br />
              <span style={{ color:"#1e293b" }}>Bold outline = |r| &gt; 0.60</span>
            </div>
          )}
          <div style={{ marginTop:"1.2rem", paddingTop:"1rem", borderTop:"1px solid #334155" }}>
            <div style={{ fontSize:"0.62rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#475569", marginBottom:"0.5rem" }}>Groups</div>
            {[["Demo","#3b82f6"],["Financial","#ef4444"],["Convenience","#f59e0b"],["Environmental","#16a34a"],["Attitudinal","#7c3aed"]].map(([lbl,c]) => (
              <div key={lbl} style={{ display:"flex", alignItems:"center", gap:6, fontSize:"0.68rem", color:"#64748b", marginBottom:4 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:c, flexShrink:0 }} />{lbl}
              </div>
            ))}
          </div>
          <div style={{ marginTop:"0.8rem", height:10, borderRadius:5, background:"linear-gradient(to right,rgb(180,0,0),#fff,rgb(0,130,0))", border:"1px solid #334155" }} />
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.6rem", color:"#475569", marginTop:2 }}>
            <span>−1</span><span>0</span><span>+1</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightsTab() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <SectionTitle sub="Relationships where |r| > 0.60 between construct and demographic questions">Strong Correlation Insights</SectionTitle>
      <div style={{
        padding:"0.8rem 1rem", marginBottom:"1.2rem",
        background:"#1e293b", borderRadius:8, borderLeft:"3px solid #3b82f6",
        fontSize:"0.78rem", color:"#64748b", lineHeight:1.7,
      }}>
        <strong style={{ color:"#94a3b8" }}>Coding note:</strong> Likert items coded 1 = Strongly Agree → 5 = Strongly Disagree.
        Download Intent coded 1 = Definitely Would → 5 = Definitely Would Not.
        A positive r means higher demographic code coincides with higher (less-agreeable) Likert score.
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
        {insights.map((ins, idx) => {
          const isOpen = open === idx;
          const rColor = ins.dir === "+" ? "#22c55e" : "#ef4444";
          return (
            <div key={idx} onClick={() => setOpen(isOpen ? null : idx)}
              style={{
                background:"#1e293b", border:`1px solid ${isOpen ? "#334155" : "#1e293b"}`,
                borderLeft:`4px solid ${rColor}`, borderRadius:10,
                padding:"1rem 1.2rem", cursor:"pointer",
                transition:"all 0.2s",
              }}
            >
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, color:"#f1f5f9", fontSize:"1rem" }}>{ins.pair}</div>
                  <div style={{ fontSize:"0.7rem", color:"#475569", marginTop:2, textTransform:"uppercase", letterSpacing:"0.06em" }}>
                    {ins.dir === "+" ? "Positive correlation" : "Negative correlation"}
                  </div>
                </div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.5rem", fontWeight:800, color:rColor, flexShrink:0, marginLeft:16 }}>
                  r = {ins.r.toFixed(2)}
                </div>
              </div>
              {isOpen && (
                <div style={{ marginTop:"0.9rem", paddingTop:"0.9rem", borderTop:"1px solid #334155" }}>
                  <p style={{ fontSize:"0.85rem", color:"#94a3b8", lineHeight:1.75, margin:0 }}>{ins.text}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────────── */
export default function PantryPalDashboard() {
  const [tab, setTab] = useState(0);

  const TabComponents = [DemographicsTab, ConstructsTab, RelationshipsTab, CorrMatrixTab, InsightsTab];
  const ActiveTab = TabComponents[tab];

  return (
    <div style={{
      minHeight:"100vh", background:"#0f172a", color:"#e2e8f0",
      fontFamily:"'Source Sans 3', 'Georgia', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source+Sans+3:wght@300;400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
      `}</style>

      {/* Header */}
      <div style={{ background:"#0a0f1e", borderBottom:"1px solid #1e293b", padding:"1.5rem 2rem 0" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"1rem" }}>
            <div>
              <div style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#3b82f6", marginBottom:"0.4rem" }}>
                PantryPal · Customer Discovery Survey
              </div>
              <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.6rem,3vw,2.4rem)", fontWeight:800, color:"#f8fafc", letterSpacing:"-0.02em", lineHeight:1.1 }}>
                Survey Analysis Dashboard
              </h1>
              <p style={{ color:"#475569", fontSize:"0.82rem", marginTop:"0.4rem" }}>
                n = 160 respondents · 12 questions · 3 constructs · Pearson correlations
              </p>
            </div>
            <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap", paddingBottom:"0" }}>
              {["🧍 Demographics","📊 Constructs","🔗 Relationships","⬡ Correlation","💡 Insights"].map((t, i) => (
                <button key={i} onClick={() => setTab(i)} style={{
                  padding:"8px 14px", borderRadius:"8px 8px 0 0",
                  border:"1px solid", borderBottom: tab===i ? "1px solid #0a0f1e" : "1px solid #1e293b",
                  borderColor: tab===i ? "#1e293b" : "#1e293b",
                  background: tab===i ? "#0f172a" : "transparent",
                  color: tab===i ? "#f1f5f9" : "#475569",
                  fontSize:"0.78rem", fontWeight:700, cursor:"pointer",
                  transition:"all 0.15s",
                  fontFamily:"'Source Sans 3',sans-serif",
                }}>{t}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"2rem" }}>
        <ActiveTab />
      </div>

      <div style={{ textAlign:"center", padding:"1rem", borderTop:"1px solid #1e293b", fontSize:"0.68rem", color:"#334155", letterSpacing:"0.06em" }}>
        PantryPal Customer Survey · n = 160 · February 2026 · All data simulated for product development purposes
      </div>
    </div>
  );
}