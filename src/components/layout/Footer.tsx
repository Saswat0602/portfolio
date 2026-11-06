export function Footer() {
  return (
    <footer className="border-t border-theme-border py-8 text-xs text-theme-muted">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-mono text-center sm:text-left">
          © 2026 Saswat Ranjan Mohanty • Bhubaneswar, India
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 font-mono">
          <a
            href="https://github.com/saswat0602"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-theme-primary transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/saswat0602"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-theme-primary transition"
          >
            LinkedIn
          </a>
          <a
            href="https://shomes.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-theme-primary transition"
          >
            shomes.in
          </a>
          <a
            href="mailto:saswatranjan0602@gmail.com"
            className="hover:text-theme-primary transition"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
