import { useState } from "react";
import { useNavigate } from "react-router-dom";
const tailwindConfig = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
`;

function MaterialIcon({ name, filled = false, className = "" }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : {}}
    >
      {name}
    </span>
  );
}

function Navbar() {
  return (
    <nav className="w-full top-0 sticky z-50" style={{ backgroundColor: "#f7f9fb" }}>
      <div className="flex justify-between items-center px-6 py-3 w-full">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "Manrope, sans-serif" }}>
            Code-Go
          </span>
          <div className="hidden md:flex gap-6 items-center">
            <a
              href="#"
              className="text-sm font-bold text-sky-700 border-b-2 border-sky-600 px-1 py-1"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Explorer
            </a>
            <a
              href="#"
              className="text-sm font-medium text-slate-500 hover:bg-slate-100 transition-colors px-3 py-1 rounded-xl"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Search
            </a>
            <a
              href="#"
              className="text-sm font-medium text-slate-500 hover:bg-slate-100 transition-colors px-3 py-1 rounded-xl"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Extensions
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:bg-slate-100 transition-colors rounded-xl">
            <MaterialIcon name="notifications" />
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-100 transition-colors rounded-xl">
            <MaterialIcon name="settings" />
          </button>
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
            <img
              alt="User Avatar"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc8Hp4n4tnODjVvzjNLDol3sA1EtElNFHAqzCWiiGtvW1NE1nQyqMVKgjKs9DiGwVZ2uZTqX_8-tKwigho7zzCegz5PY328hLxno8hrkApV_bN2liyva71tyKh1qnBPTZFX5dNHQm88Tfa3Y1HWRjcjQTbbBJIqoTvRbfRgj-ld5HNOPvgTmTmHAAHBhSbhL7jZL19VSKd0dKNQArkXwy16cyr_m_s5JWgsC-fViKp3gz2u7N3FmYH-9opw4GJw_4Ck1OiK_ZZKD0"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

function CodeEditorMockup() {
  return (
    <div className="relative">
      <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(92,185,255,0.12)" }} />
      <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(64,194,253,0.12)" }} />
      <div
        className="relative rounded-xl shadow-2xl border p-1 overflow-hidden"
        style={{
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.8)",
          borderColor: "rgba(255,255,255,0.5)",
        }}
      >
        <div className="bg-white rounded-lg overflow-hidden shadow-inner">
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-300" />
              <div className="w-3 h-3 rounded-full bg-amber-300" />
              <div className="w-3 h-3 rounded-full bg-emerald-300" />
            </div>
            <div className="mx-auto flex items-center gap-2 px-3 py-1 bg-white rounded-md text-slate-400 border border-slate-100" style={{ fontSize: 10, fontFamily: "Space Grotesk, sans-serif" }}>
              <MaterialIcon name="terminal" className="text-sm" />
              auth_service.py
            </div>
          </div>
          <div className="p-6 text-sm leading-relaxed text-slate-600" style={{ fontFamily: "Space Grotesk, monospace" }}>
            <div className="flex gap-4">
              <span className="text-slate-300 select-none">01</span>
              <span>
                <span className="text-blue-600 font-bold">def</span> authenticate_user(token):
              </span>
            </div>
            <div className="flex gap-4">
              <span className="text-slate-300 select-none">02</span>
              <span className="pl-4 text-slate-400"># Validating the session token</span>
            </div>
            <div className="flex gap-4 relative">
              <span className="text-slate-300 select-none">03</span>
              <span className="pl-4">payload = jwt.decode(token, SECRET)</span>
              <div className="absolute left-64 -top-2 px-2 py-1 bg-blue-600 text-white rounded-sm flex items-center gap-1 shadow-md" style={{ fontSize: 10 }}>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Alex
              </div>
              <div className="absolute left-64 h-6 w-0.5 bg-blue-600" />
            </div>
            <div className="flex gap-4">
              <span className="text-slate-300 select-none">04</span>
              <span className="pl-4">
                <span className="text-blue-600 font-bold">return</span>{" "}
                payload.get(<span className="text-sky-600">'user_id'</span>)
              </span>
            </div>
            <div className="mt-6 flex gap-2">
              <div className="px-3 py-1.5 bg-sky-100 text-sky-900 rounded-full font-bold" style={{ fontSize: 10 }}>
                COLLAB_ACTIVE
              </div>
              <div className="px-3 py-1.5 bg-slate-100 rounded-full font-bold" style={{ fontSize: 10 }}>
                LINT_PASSED
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  const [roomId, setRoomId] = useState("");

  return (
    <section
      className="relative overflow-hidden pt-16 pb-24"
      style={{ background: "radial-gradient(circle at 50% 50%, rgba(92, 185, 255, 0.08) 0%, rgba(247, 249, 251, 0) 70%)" }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-900 rounded-full mb-6">
            <MaterialIcon name="bolt" filled className="text-lg" />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Collaborate your code buddy!
            </span>
          </div>
          <h1
            className="text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight"
            style={{ fontFamily: "Manrope, sans-serif", lineHeight: 1.1 }}
          >
            Code Together.
            <br />
            <span className="text-blue-700">In Real Time.</span>
          </h1>
          <p className="text-lg text-slate-500 mb-10 max-w-lg leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            The lucid workspace for modern engineering teams. Pair program, debug, and ship high-quality code in a high-end editorial studio built for speed.
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              {[
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAwwn-YZKl470-flnXQIld7JByyxMzIKOoMUF4df_qNxOgkLsRcwE8ezYyNqvnL0zQvoztlLMVPe9lLFiU6Ci_UwWxN3irOIAib7n6W12qEF3VvFjVTa0etIWhQS2Mg0uhSxQzJLObSQfjSjU4wwuZzShN6rRc2S73rFhF7wLq_q1Od9VpKVrJubwAHduhGrjEY62eyZtmx7WFy3NxXw52UFPVrD3IoSe580KGNllf3USm99jipUE5_U8Klad1_e31ZTj7xZB07MTw",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCFqNKQz5aLpo4ReHRfvn4YuzFmU4FG62Lm27O9xQdkvt1-DR6dQST629lTXgnw9Q1BaQZDr_EVZYN5-PC-pdXOnc5R5_mwoIMkeT_pJSQbr61kXd2NzFy8raGGxipCAZnlLplX_kuPDdDajTLdG_oZnTtwKuIdAACu7P0UYLUODEW1D0w2Y5o58L3SE5iTEjddEm1wi5jxuqzzhKZgDJa78nUdAFtFUyqkPmrA7YQiw6x-fFtNk0KmbFfpSguGsxihMnvad1vOJaE",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCdZGrrblNJHGHw93_qphTP69UWpjE7LVk3rqZLGdQ0lVyBfI-K5xlknXbVGSvnFyi-Wk4pM33M-DZPnhMICBdoGMvlTyNLpsj8XrWM6tP8gQmAgcc0qUny0_ICUApxj_RyL4UIHzWqfyf5kglbitjwCWyM4gqswawFBoPZY3UbFoEUiWmYqiaxkTN5pAK24vHOYDJBWG-8KQuTtDnPOJ4gxkdTLIEehTwYLu7BQ529VlHp-FoETRk4sUNvRVMRA8JE4H0cx0Z5QOM",
              ].map((src, i) => (
                <img
                  key={i}
                  alt={`Collaborator ${i + 1}`}
                  className="w-10 h-10 rounded-full border-4 border-white object-cover"
                  src={src}
                />
              ))}
              <div className="w-10 h-10 rounded-full border-4 border-white bg-sky-100 flex items-center justify-center text-sky-900 font-bold" style={{ fontSize: 10 }}>
                +12
              </div>
            </div>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Joined by 4k+ teams
            </p>
          </div>
        </div>
        <CodeEditorMockup />
      </div>
    </section>
  );
}

function BentoFeatures() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Large Card */}
        <div className="md:col-span-2 bg-white p-10 rounded-xl flex flex-col justify-between shadow-sm border border-slate-100">
          <div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 mb-6">
              <MaterialIcon name="group" filled />
            </div>
            <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
              Atomic Collaboration
            </h3>
            <p className="text-slate-500 leading-relaxed max-w-md" style={{ fontFamily: "Inter, sans-serif" }}>
              Every keystroke is synchronized with sub-50ms latency. It feels like you're typing on the same machine, even if you're worlds apart.
            </p>
          </div>
          <div className="mt-12 flex gap-4 flex-wrap">
            {["Multi-cursor", "Live Comments", "Shared Terminal"].map((tag) => (
              <div
                key={tag}
                className="px-4 py-2 bg-slate-50 rounded-lg text-xs uppercase tracking-wider font-bold"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Vertical Card */}
        <div
          className="p-10 rounded-xl text-white flex flex-col justify-between"
          style={{ backgroundColor: "#006398", boxShadow: "0 20px 40px rgba(0,99,152,0.2)" }}
        >
          <MaterialIcon name="security" className="text-4xl mb-6" />
          <div>
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "Manrope, sans-serif" }}>
              Enterprise Security
            </h3>
            <p className="text-blue-200 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              End-to-end encryption for every room. Your source code never touches our persistent storage.
            </p>
          </div>
        </div>

        {/* Three small cards */}
        {[
          { icon: "extension", title: "Full Ecosystem", desc: "Install VS Code extensions directly in your shared room." },
          { icon: "history", title: "Time Travel", desc: "Review changes and revert to any point in the session history." },
          { icon: "cloud_done", title: "Instant Deploy", desc: "Deploy to staging with one click from your live workspace." },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-slate-50 p-8 rounded-xl flex items-center gap-6">
            <div className="w-16 h-16 shrink-0 rounded-full bg-white flex items-center justify-center shadow-sm">
              <MaterialIcon name={icon} filled className="text-sky-600" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>
                {title}
              </h4>
              <p className="text-slate-500 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-24">
      <div className="relative bg-slate-900 rounded-3xl p-12 lg:p-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <img
            alt="Tech Background"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqmKGxfgwJN7zvDGAVWVDWEPLrEpPYtb0XIp8jDMap_P-cIRf7FdW3EazTrVW24pJMS8xMVdsa7-EqoEwgnoH7VtkE7jACjNvviYD24vu702wwRxqZ0p8MdINkeOjUCbkMPvY5pl0ulR1fJsl8dFBp46PslUAsn2idkure7PD5i04U6k2I2WubUgtVVAY9QVEKE7kauL-VtQoj88NsIRWP4Rk26xNNT4QTu0o4su3u7qktndPHN2FyYeogJ25h_F3MzKEfgqlg46Q"
          />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2
            className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Ready to build the future together?
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Join thousands of architects who have traded isolation for collaborative flow. Start your first room in seconds.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
             onClick={() => navigate("/login")}
              className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Get Started for Free
            </button>
            <button
              className="border border-slate-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Book a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full py-12 px-8 border-t border-slate-200" style={{ backgroundColor: "#f7f9fb" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="font-semibold text-slate-900 text-xl tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
            Code-Go
          </span>
          <p className="text-sm text-slate-500" style={{ fontFamily: "Inter, sans-serif" }}>
            © 2024 Code-Go Labs. Built for the lucid architect.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {["Documentation", "Privacy", "Terms", "GitHub", "Support"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-slate-500 hover:text-sky-600 transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex gap-4">
          {["share", "language"].map((icon) => (
            <button
              key={icon}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-sky-500 transition-colors"
            >
              <MaterialIcon name={icon} className="text-xl" />
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function LaunchScreen() {
    const navigate = useNavigate();
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
      <div className="min-h-screen" style={{ backgroundColor: "#f7f9fb", fontFamily: "Inter, sans-serif" }}>
        <Navbar />
        <main>
          <HeroSection />
          <BentoFeatures />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}