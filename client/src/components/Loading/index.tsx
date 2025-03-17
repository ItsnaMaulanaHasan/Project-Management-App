export const LoadingScreen = () => {
  return (
    <div className="flex min-h-[calc(100vh-15rem)] items-center justify-center">
      <AnimateLogo />
    </div>
  );
};

function AnimateLogo() {
  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      <div className="animate-zoomInOut">
        <img
          alt="Logo"
          src="/logo.png"
          style={{ width: "30px", height: "30px" }}
        />
      </div>
      <div className="border-primary animate-spinFastReverse absolute h-[70%] w-[70%] rounded-[25%] border-4 opacity-50" />
      <div className="border-primary animate-spinFast absolute h-[85%] w-[85%] rounded-[25%] border-2 opacity-25" />
         
    </div>
  );
}
