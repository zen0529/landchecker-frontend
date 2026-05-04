export const GLOBAL_CSS = (font) => `
  ${font}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --cream: #FAF7F2;
    --ink: #1A1208;
    --warm-gray: #8C8070;
    --gold: #C9A96E;
    --gold-light: #E8D5A8;
    --surface: #F2EDE4;
    --border: #DDD5C4;
    --white: #FFFFFF;
    --green: #6BAE8E;
    --red: #E87C7C;
    --amber: #E8A87C;
  }
  body { background: var(--cream); font-family: 'DM Sans', sans-serif; color: var(--ink); }
  .serif { font-family: 'Playfair Display', serif; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes toastIn {
    from { opacity: 0; transform: translateX(100%); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes toastOut {
    from { opacity: 1; transform: translateX(0); }
    to   { opacity: 0; transform: translateX(100%); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; } 50% { opacity: 0.5; }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .card-enter { animation: fadeSlideUp 0.4s ease both; }
  .fade-in { animation: fadeIn 0.3s ease both; }
`