import React, { useState, useEffect, useRef } from "react";

const COLORS = {
  navy: "#0B1F3A",
  navyLight: "#13315C",
  accent: "#FF6B35",
  accentDark: "#E1541F",
  sky: "#1BA3C6",
  light: "#F5F8FB",
};

const IMAGES = [
  "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1583845112203-29329902332e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1574359411659-15573a27fd0c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80",
];

const PHONE = "(203) 793-6369";
const PHONE_HREF = "tel:+12037936369";

/* ---------- Scroll reveal hook ---------- */
function useReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(node);
        }
      },
      { threshold: options.threshold || 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [options.threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, y = 40, className = "", as: Tag = "div" }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `translateY(${y}px)`,
        transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

/* ---------- Particles ---------- */
function Droplets() {
  const drops = React.useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 3 + Math.random() * 7,
        delay: Math.random() * 8,
        dur: 7 + Math.random() * 8,
        op: 0.08 + Math.random() * 0.22,
      })),
    []
  );
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {drops.map((d) => (
        <span
          key={d.id}
          style={{
            position: "absolute",
            left: `${d.left}%`,
            top: "-10%",
            width: d.size,
            height: d.size * 1.5,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            background: `rgba(120,200,255,${d.op})`,
            filter: "blur(0.4px)",
            animation: `dpFall ${d.dur}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Icons ---------- */
const Icon = ({ path, size = 28, color = COLORS.accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const ICONS = {
  drip: <><path d="M12 2s6 7.5 6 12a6 6 0 0 1-12 0c0-4.5 6-12 6-12z" /></>,
  wrench: <><path d="M14.7 6.3a4 4 0 1 0 5 5L21 21l-3-.5-9.5-9.5a4 4 0 0 1-5-5L6 3l4 4 2-2-4-4z" /></>,
  heater: <><rect x="4" y="3" width="16" height="18" rx="3" /><path d="M8 8h8M8 12h8M9 17h6" /></>,
  drain: <><circle cx="12" cy="12" r="8" /><path d="M8 12h8M12 8v8" /></>,
  sewer: <><path d="M3 12h4l3-7 4 14 3-7h4" /></>,
  bath: <><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3z" /><path d="M6 12V6a2 2 0 0 1 4 0" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" /></>,
  star: <><path d="M12 3l2.9 5.9 6.1.9-4.4 4.3 1 6.1L12 17.8 6.4 20.2l1-6.1L3 9.8l6.1-.9L12 3z" /></>,
  badge: <><circle cx="12" cy="9" r="6" /><path d="M8.5 14L7 22l5-3 5 3-1.5-8" /></>,
  phone: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" /></>,
  pin: <><path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  dollar: <><path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
  truck: <><path d="M3 16V6h11v10M14 9h4l3 3v4h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
};

/* ---------- Data ---------- */
const SERVICES = [
  { icon: ICONS.drip, title: "Emergency Leak Repair", desc: "Burst pipes and hidden leaks stopped fast — 24/7, any day of the year. We arrive prepared to fix it on the first visit.", img: IMAGES[0] },
  { icon: ICONS.drain, title: "Drain Cleaning & Clogs", desc: "Kitchen, bath, or main line — powerful snaking and hydro-jetting that clears the blockage and keeps it clear.", img: IMAGES[1] },
  { icon: ICONS.heater, title: "Water Heater Service", desc: "Repair, replacement, and tankless upgrades. Hot water restored the same day in most Danbury homes.", img: IMAGES[2] },
  { icon: ICONS.wrench, title: "Pipe Repair & Repiping", desc: "Copper, PEX, and cast iron. From a single fitting to a whole-home repipe, done clean and to code.", img: IMAGES[3] },
  { icon: ICONS.bath, title: "Bath & Kitchen Fixtures", desc: "Faucets, toilets, sinks, showers and garbage disposals installed right the first time.", img: IMAGES[4] },
  { icon: ICONS.sewer, title: "Sewer & Main Line", desc: "Camera inspection, root removal, and trenchless options for the problems you can't see.", img: IMAGES[5] },
];

const WHY = [
  { icon: ICONS.clock, title: "Truly 24/7", desc: "Open 24 hours, 7 days a week. Real plumbers answer — no voicemail roulette at 2 AM." },
  { icon: ICONS.star, title: "Perfect 5.0 Rating", desc: "13 out of 13 customers rated us 5 stars. Not an accident — it's the standard." },
  { icon: ICONS.dollar, title: "Upfront Flat Pricing", desc: "You approve the price before we touch a wrench. No surprise line items, ever." },
  { icon: ICONS.shield, title: "Licensed & Insured", desc: "Fully licensed Connecticut plumbers. Every job backed by our workmanship guarantee." },
  { icon: ICONS.truck, title: "Stocked Trucks", desc: "We carry the common parts, so most repairs finish in one visit — not three." },
  { icon: ICONS.badge, title: "Local to Danbury", desc: "Right on Main Street. We know the old pipes, the hard water, and the town code." },
];

const TESTIMONIALS = [
  { name: "Marcus D.", role: "Homeowner · Danbury", text: "Called at 11 PM with water pouring through the kitchen ceiling. They picked up immediately and had someone here inside the hour. Calm, clean, and the price was exactly what they quoted. Lifesavers.", stars: 5 },
  { name: "Elena R.", role: "Homeowner · Danbury", text: "Our water heater died on a Sunday. Replaced the same day with a better unit than we expected and they hauled the old one away. Genuinely the easiest contractor experience we've had.", stars: 5 },
  { name: "Tom B.", role: "Property Manager", text: "I manage six buildings in the area and they're the only plumber I call now. Reliable, fair, and they explain everything to tenants without any drama. Five stars is earned.", stars: 5 },
  { name: "Priya S.", role: "Homeowner · Danbury", text: "Main line backed up twice last year with another company. These guys camera'd the line, found the root intrusion, and fixed it properly. Zero problems since.", stars: 5 },
  { name: "Greg A.", role: "Restaurant Owner", text: "Grease clog on a Friday night with a full dining room. They cleared it in under an hour and never made a mess in the kitchen. Absolute professionals.", stars: 5 },
];

const STATS = [
  { num: "5.0", label: "Star Rating" },
  { num: "24/7", label: "Always Open" },
  { num: "13", label: "5-Star Reviews" },
  { num: "1hr", label: "Avg. Response" },
];

const PORTFOLIO = [
  { img: IMAGES[6], tag: "Repipe", title: "Full Copper-to-PEX Repipe", meta: "Colonial home · Main St area · 2 days" },
  { img: IMAGES[7], tag: "Water Heater", title: "Tankless System Upgrade", meta: "Endless hot water · Same-day install" },
  { img: IMAGES[8], tag: "Remodel", title: "Master Bath Rough-In", meta: "New fixtures + drain relocation" },
  { img: IMAGES[9], tag: "Emergency", title: "Burst Main Line Repair", meta: "Called 1 AM · Water on by 3 AM" },
  { img: IMAGES[1], tag: "Drain", title: "Hydro-Jet Sewer Clearing", meta: "Root intrusion removed · Camera verified" },
  { img: IMAGES[4], tag: "Kitchen", title: "Sink, Disposal & Faucet Set", meta: "Complete under-sink rebuild" },
];

const FAQ = [
  { q: "Do you really answer at 3 in the morning?", a: "Yes. We are open 24 hours a day, every day of the week including holidays. Call (203) 793-6369 any time and you'll reach a real person who can dispatch a plumber." },
  { q: "How much will my repair cost?", a: "We give you a flat, upfront price before any work begins. You approve it first — there are no hourly surprises and no hidden fees added at the end." },
  { q: "What areas do you serve?", a: "Danbury and the surrounding Fairfield County communities — including Bethel, Brookfield, New Fairfield, Ridgefield, Newtown and Redding." },
  { q: "Are you licensed and insured?", a: "Absolutely. We're fully licensed Connecticut plumbers and carry full liability insurance. Our workmanship is guaranteed." },
  { q: "Can you handle both homes and businesses?", a: "Yes. We service single-family homes, condos, multi-family buildings, restaurants, and commercial properties throughout the Danbury area." },
];

/* ---------- Components ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    ["Services", "services"],
    ["Why Us", "why"],
    ["Work", "work"],
    ["Reviews", "reviews"],
    ["About", "about"],
    ["Contact", "contact"],
  ];
  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
  };
  return (
    <>
      <div style={{ background: COLORS.accent, color: "#fff", textAlign: "center", fontSize: 13, padding: "7px 12px", fontWeight: 700, letterSpacing: ".02em", position: "relative", zIndex: 60 }}>
        24/7 EMERGENCY PLUMBING IN DANBURY — CALL {PHONE} NOW
      </div>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: scrolled ? "rgba(11,31,58,.97)" : "rgba(11,31,58,.82)",
          backdropFilter: "blur(14px)",
          borderBottom: `1px solid rgba(255,255,255,${scrolled ? 0.12 : 0.06})`,
          transition: "all .35s ease",
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 20px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`, display: "grid", placeItems: "center", boxShadow: "0 6px 18px rgba(255,107,53,.35)" }}>
              <Icon path={ICONS.drip} size={20} color="#fff" />
            </div>
            <div style={{ lineHeight: 1.05 }}>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 17, letterSpacing: "-.02em" }}>Danbury Plumber</div>
              <div style={{ color: "rgba(255,255,255,.55)", fontSize: 10.5, letterSpacing: ".14em", fontWeight: 600 }}>LICENSED · 24/7 · CT</div>
            </div>
          </div>

          <nav className="dp-desktop" style={{ display: "flex", gap: 26, alignItems: "center" }}>
            {links.map(([l, id]) => (
              <button key={id} onClick={() => go(id)} className="dp-link" style={{ background: "none", border: "none", color: "rgba(255,255,255,.78)", fontSize: 14, fontWeight: 600, cursor: "pointer", padding: "6px 0", position: "relative" }}>
                {l}
              </button>
            ))}
            <a href={PHONE_HREF} className="dp-cta" style={{ display: "flex", alignItems: "center", gap: 8, background: COLORS.accent, color: "#fff", padding: "11px 20px", borderRadius: 999, fontWeight: 800, fontSize: 14, textDecoration: "none", boxShadow: "0 8px 22px rgba(255,107,53,.4)" }}>
              <Icon path={ICONS.phone} size={16} color="#fff" /> {PHONE}
            </a>
          </nav>

          <button className="dp-mobile" onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", display: "none", padding: 6 }} aria-label="Menu">
            <div style={{ width: 24, height: 2, background: "#fff", marginBottom: 6, transition: ".3s", transform: open ? "rotate(45deg) translate(5px,6px)" : "none" }} />
            <div style={{ width: 24, height: 2, background: "#fff", marginBottom: 6, opacity: open ? 0 : 1, transition: ".3s" }} />
            <div style={{ width: 24, height: 2, background: "#fff", transition: ".3s", transform: open ? "rotate(-45deg) translate(5px,-6px)" : "none" }} />
          </button>
        </div>

        <div style={{ maxHeight: open ? 420 : 0, overflow: "hidden", transition: "max-height .4s ease", background: COLORS.navy }}>
          <div style={{ padding: "8px 20px 20px", display: "flex", flexDirection: "column", gap: 2 }}>
            {links.map(([l, id]) => (
              <button key={id} onClick={() => go(id)} style={{ background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,.08)", color: "#fff", fontSize: 15, fontWeight: 600, padding: "14px 0", textAlign: "left", cursor: "pointer" }}>
                {l}
              </button>
            ))}
            <a href={PHONE_HREF} style={{ marginTop: 14, background: COLORS.accent, color: "#fff", padding: "14px", borderRadius: 12, fontWeight: 800, textAlign: "center", textDecoration: "none" }}>
              Call {PHONE}
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);
  const a = (d) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "none" : "translateY(28px) scale(.98)",
    transition: `opacity .9s cubic-bezier(.22,1,.36,1) ${d}ms, transform .9s cubic-bezier(.22,1,.36,1) ${d}ms`,
  });
  return (
    <section id="home" style={{ position: "relative", background: COLORS.navy, overflow: "hidden", color: "#fff" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMAGES[0]})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.22, transform: loaded ? "scale(1)" : "scale(1.12)", transition: "transform 2.2s cubic-bezier(.22,1,.36,1)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(105deg, ${COLORS.navy} 18%, rgba(11,31,58,.92) 48%, rgba(11,31,58,.55) 100%)` }} />
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.sky}33, transparent 68%)`, top: -180, right: -120, animation: "dpPulse 9s ease-in-out infinite" }} />
      <Droplets />

      <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "clamp(70px,10vw,130px) 20px clamp(80px,9vw,120px)" }}>
        <div style={{ maxWidth: 760 }}>
          <div style={{ ...a(0), display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,.09)", border: "1px solid rgba(255,255,255,.18)", padding: "8px 16px", borderRadius: 999, fontSize: 13, fontWeight: 700, marginBottom: 26 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 0 0 rgba(74,222,128,.7)", animation: "dpBlink 2s infinite" }} />
            Open Now · 24 Hours · Danbury, CT
          </div>

          <h1 style={{ ...a(100), fontSize: "clamp(2.4rem,6.2vw,4.5rem)", lineHeight: 1.04, fontWeight: 900, letterSpacing: "-.035em", margin: "0 0 22px" }}>
            Leak, Clog or No Hot Water?
            <br />
            <span style={{ background: `linear-gradient(100deg, ${COLORS.accent}, #FFB088)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              We're On The Way.
            </span>
          </h1>

          <p style={{ ...a(200), fontSize: "clamp(1.02rem,2vw,1.22rem)", color: "rgba(255,255,255,.78)", lineHeight: 1.65, maxWidth: 580, margin: "0 0 34px" }}>
            Danbury's 5.0-star plumbing team — answering the phone 24 hours a day, quoting flat prices upfront, and fixing it right the first time. Licensed, insured, and local to Main Street.
          </p>

          <div style={{ ...a(300), display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 44 }}>
            <a href={PHONE_HREF} className="dp-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 11, background: COLORS.accent, color: "#fff", padding: "17px 32px", borderRadius: 14, fontWeight: 800, fontSize: 16.5, textDecoration: "none", boxShadow: "0 14px 36px rgba(255,107,53,.42)" }}>
              <Icon path={ICONS.phone} size={19} color="#fff" /> Call {PHONE}
            </a>
            <button
              onClick={() => { const e = document.getElementById("contact"); if (e) window.scrollTo({ top: e.offsetTop - 70, behavior: "smooth" }); }}
              className="dp-btn-ghost"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,.07)", color: "#fff", border: "1.5px solid rgba(255,255,255,.28)", padding: "17px 32px", borderRadius: 14, fontWeight: 700, fontSize: 16.5, cursor: "pointer" }}
            >
              Request Service →
            </button>
          </div>

          <div style={{ ...a(420), display: "flex", flexWrap: "wrap", gap: "14px 34px" }}>
            {[
              [ICONS.star, "5.0 Rating · 13 Reviews"],
              [ICONS.shield, "Licensed & Insured"],
              [ICONS.dollar, "Upfront Flat Pricing"],
            ].map(([ic, t]) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,.85)" }}>
                <Icon path={ic} size={18} color={COLORS.sky} /> {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: "relative", background: "rgba(255,255,255,.055)", borderTop: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))" }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ ...a(520 + i * 90), padding: "26px 10px", textAlign: "center", borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,.08)" : "none" }}>
              <div style={{ fontSize: "clamp(1.7rem,3.4vw,2.3rem)", fontWeight: 900, color: COLORS.accent, letterSpacing: "-.03em" }}>{s.num}</div>
              <div style={{ fontSize: 12, letterSpacing: ".1em", color: "rgba(255,255,255,.6)", fontWeight: 700, marginTop: 4 }}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHead({ kicker, title, sub, light }) {
  return (
    <Reveal>
      <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 54px" }}>
        <div style={{ display: "inline-block", fontSize: 12.5, fontWeight: 800, letterSpacing: ".18em", color: COLORS.accent, marginBottom: 14 }}>{kicker}</div>
        <h2 style={{ fontSize: "clamp(1.9rem,4.4vw,3rem)", fontWeight: 900, letterSpacing: "-.03em", lineHeight: 1.12, margin: "0 0 16px", color: light ? "#fff" : COLORS.navy }}>{title}</h2>
        {sub && <p style={{ fontSize: "clamp(1rem,1.7vw,1.1rem)", lineHeight: 1.7, color: light ? "rgba(255,255,255,.72)" : "#5A6B80", margin: 0 }}>{sub}</p>}
      </div>
    </Reveal>
  );
}

