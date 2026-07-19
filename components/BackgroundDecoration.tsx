export default function BackgroundDecoration() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="page-dot-grid absolute inset-0" />
      <div className="absolute -left-40 -top-32 h-[32rem] w-[32rem] rounded-full bg-accent/[0.07] blur-[110px]" />
      <div className="absolute -right-48 top-[38%] h-[28rem] w-[28rem] rounded-full bg-accent-2/[0.1] blur-[110px]" />
      <div className="absolute -left-32 bottom-[-8rem] h-[26rem] w-[26rem] rounded-full bg-accent/[0.06] blur-[110px]" />
    </div>
  );
}
