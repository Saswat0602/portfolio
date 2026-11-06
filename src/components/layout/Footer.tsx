export function Footer() {
  return (
    <footer className="w-full max-w-full overflow-hidden border-t border-theme-border py-6 sm:py-8 text-xs text-theme-muted">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="font-mono text-center sm:text-left text-[11px] sm:text-xs">
          © 2026 Saswat Ranjan Mohanty • Bhubaneswar, India
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-[11px] sm:text-xs">
          <a
            href="https://github.com/saswat0602"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-theme-primary transition-colors py-1"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/saswat0602"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-theme-primary transition-colors py-1"
          >
            LinkedIn
          </a>
          <a
            href="mailto:saswatranjan0602@gmail.com"
            className="hover:text-theme-primary transition-colors py-1"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