function Services() {
  return (
    <section id="services" style={{ background: COLORS.light, padding: "clamp(70px,9vw,110px) 20px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <SectionHead kicker="WHAT WE DO" title="Every Plumbing Problem. One Phone Call." sub="Residential and commercial plumbing across Danbury and Fairfield County — handled by licensed pros with fully stocked trucks." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))", gap: 24 }}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <div className="dp-card" style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #E4EBF2", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ height: 178, overflow: "hidden", position: "relative" }}>
                  <img src={s.img} alt={s.title} loading="lazy" className="dp-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,31,58,.55), transparent 55%)" }} />
                  <div style={{ position: "absolute", left: 18, bottom: 18, width: 46, height: 46, borderRadius: 13, background: "#fff", display: "grid", placeItems: "center", boxShadow: "0 8px 20px rgba(0,0,0,.18)" }}>
                    <Icon path={s.icon} size={24} />
                  </div>
                </div>
                <div style={{ padding: "22px 24px 26px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontSize: 19.5, fontWeight: 800, color: COLORS.navy, margin: "0 0 10px", letterSpacing: "-.02em" }}>{s.title}</h3>
                  <p style={{ fontSize: 14.8, lineHeight: 1.66, color: "#5A6B80", margin: "0 0 18px", flex: 1 }}>{s.desc}</p>
                  <a href={PHONE_HREF} className="dp-arrow" style={{ display: "inline-flex", alignItems: "center", gap: 7, color: COLORS.accent, fontWeight: 800, fontSize: 14.5, textDecoration: "none" }}>
                    Get a Free Quote <span className="dp-arrow-i" style={{ display: "inline-block", transition: "transform .3s" }}>→</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section id="why" style={{ background: COLORS.navy, padding: "clamp(70px,9vw,110px) 20px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.sky}22, transparent 70%)`, bottom: -300, left: -200 }} />
      <div style={{ maxWidth: 1240, margin: "0 auto", position: "relative" }}>
        <SectionHead light kicker="WHY DANBURY CALLS US" title="A Perfect 5.0 Isn't Luck. It's The Process." sub="Thirteen reviews. Thirteen five-star ratings. Here's exactly what earns that every single time." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <div className="dp-glass" style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 18, padding: "30px 26px", height: "100%" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`, display: "grid", placeItems: "center", marginBottom: 18, boxShadow: "0 10px 24px rgba(255,107,53,.3)" }}>
                  <Icon path={w.icon} size={25} color="#fff" />
                </div>
                <h3 style={{ color: "#fff", fontSize: 18.5, fontWeight: 800, margin: "0 0 10px", letterSpacing: "-.02em" }}>{w.title}</h3>
                <p style={{ color: "rgba(255,255,255,.7)", fontSize: 14.7, lineHeight: 1.68, margin: 0 }}>{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div style={{ marginTop: 56, background: `linear-gradient(115deg, ${COLORS.accent}, ${COLORS.accentDark})`, borderRadius: 24, padding: "clamp(34px,5vw,52px)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 26, boxShadow: "0 24px 60px rgba(255,107,53,.28)" }}>
            <div style={{ minWidth: 260, flex: 1 }}>
              <h3 style={{ color: "#fff", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 900, margin: "0 0 10px", letterSpacing: "-.025em" }}>Water where it shouldn't be? Don't wait.</h3>
              <p style={{ color: "rgba(255,255,255,.9)", fontSize: 16, margin: 0, lineHeight: 1.6 }}>We're open right now. Real plumbers, real answers, no answering service.</p>
            </div>
            <a href={PHONE_HREF} className="dp-btn-white" style={{ display: "inline-flex", alignItems: "center", gap: 11, background: "#fff", color: COLORS.navy, padding: "18px 34px", borderRadius: 14, fontWeight: 900, fontSize: 17, textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 10px 30px rgba(0,0,0,.18)" }}>
              <Icon path={ICONS.phone} size={19} color={COLORS.navy} /> {PHONE}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState("All");
  const tags = ["All", ...Array.from(new Set(PORTFOLIO.map((p) => p.tag)))];
  const shown = filter === "All" ? PORTFOLIO : PORTFOLIO.filter((p) => p.tag === filter);
  return (
    <section id="work" style={{ background: "#fff", padding: "clamp(70px,9vw,110px) 20px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <SectionHead kicker="RECENT WORK" title="Real Jobs, Around The Corner" sub="A look at projects completed for homeowners and businesses right here in the Danbury area." />
        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 38 }}>
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                style={{
                  padding: "9px 20px",
                  borderRadius: 999,
                  border: `1.5px solid ${filter === t ? COLORS.accent : "#DDE5EE"}`,
                  background: filter === t ? COLORS.accent : "#fff",
                  color: filter === t ? "#fff" : COLORS.navy,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "all .25s",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 22 }}>
          {shown.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="dp-port" style={{ position: "relative", borderRadius: 20, overflow: "hidden", height: 300, cursor: "pointer" }}>
                <img src={p.img} alt={p.title} loading="lazy" className="dp-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,31,58,.93) 8%, rgba(11,31,58,.25) 55%, transparent)" }} />
                <div style={{ position: "absolute", top: 16, left: 16, background: COLORS.accent, color: "#fff", fontSize: 11.5, fontWeight: 800, letterSpacing: ".08em", padding: "6px 13px", borderRadius: 999 }}>{p.tag.toUpperCase()}</div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "22px 24px" }}>
                  <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: "0 0 6px", letterSpacing: "-.02em" }}>{p.title}</h3>
                  <p style={{ color: "rgba(255,255,255,.72)", fontSize: 14, margin: 0 }}>{p.meta}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 5200);
    return () => clearInterval(t);
  }, [paused]);
  return (
    <section
      id="reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ background: COLORS.light, padding: "clamp(70px,9vw,110px) 20px", overflow: "hidden" }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionHead kicker="CUSTOMER REVIEWS" title="13 Reviews. 13 Five-Star Ratings." sub="Our neighbors in Danbury say it better than we ever could." />
        <Reveal>
          <div style={{ position: "relative", background: "#fff", borderRadius: 24, border: "1px solid #E4EBF2", boxShadow: "0 24px 60px rgba(11,31,58,.09)", overflow: "hidden" }}>
            <div style={{ display: "flex", transition: "transform .7s cubic-bezier(.22,1,.36,1)", transform: `translateX(-${idx * 100}%)` }}>
              {TESTIMONIALS.map((t) => (
                <div key={t.name} style={{ minWidth: "100%", padding: "clamp(34px,5vw,58px)", boxSizing: "border-box", textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 22 }}>
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="#FFB800">
                        <path d="M12 3l2.9 5.9 6.1.9-4.4 4.3 1 6.1L12 17.8 6.4 20.2l1-6.1L3 9.8l6.1-.9L12 3z" />
                      </svg>
                    ))}
                  </div>
                  <p style={{ fontSize: "clamp(1.05rem,2.2vw,1.35rem)", lineHeight: 1.72, color: COLORS.navy, fontWeight: 500, margin: "0 0 28px", maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
                    “{t.text}”
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 13 }}>
                    <div style={{ width: 46, height: 46, borderRadius: "50%", background: `linear-gradient(135deg,${COLORS.navyLight},${COLORS.sky})`, color: "#fff", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 17 }}>
                      {t.name[0]}
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontWeight: 800, color: COLORS.navy, fontSize: 15.5 }}>{t.name}</div>
                      <div style={{ color: "#7B8CA0", fontSize: 13.5 }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 9, paddingBottom: 28 }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Review ${i + 1}`}
                  style={{ width: i === idx ? 30 : 9, height: 9, borderRadius: 999, border: "none", background: i === idx ? COLORS.accent : "#D3DEE9", cursor: "pointer", transition: "all .35s" }}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div style={{ marginTop: 34, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
            {["Google Verified", "5.0 Average", "100% Recommend"].map((b) => (
              <div key={b} style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #E4EBF2", padding: "11px 20px", borderRadius: 999, fontWeight: 700, fontSize: 14, color: COLORS.navy }}>
                <Icon path={ICONS.shield} size={17} color={COLORS.sky} /> {b}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ background: "#fff", padding: "clamp(70px,9vw,110px) 20px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(330px,1fr))", gap: "clamp(34px,5vw,64px)", alignItems: "center" }}>
        <Reveal>
          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: 22, overflow: "hidden", boxShadow: "0 26px 60px rgba(11,31,58,.18)" }}>
              <img src={IMAGES[3]} alt="Danbury Plumber team at work" loading="lazy" style={{ width: "100%", height: 460, objectFit: "cover", display: "block" }} />
            </div>
            <div className="dp-float" style={{ position: "absolute", right: -14, bottom: -22, background: COLORS.navy, color: "#fff", padding: "22px 26px", borderRadius: 18, boxShadow: "0 18px 40px rgba(11,31,58,.3)", maxWidth: 210 }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: COLORS.accent, lineHeight: 1 }}>5.0★</div>
              <div style={{ fontSize: 13.5, color: "rgba(255,255,255,.75)", marginTop: 7, lineHeight: 1.5 }}>Perfect rating from every customer who reviewed us.</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: ".18em", color: COLORS.accent, marginBottom: 14 }}>ABOUT US</div>
            <h2 style={{ fontSize: "clamp(1.9rem,4.2vw,2.9rem)", fontWeight: 900, letterSpacing: "-.03em", lineHeight: 1.12, color: COLORS.navy, margin: "0 0 20px" }}>
              Your Neighbors on Main Street — Ready Around The Clock
            </h2>
            <p style={{ fontSize: 16.2, lineHeight: 1.78, color: "#5A6B80", margin: "0 0 18px" }}>
              Danbury Plumber was built on a simple idea: plumbing emergencies don't respect business hours, so neither do we. Based at 241 Main Street, our licensed technicians serve Danbury and the surrounding Fairfield County towns 24 hours a day, every day of the year.
            </p>
            <p style={{ fontSize: 16.2, lineHeight: 1.78, color: "#5A6B80", margin: "0 0 28px" }}>
              We know these houses — the century-old cast iron, the hard water, the additions with three generations of patchwork pipe. That local knowledge means faster diagnoses, honest recommendations, and repairs that actually last. Every technician shows up in uniform, protects your floors, explains the fix in plain English, and leaves the space cleaner than they found it.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 16, marginBottom: 32 }}>
              {[
                ["Licensed CT Plumbers", ICONS.badge],
                ["Fully Insured Crews", ICONS.shield],
                ["Flat, Upfront Pricing", ICONS.dollar],
                ["Clean, Respectful Work", ICONS.star],
              ].map(([t, ic]) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 11, background: COLORS.light, padding: "14px 16px", borderRadius: 13 }}>
                  <Icon path={ic} size={20} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy }}>{t}</span>
                </div>
              ))}
            </div>
            <a href={PHONE_HREF} className="dp-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: COLORS.navy, color: "#fff", padding: "16px 30px", borderRadius: 13, fontWeight: 800, fontSize: 16, textDecoration: "none" }}>
              <Icon path={ICONS.phone} size={18} color="#fff" /> Talk To A Plumber Now
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section style={{ background: COLORS.light, padding: "clamp(70px,9vw,110px) 20px" }}>
      <div style={{ maxWidth: 840, margin: "0 auto" }}>
        <SectionHead kicker="QUESTIONS" title="Good To Know" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <div style={{ background: "#fff", border: `1px solid ${open === i ? COLORS.accent + "66" : "#E4EBF2"}`, borderRadius: 15, overflow: "hidden", transition: "border-color .3s" }}>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  style={{ width: "100%", background: "none", border: "none", padding: "20px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, cursor: "pointer", textAlign: "left" }}
                >
                  <span style={{ fontSize: 16.2, fontWeight: 700, color: COLORS.navy }}>{f.q}</span>
                  <span style={{ fontSize: 24, color: COLORS.accent, transition: "transform .3s", transform: open === i ? "rotate(45deg)" : "none", lineHeight: 1 }}>+</span>
                </button>
                <div style={{ maxHeight: open === i ? 260 : 0, overflow: "hidden", transition: "max-height .4s ease" }}>
                  <p style={{ padding: "0 22px 22px", margin: 0, fontSize: 15.3, lineHeight: 1.72, color: "#5A6B80" }}>{f.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", service: "Emergency Repair", msg: "" });
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };
  const input = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 11,
    border: "1.5px solid rgba(255,255,255,.18)",
    background: "rgba(255,255,255,.07)",
    color: "#fff",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };
  return (
    <section id="contact" style={{ background: COLORS.navy, padding: "clamp(70px,9vw,110px) 20px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.accent}22, transparent 70%)`, top: -200, right: -150 }} />
      <div style={{ maxWidth: 1240, margin: "0 auto", position: "relative" }}>
        <SectionHead light kicker="GET HELP NOW" title="Request Service — We'll Call You Right Back" sub="Or skip the form and call us directly. We're open 24 hours a day, every day." />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))", gap: 26 }}>
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <a href={PHONE_HREF} className="dp-contact" style={{ display: "flex", gap: 16, alignItems: "center", background: `linear-gradient(115deg, ${COLORS.accent}, ${COLORS.accentDark})`, padding: "26px 26px", borderRadius: 18, textDecoration: "none", boxShadow: "0 16px 40px rgba(255,107,53,.3)" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,.22)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                  <Icon path={ICONS.phone} size={25} color="#fff" />
                </div>
                <div>
                  <div style={{ color: "rgba(255,255,255,.85)", fontSize: 12.5, fontWeight: 800, letterSpacing: ".12em" }}>CALL 24/7</div>
                  <div style={{ color: "#fff", fontSize: 24, fontWeight: 900, letterSpacing: "-.02em" }}>{PHONE}</div>
                </div>
              </a>

              {[
                { ic: ICONS.pin, label: "VISIT US", val: "241 Main St, Danbury, CT 06810" },
                { ic: ICONS.clock, label: "HOURS", val: "Open 24 Hours — 7 Days a Week" },
                { ic: ICONS.truck, label: "SERVICE AREA", val: "Danbury, Bethel, Brookfield, New Fairfield, Ridgefield, Newtown" },
              ].map((c) => (
                <div key={c.label} className="dp-glass" style={{ display: "flex", gap: 16, alignItems: "center", background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.12)", padding: "22px 24px", borderRadius: 18 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 13, background: "rgba(27,163,198,.18)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <Icon path={c.ic} size={22} color={COLORS.sky} />
                  </div>
                  <div>
                    <div style={{ color: "rgba(255,255,255,.55)", fontSize: 11.5, fontWeight: 800, letterSpacing: ".12em" }}>{c.label}</div>
                    <div style={{ color: "#fff", fontSize: 15.5, fontWeight: 600, marginTop: 3, lineHeight: 1.45 }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 20, padding: "clamp(26px,4vw,38px)" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "36px 10px" }}>
                  <div style={{ width: 66, height: 66, borderRadius: "50%", background: "rgba(74,222,128,.15)", display: "grid", placeItems: "center", margin: "0 auto 20px" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <h3 style={{ color: "#fff", fontSize: 23, fontWeight: 800, margin: "0 0 10px" }}>Request Received</h3>
                  <p style={{ color: "rgba(255,255,255,.72)", fontSize: 15.5, lineHeight: 1.65, margin: "0 0 24px" }}>
                    Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}! We'll call you back shortly. If it's urgent, call us now — we answer 24/7.
                  </p>
                  <a href={PHONE_HREF} style={{ display: "inline-flex", alignItems: "center", gap: 9, background: COLORS.accent, color: "#fff", padding: "14px 26px", borderRadius: 12, fontWeight: 800, textDecoration: "none" }}>
                    <Icon path={ICONS.phone} size={17} color="#fff" /> {PHONE}
                  </a>
                </div>
              ) : (
                <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <input required placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={input} className="dp-input" />
                  <input required type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={input} className="dp-input" />
                  <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} style={{ ...input, cursor: "pointer" }} className="dp-input">
                    {["Emergency Repair", "Drain Cleaning", "Water Heater", "Leak / Pipe Repair", "Fixture Install", "Sewer / Main Line", "Something Else"].map((o) => (
                      <option key={o} value={o} style={{ color: "#111" }}>{o}</option>
                    ))}
                  </select>
                  <textarea rows={4} placeholder="Briefly describe the problem..." value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} style={{ ...input, resize: "vertical" }} className="dp-input" />
                  <button type="submit" className="dp-btn-primary" style={{ background: COLORS.accent, color: "#fff", border: "none", padding: "17px", borderRadius: 13, fontWeight: 900, fontSize: 16.5, cursor: "pointer", boxShadow: "0 12px 30px rgba(255,107,53,.35)", fontFamily: "inherit" }}>
                    Request My Service Call →
                  </button>
                  <p style={{ color: "rgba(255,255,255,.45)", fontSize: 12.5, textAlign: "center", margin: 0, lineHeight: 1.5 }}>
                    No obligation. We'll confirm pricing before any work begins.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#071528", color: "rgba(255,255,255,.62)", padding: "56px 20px 110px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 34, paddingBottom: 34, borderBottom: "1px solid rgba(255,255,255,.1)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`, display: "grid", placeItems: "center" }}>
                <Icon path={ICONS.drip} size={19} color="#fff" />
              </div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 17 }}>Danbury Plumber</div>
            </div>
            <p style={{ fontSize: 14.3, lineHeight: 1.7, margin: 0 }}>
              Licensed, insured, 24/7 plumbing services for Danbury, CT and all of Fairfield County. Rated 5.0 stars by our neighbors.
            </p>
          </div>
          <div>
            <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 800, letterSpacing: ".1em", margin: "0 0 14px" }}>SERVICES</h4>
            {SERVICES.map((s) => (
              <div key={s.title} style={{ fontSize: 14.2, marginBottom: 9 }}>{s.title}</div>
            ))}
          </div>
          <div>
            <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 800, letterSpacing: ".1em", margin: "0 0 14px" }}>SERVICE AREA</h4>
            {["Danbury", "Bethel", "Brookfield", "New Fairfield", "Ridgefield", "Newtown", "Redding"].map((c) => (
              <div key={c} style={{ fontSize: 14.2, marginBottom: 9 }}>{c}, CT</div>
            ))}
          </div>
          <div>
            <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 800, letterSpacing: ".1em", margin: "0 0 14px" }}>CONTACT</h4>
            <a href={PHONE_HREF} style={{ color: COLORS.accent, fontSize: 19, fontWeight: 900, textDecoration: "none", display: "block", marginBottom: 12 }}>{PHONE}</a>
            <div style={{ fontSize: 14.2, lineHeight: 1.7 }}>241 Main St<br />Danbury, CT 06810</div>
            <div style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(74,222,128,.13)", color: "#4ADE80", padding: "7px 14px", borderRadius: 999, fontSize: 13, fontWeight: 700 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80" }} /> Open 24 Hours
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 24, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", fontSize: 13.2 }}>
          <div>© {new Date().getFullYear()} Danbury Plumber. All rights reserved.</div>
          <div>Licensed & Insured Connecticut Plumbing Contractor</div>
        </div>
      </div>
    </footer>
  );
}

function StickyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div
      className="dp-sticky"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 70,
        background: "rgba(11,31,58,.97)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,.12)",
        padding: "12px 16px",
        display: "none",
        gap: 10,
        transform: show ? "translateY(0)" : "translateY(110%)",
        transition: "transform .4s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <a href={PHONE_HREF} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 9, background: COLORS.accent, color: "#fff", padding: "14px", borderRadius: 12, fontWeight: 800, fontSize: 15.5, textDecoration: "none" }}>
        <Icon path={ICONS.phone} size={17} color="#fff" /> Call Now
      </a>
      <button
        onClick={() => { const e = document.getElementById("contact"); if (e) window.scrollTo({ top: e.offsetTop - 60, behavior: "smooth" }); }}
        style={{ flex: 1, background: "rgba(255,255,255,.1)", color: "#fff", border: "1px solid rgba(255,255,255,.22)", padding: "14px", borderRadius: 12, fontWeight: 800, fontSize: 15.5, cursor: "pointer", fontFamily: "inherit" }}
      >
        Book Service
      </button>
    </div>
  );
}

export default function DanburyPlumberSite() {
  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: "#fff", overflowX: "hidden" }}>
      <style>{`
        *{box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{margin:0;}
        @keyframes dpFall{0%{transform:translateY(-10vh) translateX(0);opacity:0}10%{opacity:1}100%{transform:translateY(120vh) translateX(20px);opacity:0}}
        @keyframes dpPulse{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.15);opacity:1}}
        @keyframes dpBlink{0%{box-shadow:0 0 0 0 rgba(74,222,128,.7)}70%{box-shadow:0 0 0 10px rgba(74,222,128,0)}100%{box-shadow:0 0 0 0 rgba(74,222,128,0)}}
        .dp-link:after{content:'';position:absolute;left:0;bottom:0;width:0;height:2px;background:${COLORS.accent};transition:width .3s;}
        .dp-link:hover:after{width:100%;}
        .dp-link:hover{color:#fff !important;}
        .dp-cta{transition:transform .28s, box-shadow .28s;}
        .dp-cta:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(255,107,53,.55) !important;}
        .dp-btn-primary{transition:transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s, filter .28s;}
        .dp-btn-primary:hover{transform:translateY(-3px) scale(1.02);filter:brightness(1.07);box-shadow:0 20px 44px rgba(255,107,53,.5) !important;}
        .dp-btn-ghost{transition:background .3s, border-color .3s, transform .3s;}
        .dp-btn-ghost:hover{background:rgba(255,255,255,.16) !important;border-color:rgba(255,255,255,.6) !important;transform:translateY(-3px);}
        .dp-btn-white{transition:transform .3s, box-shadow .3s;}
        .dp-btn-white:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 18px 40px rgba(0,0,0,.28) !important;}
        .dp-card{transition:transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s, border-color .4s;}
        .dp-card:hover{transform:translateY(-8px);box-shadow:0 24px 54px rgba(11,31,58,.14);border-color:${COLORS.accent}55;}
        .dp-img{transition:transform .7s cubic-bezier(.22,1,.36,1);}
        .dp-card:hover .dp-img,.dp-port:hover .dp-img{transform:scale(1.08);}
        .dp-arrow:hover .dp-arrow-i{transform:translateX(5px);}
        .dp-glass{transition:background .35s, transform .35s, border-color .35s;}
        .dp-glass:hover{background:rgba(255,255,255,.1) !important;transform:translateY(-5px);border-color:rgba(255,255,255,.26) !important;}
        .dp-port{transition:transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s;}
        .dp-port:hover{transform:translateY(-7px);box-shadow:0 24px 54px rgba(11,31,58,.22);}
        .dp-contact{transition:transform .3s, box-shadow .3s;}
        .dp-contact:hover{transform:translateY(-4px);box-shadow:0 22px 48px rgba(255,107,53,.42) !important;}
        .dp-input::placeholder{color:rgba(255,255,255,.42);}
        .dp-input:focus{border-color:${COLORS.accent} !important;background:rgba(255,255,255,.11) !important;}
        .dp-float{animation:dpFloat 4.5s ease-in-out infinite;}
        @keyframes dpFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-11px)}}
        @media(max-width:860px){
          .dp-desktop{display:none !important;}
          .dp-mobile{display:block !important;}
          .dp-sticky{display:flex !important;}
          .dp-float{right:10px !important;bottom:-12px !important;}
        }
      `}</style>
      <Nav />
      <Hero />
      <Services />
      <Why />
      <Portfolio />
      <Testimonials />
      <About />
      <Faq />
      <Contact />
      <Footer />
      <StickyBar />
    </div>
  );
}