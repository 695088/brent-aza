import { useState } from "react";

const Section = ({ title, children, accent = "#4ade80" }) => (
  <div style={{
    marginBottom: "2.5rem",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "2rem",
    position: "relative",
    overflow: "hidden"
  }}>
    <div style={{
      position: "absolute", top: 0, left: 0, width: "4px", height: "100%",
      background: accent, borderRadius: "16px 0 0 16px"
    }} />
    <h2 style={{
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: "1.4rem", fontWeight: 700,
      color: accent, marginBottom: "1.2rem", letterSpacing: "-0.02em"
    }}>{title}</h2>
    {children}
  </div>
);

const P = ({ children }) => (
  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#cbd5e1", lineHeight: 1.75, marginBottom: "0.75rem" }}>
    {children}
  </p>
);

const Tag = ({ children, color = "#4ade80" }) => (
  <span style={{
    display: "inline-block", padding: "2px 10px", borderRadius: "99px",
    fontSize: "0.75rem", fontWeight: 600, marginRight: "6px", marginBottom: "6px",
    background: color + "22", color: color, border: `1px solid ${color}44`,
    fontFamily: "'DM Sans', sans-serif"
  }}>{children}</span>
);

// Perceptual Map
const PerceptualMap = () => {
  const competitors = [
    { name: "PantryPal", x: 62, y: 75, color: "#4ade80", size: 14 },
    { name: "Yummly", x: 55, y: 40, color: "#f59e0b", size: 10 },
    { name: "Mealime", x: 45, y: 48, color: "#f59e0b", size: 10 },
    { name: "Samsung Fridge", x: 75, y: 25, color: "#94a3b8", size: 10 },
    { name: "Too Good To Go", x: 30, y: 60, color: "#f59e0b", size: 10 },
    { name: "Paprika", x: 38, y: 35, color: "#f59e0b", size: 10 },
  ];

  return (
    <div style={{ marginTop: "1rem" }}>
      <div style={{ position: "relative", width: "100%", maxWidth: 460, margin: "0 auto", aspectRatio: "1/1" }}>
        {/* Grid lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 400 400">
          <line x1="200" y1="0" x2="200" y2="400" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="0" y1="200" x2="400" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4,4" />
          <rect x="1" y="1" width="398" height="398" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" rx="8" />
        </svg>
        {/* Axis labels */}
        <div style={{ position: "absolute", top: "50%", left: 4, transform: "translateY(-50%) rotate(-90deg)", transformOrigin: "left center", fontSize: "0.65rem", color: "#64748b", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", letterSpacing: "0.08em", textTransform: "uppercase" }}>LOW COST ←→ HIGH COST</div>
        <div style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", fontSize: "0.65rem", color: "#64748b", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", letterSpacing: "0.08em", textTransform: "uppercase" }}>BASIC FEATURES ←→ SMART FEATURES</div>
        <div style={{ position: "absolute", top: 4, left: "50%", transform: "translateX(-50%)", fontSize: "0.65rem", color: "#94a3b8", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>HIGH VALUE</div>
        <div style={{ position: "absolute", bottom: 22, right: 4, fontSize: "0.65rem", color: "#64748b", fontFamily: "'DM Sans', sans-serif" }}>LOW VALUE</div>

        {competitors.map((c) => (
          <div key={c.name} style={{
            position: "absolute",
            left: `${c.x}%`, top: `${100 - c.y}%`,
            transform: "translate(-50%, -50%)",
            textAlign: "center"
          }}>
            <div style={{
              width: c.size * 2, height: c.size * 2, borderRadius: "50%",
              background: c.color + "33", border: `2px solid ${c.color}`,
              margin: "0 auto 2px"
            }} />
            <div style={{
              fontSize: "0.6rem", color: c.color, fontFamily: "'DM Sans', sans-serif",
              fontWeight: c.name === "PantryPal" ? 700 : 400,
              whiteSpace: "nowrap"
            }}>{c.name}</div>
          </div>
        ))}
      </div>
      <P>The map plots <strong style={{ color: "#4ade80" }}>Smart Features</strong> (x-axis) vs <strong style={{ color: "#4ade80" }}>Value delivered per dollar</strong> (y-axis). PantryPal occupies the high-value, AI-powered smart features quadrant — a whitespace no current competitor fully owns. Hardware-locked solutions (Samsung) are smart but expensive; meal planners are cheap but lack waste intelligence.</P>
    </div>
  );
};

// SWOT Matrix
const SwotMatrix = () => {
  const cells = [
    {
      label: "Strengths", color: "#4ade80", bg: "#4ade8011",
      items: ["AI-powered recipe engine", "No hardware dependency", "Clear ROI ($1,500/yr saved)", "First-mover in expiration niche", "Barcode + manual entry flexibility"]
    },
    {
      label: "Weaknesses", color: "#f87171", bg: "#f8717111",
      items: ["Manual entry friction risk", "Incomplete barcode databases", "No network effect at launch", "Single revenue stream (freemium)", "Unknown brand equity"]
    },
    {
      label: "Opportunities", color: "#60a5fa", bg: "#60a5fa11",
      items: ["Grocery API auto-sync (Kroger/Instacart)", "B2B analytics for CPG brands", "EU food waste regulations driving demand", "LLM recipe quality improving rapidly", "Subscription + premium tier upsells"]
    },
    {
      label: "Threats", color: "#f59e0b", bg: "#f59e0b11",
      items: ["Google/Apple OS-level integration", "Supermarket apps copying feature", "LLM API cost volatility", "Low willingness-to-pay for savings apps", "User churn if onboarding is clunky"]
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
      {cells.map((cell) => (
        <div key={cell.label} style={{
          background: cell.bg, border: `1px solid ${cell.color}33`,
          borderRadius: "12px", padding: "1.2rem"
        }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: cell.color, fontSize: "1rem", marginBottom: "0.75rem" }}>
            {cell.label}
          </div>
          <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
            {cell.items.map((i) => (
              <li key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#cbd5e1", lineHeight: 1.6, marginBottom: "0.3rem" }}>{i}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// Lean Canvas
const LeanCanvas = () => {
  const blocks = [
    {
      title: "Problem", color: "#f87171",
      content: "Households waste avg. $1,500/yr in food. No simple, affordable tool tracks expiration dates and suggests meals from what's already on hand."
    },
    {
      title: "Solution", color: "#4ade80",
      content: "Barcode/manual pantry logging → expiration alerts → AI meal suggestions ranked by urgency → shopping list + waste cost tracker."
    },
    {
      title: "Unique Value Proposition", color: "#a78bfa",
      content: "\"Stop throwing money in the trash.\" The only app that connects what's in your fridge to what's about to expire and tells you exactly what to cook tonight."
    },
    {
      title: "Unfair Advantage", color: "#f59e0b",
      content: "First-mover in expiration-first meal planning. AI recipe quality improving daily. Grocery API partnerships create a moat no new entrant can replicate quickly."
    },
    {
      title: "Customer Segments", color: "#60a5fa",
      content: "Primary: Budget-conscious households (25–45, families). Secondary: Eco-conscious millennials. Tertiary: Meal preppers and fitness trackers."
    },
    {
      title: "Key Metrics", color: "#34d399",
      content: "DAU/MAU ratio, items logged per user, % meals cooked from suggestions, churn rate, waste $$$ saved per user lifetime."
    },
    {
      title: "Channels", color: "#fb7185",
      content: "SEO content (\"reduce food waste\"), TikTok/Reels demos, food blogger partnerships, App Store/PWA, referral loop (share weekly waste report)."
    },
    {
      title: "Cost Structure", color: "#94a3b8",
      content: "LLM API calls (~$0.02/user/day), Supabase hosting, barcode API (Open Food Facts: free), part-time dev + marketing. Est. burn: $3–5K/month at launch."
    },
    {
      title: "Revenue Streams", color: "#fbbf24",
      content: "Freemium (5 items free) → Pro $4.99/mo (unlimited + AI recipes) → Family $8.99/mo. Year 1 target: 2,000 paid users = ~$120K ARR."
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.9rem" }}>
      {blocks.map((b) => (
        <div key={b.title} style={{
          background: b.color + "0d", border: `1px solid ${b.color}33`,
          borderRadius: "12px", padding: "1.1rem"
        }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: b.color, fontSize: "0.85rem", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{b.title}</div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#cbd5e1", lineHeight: 1.65, margin: 0 }}>{b.content}</p>
        </div>
      ))}
    </div>
  );
};

export default function PantryPalAnalysis() {
  const [tab, setTab] = useState("analysis");

  const tabs = [
    { id: "analysis", label: "Product Analysis" },
    { id: "swot", label: "SWOT" },
    { id: "canvas", label: "Lean Canvas" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0f1e 0%, #0d1a2e 50%, #0a1628 100%)",
      padding: "2rem 1rem",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0f1e; }
        ::-webkit-scrollbar-thumb { background: #4ade8044; border-radius: 3px; }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: "99px", background: "#4ade8011", border: "1px solid #4ade8033", color: "#4ade80", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
          Product Strategy Document
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 900,
          fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "#f0fdf4",
          letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 0.5rem"
        }}>
          Pantry<span style={{ color: "#4ade80" }}>Pal</span>
        </h1>
        <p style={{ color: "#64748b", fontSize: "1rem", fontStyle: "italic" }}>Smart Expiration Tracker & Meal Suggester — Business Analysis</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "8px 20px", borderRadius: "99px", border: "1px solid",
            borderColor: tab === t.id ? "#4ade80" : "rgba(255,255,255,0.1)",
            background: tab === t.id ? "#4ade8022" : "transparent",
            color: tab === t.id ? "#4ade80" : "#94a3b8",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.85rem",
            cursor: "pointer", transition: "all 0.2s"
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* PRODUCT ANALYSIS TAB */}
        {tab === "analysis" && (
          <>
            <Section title="Sustainable Competitive Advantages" accent="#4ade80">
              <P>PantryPal's most durable advantage is its <strong style={{ color: "#4ade80" }}>data flywheel</strong>: every item logged, every meal cooked, and every waste event recorded makes the recommendation engine smarter and more personalized. Over time, this behavioral dataset becomes a moat no new entrant can quickly replicate. The product is also platform-agnostic — it runs as a PWA requiring no hardware purchase, which eliminates the friction barrier that keeps smart-fridge features accessible only to high-income households.</P>
              <P>A second structural advantage is the <strong style={{ color: "#4ade80" }}>grocery API integration roadmap</strong>. Once PantryPal connects to Kroger, Instacart, or Walmart Grocery, it auto-populates a user's pantry from purchase history — solving the #1 churn driver (manual entry) in a way that cannot be replicated without negotiated API partnerships. These integrations, once established, create switching costs for both users and retail partners.</P>
              <P>Finally, the <strong style={{ color: "#4ade80" }}>expiration-first framing</strong> is a unique positioning wedge. Competitors approach the space from recipe inspiration (Yummly) or grocery management (OurGroceries). PantryPal's urgency-ranked meal engine — "cook the chicken before Friday or lose $12" — creates a behavioral hook rooted in loss aversion psychology that generic meal planners cannot replicate without a full product rebuild.</P>
            </Section>

            <Section title="Revenue & Market Estimates" accent="#60a5fa">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginBottom: "1rem" }}>
                {[
                  { label: "US Addressable Market", value: "~48M", sub: "households w/ food waste concern" },
                  { label: "Year 1 Target (Paid)", value: "2,000", sub: "users @ avg $6.50/mo" },
                  { label: "Year 1 ARR Target", value: "$156K", sub: "freemium → Pro/Family conversion" },
                ].map((s) => (
                  <div key={s.label} style={{ background: "#60a5fa11", border: "1px solid #60a5fa22", borderRadius: "12px", padding: "1rem", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: "#60a5fa" }}>{s.value}</div>
                    <div style={{ fontSize: "0.7rem", color: "#94a3b8", marginTop: "4px" }}>{s.label}</div>
                    <div style={{ fontSize: "0.68rem", color: "#64748b", marginTop: "2px", fontStyle: "italic" }}>{s.sub}</div>
                  </div>
                ))}
              </div>
              <P>At a modest 0.004% penetration of the addressable market in Year 1, and assuming a 15% free-to-paid conversion rate with 5% monthly churn, the model yields approximately $156K ARR by month 12. Year 3 projections at 0.1% penetration suggest $3–5M ARR — a viable acquisition target for a grocery platform or a sustainable bootstrapped business.</P>
            </Section>

            <Section title="Target Markets" accent="#a78bfa">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <Tag color="#a78bfa">Families (25–45)</Tag>
                <Tag color="#a78bfa">Eco-Conscious Millennials</Tag>
                <Tag color="#a78bfa">Meal Preppers</Tag>
                <Tag color="#a78bfa">Budget-Constrained Households</Tag>
                <Tag color="#a78bfa">Urban Renters</Tag>
              </div>
              <P><strong style={{ color: "#a78bfa" }}>Primary:</strong> Budget-conscious families aged 25–45 with children, grocery spending of $600+/month, and high sensitivity to food cost inflation. These users have the highest dollar-value waste and the strongest motivation to change behavior.</P>
              <P><strong style={{ color: "#a78bfa" }}>Secondary:</strong> Eco-conscious millennials (22–35) motivated by sustainability rather than pure cost savings — responsive to waste-reduction social features and shareable "impact" metrics.</P>
              <P><strong style={{ color: "#a78bfa" }}>Tertiary:</strong> Fitness and meal preppers already disciplined about tracking macros and ingredients, for whom pantry management is a natural adjacent behavior.</P>
            </Section>

            <Section title="Competitive Landscape" accent="#f59e0b">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "0.75rem", marginBottom: "1rem" }}>
                {[
                  { name: "Yummly", desc: "Recipe discovery, owned by Whirlpool. Strong recipe database but zero expiration tracking. Requires hardware for inventory.", threat: "Medium" },
                  { name: "Mealime", desc: "Clean meal planning UX, popular with families. No pantry tracking, no waste intelligence.", threat: "Medium" },
                  { name: "Samsung SmartThings", desc: "Built-in fridge inventory for $3,000+ appliances. Powerful but locked to hardware ecosystem.", threat: "Low" },
                  { name: "Too Good To Go", desc: "Surplus food marketplace. Adjacent space, different model. Brand recognition in sustainability.", threat: "Low" },
                ].map((c) => (
                  <div key={c.name} style={{ background: "#f59e0b0a", border: "1px solid #f59e0b22", borderRadius: "10px", padding: "0.9rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                      <span style={{ fontWeight: 700, color: "#f0fdf4", fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif" }}>{c.name}</span>
                      <Tag color={c.threat === "Medium" ? "#f59e0b" : "#4ade80"}>Threat: {c.threat}</Tag>
                    </div>
                    <p style={{ fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.55, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Value/Cost Matrix & Perceptual Map" accent="#34d399">
              <P>On a value/cost matrix, PantryPal sits in the <strong style={{ color: "#34d399" }}>High Value / Low Cost</strong> quadrant. At $4.99–$8.99/month, it underprices hardware-dependent smart home solutions by 10–20x while delivering comparable or superior utility for the pantry waste use case. Against free apps like Paprika, it offers measurably higher value through AI-powered waste reduction that pays for itself within a single grocery cycle.</P>
              <PerceptualMap />
            </Section>
          </>
        )}

        {/* SWOT TAB */}
        {tab === "swot" && (
          <>
            <Section title="SWOT Matrix" accent="#4ade80">
              <SwotMatrix />
            </Section>
            <Section title="SWOT Written Analysis" accent="#60a5fa">
              <P>PantryPal enters the food tech market from a position of meaningful structural strength. Its clearest advantage is a tangible, quantifiable value proposition: the average U.S. household wastes over $1,500 in food annually, and PantryPal directly attacks that number. Unlike aspirational wellness apps where outcomes are diffuse, this product can show users a running dollar figure of money saved — a powerful retention mechanic grounded in behavioral economics and loss aversion.</P>
              <P>The product's core weakness is the cold-start problem inherent to any pantry tracker. Users must manually log items before the system can deliver value, and early friction is the primary driver of churn in this category. This is not an unsolvable problem — barcode scanning, smart onboarding, and eventual grocery receipt/API auto-import all reduce the burden — but it requires deliberate product investment and cannot be papered over with marketing alone.</P>
              <P>The opportunity landscape is genuinely compelling. Grocery API partnerships represent a potential step-change in retention by eliminating manual entry entirely. The B2B angle — selling aggregate waste analytics to CPG brands eager to understand shelf-life behavior and purchase patterns — could ultimately dwarf consumer subscription revenue. Additionally, growing regulatory pressure in the EU and increasing ESG commitments from grocery retailers create institutional tailwinds that could accelerate enterprise adoption.</P>
              <P>The most credible external threat is platform commoditization. Google's Gemini and Apple's Siri are natural surfaces for pantry reminders, and a first-party OS integration could undercut the standalone app's reason to exist. The strategic defense is depth: a rich behavioral dataset, established grocery API partnerships, and a social/community layer create lock-in that a generic assistant feature cannot replicate. Speed of execution in Year 1 is therefore critical — the goal is to establish data and partnership moats before a platform giant decides the category is worth owning.</P>
            </Section>
          </>
        )}

        {/* LEAN CANVAS TAB */}
        {tab === "canvas" && (
          <Section title="Lean Canvas — PantryPal" accent="#a78bfa">
            <LeanCanvas />
            <div style={{ marginTop: "1.2rem" }}>
              <P>The Lean Canvas surfaces PantryPal's tightest strategic tension: the <strong style={{ color: "#a78bfa" }}>Problem</strong> is universally experienced but the <strong style={{ color: "#a78bfa" }}>Solution</strong> requires behavior change to activate. The Unfair Advantage — an AI engine that improves with use and grocery API integrations that eliminate friction — is the linchpin. If achieved, it turns a utility app into a platform. Revenue projections are conservative and achievable with a lean two-person team operating under $5K/month burn in Year 1.</P>
            </div>
          </Section>
        )}
      </div>

      <div style={{ textAlign: "center", marginTop: "3rem", color: "#334155", fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif" }}>
        PantryPal — Product Strategy Document · February 2026
      </div>
    </div>
  );
}