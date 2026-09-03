export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bg z-50">
      <div className="relative flex items-center justify-center">
        {/* Glow behind the spinner */}
        <div className="absolute inset-0 bg-image-gradient-radial-glow blur-xl rounded-full w-32 h-32 opacity-70 animate-pulse"></div>
        
        {/* Spinner Ring */}
        <div className="w-16 h-16 border-4 border-accent-subtle border-t-accent rounded-full animate-spin"></div>
        
        {/* Inner pulse */}
        <div className="absolute w-6 h-6 bg-accent rounded-full animate-pulse shadow-glow"></div>
      </div>
    </div>
  );
}
