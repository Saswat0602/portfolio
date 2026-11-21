export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-theme-base z-50">
      <div className="relative flex items-center justify-center">
        {/* Glow behind the spinner */}
        <div className="absolute inset-0 bg-theme-accent/20 blur-xl rounded-full w-32 h-32 opacity-70 animate-pulse" />
        
        {/* Spinner Ring */}
        <div className="w-16 h-16 border-4 border-theme-border border-t-theme-accent rounded-full animate-spin" />
        
        {/* Inner pulse */}
        <div className="absolute w-6 h-6 bg-theme-accent rounded-full animate-pulse shadow-lg shadow-theme-accent/50" />
      </div>
    </div>
  );
}
