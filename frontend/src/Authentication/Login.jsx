import { useState } from "react";

const avatarUrls = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCfPw4tQtqGK-3hI_sQR21veAzZpklEnP4ZAhok7gFcNvBO7u2XJ_8B3H6eUQdp-TlI8LbToaP4Pft3cRM0tXx-KXhkN7jICGvG1PZsCF-WO_XbKHj1kT3qojpF35BQKSwl8Ywi7ukTz53R7IKuUHjGKz84aj7nWCXEheZRMpBFepf-WfKhEwuYMNeXr5keSNayUcYiZMiKvfJTdAi1jdPYW-HYD_aiERVevJlEJ60Sy726dcADd4FkbJXZJfEIjXmtTALawGeas74",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCFXABOeFuOdkqbYVseMQWdOAZnp9NdlSK1s0fJs2jPIAk6R1znWn3rH5DYWBztj55kcz-0a2xfaTRVFh6rpX-hLePhH4XiZeDyZw17fXiY-uYnul9yPD5JNoDFbGA9Ral42ANK7_j0H5aopaLdd15-kVdDCpEx5avOAUFhfbp27-je5uglNaJJsaQZn86mtxa6OfxbOCnaHGFaW_J8gefFC9-u2Xx9qdmWFzwdlqX7zIPGWnd0frq50V3vE8_yk1d5f9foJl8llC8",
];

// Inline SVG icons to avoid external dependencies
const TerminalIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6.41 15.59L8 17l6-6-6-6-1.41 1.41L11.17 11l-4.76 4.59z"/>
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
  </svg>
);

const EyeIcon = ({ visible }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    {visible ? (
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    ) : (
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
    )}
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200">
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
  </svg>
);

 function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{ backgroundColor: "#f7f9fb", color: "#191c1e", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Atmospheric background blobs */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-20 pointer-events-none"
        style={{ background: "#cce5ff", filter: "blur(120px)" }}
      />
      <div
        className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] rounded-full opacity-20 pointer-events-none"
        style={{ background: "#7bd0ff", filter: "blur(100px)" }}
      />

      {/* Main Content */}
      <main className="w-full max-w-110 z-10">
        {/* Branding */}
        <div className="flex flex-col items-center mb-10">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
            style={{
              background: "linear-gradient(135deg, #006398, #5cb9ff)",
              boxShadow: "0 8px 24px rgba(0,99,152,0.15)",
            }}
          >
            <TerminalIcon />
          </div>
          <h1
            className="font-extrabold text-3xl tracking-tight mb-2"
            style={{ fontFamily: "'Manrope', sans-serif", color: "#191c1e" }}
          >
            Code-Go
          </h1>
          <p
            className="text-xs uppercase"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "0.2em",
              color: "#6e7980",
            }}
          >
            The Lucid Architect Environment
          </p>
        </div>

        {/* Login Card */}
        <div
          className="rounded-xl p-10 relative overflow-hidden"
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0px 10px 30px rgba(0,99,152,0.05)",
            border: "1px solid rgba(189,200,209,0.25)",
          }}
        >
          <div className="relative z-10">
            {/* Card Header */}
            <div className="mb-8">
              <h2
                className="font-bold text-xl"
                style={{ fontFamily: "'Manrope', sans-serif", color: "#191c1e" }}
              >
                Welcome back
              </h2>
              <p className="text-sm mt-1" style={{ color: "#3e484f" }}>
                Sign in to your workspace to continue building.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block ml-1 text-[10px] font-bold uppercase"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: "0.1em",
                    color: "#6e7980",
                  }}
                >
                  Email Address
                </label>
                <div className="relative group">
                  <span
                    className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: email ? "#006398" : "#6e7980" }}
                  >
                    <EmailIcon />
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="architect@code-go.io"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                    style={{
                      backgroundColor: "#e6e8ea",
                      border: "none",
                      fontFamily: "'Inter', sans-serif",
                      color: "#191c1e",
                    }}
                    onFocus={(e) => {
                      e.target.style.backgroundColor = "#ffffff";
                      e.target.style.boxShadow = "0 0 0 2px rgba(0,99,152,0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.backgroundColor = "#e6e8ea";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-end px-1">
                  <label
                    htmlFor="password"
                    className="text-[10px] font-bold uppercase"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      letterSpacing: "0.1em",
                      color: "#6e7980",
                    }}
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-[10px] font-bold uppercase transition-colors"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      letterSpacing: "0.1em",
                      color: "#006398",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#00486f")}
                    onMouseLeave={(e) => (e.target.style.color = "#006398")}
                  >
                    Forgot?
                  </a>
                </div>
                <div className="relative group">
                  <span
                    className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: password ? "#006398" : "#6e7980" }}
                  >
                    <LockIcon />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl text-sm outline-none transition-all"
                    style={{
                      backgroundColor: "#e6e8ea",
                      border: "none",
                      fontFamily: "'Inter', sans-serif",
                      color: "#191c1e",
                    }}
                    onFocus={(e) => {
                      e.target.style.backgroundColor = "#ffffff";
                      e.target.style.boxShadow = "0 0 0 2px rgba(0,99,152,0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.backgroundColor = "#e6e8ea";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: "#6e7980", background: "none", border: "none", cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#191c1e")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#6e7980")}
                  >
                    <EyeIcon visible={showPassword} />
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="group w-full py-4 px-6 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #006398, #5cb9ff)",
                    fontFamily: "'Manrope', sans-serif",
                    boxShadow: "0 8px 24px rgba(0,99,152,0.2)",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,99,152,0.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,99,152,0.2)")
                  }
                >
                  <span>Login to Workspace</span>
                  <ArrowIcon />
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="mt-10 text-center">
              <p className="text-sm" style={{ color: "#3e484f" }}>
                Don't have an account?{" "}
                <a
                  href="#"
                  className="font-semibold transition-all"
                  style={{ color: "#006398", textDecoration: "underline", textDecorationColor: "rgba(0,99,152,0.3)", textUnderlineOffset: "4px" }}
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Active Architects Status */}
        <div className="mt-8 flex justify-center items-center gap-6">
          <div className="flex -space-x-2">
            {avatarUrls.map((url, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full overflow-hidden"
                style={{ border: "2px solid #f7f9fb" }}
              >
                <img src={url} alt="Active architect" className="w-full h-full object-cover" />
              </div>
            ))}
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{
                border: "2px solid #f7f9fb",
                backgroundColor: "#93ccff",
                color: "#004b73",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              +12
            </div>
          </div>
          <p
            className="text-[10px] uppercase"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "0.08em",
              color: "#6e7980",
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse"
              style={{ backgroundColor: "#10b981", verticalAlign: "middle" }}
            />
            Active architects online
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="absolute bottom-8 w-full px-12 flex flex-col md:flex-row justify-between items-center"
        style={{ opacity: 0.4 }}
      >
        <p
          className="text-[10px] uppercase mb-4 md:mb-0"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "0.1em",
            color: "#191c1e",
          }}
        >
          © 2024 Code-Go Labs.
        </p>
        <div className="flex gap-6">
          {["Documentation", "System Status", "Privacy"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[10px] uppercase transition-colors"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "0.1em",
                color: "#191c1e",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#006398")}
              onMouseLeave={(e) => (e.target.style.color = "#191c1e")}
            >
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default Login;