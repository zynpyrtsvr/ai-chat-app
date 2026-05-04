"use client";

export default function LoadingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[75%] rounded-2xl px-4 py-2 bg-white text-slate-900 border border-slate-200">
        <div className="text-sm leading-relaxed text-slate-500">
          Thinking...
        </div>
      </div>
    </div>
  );
}