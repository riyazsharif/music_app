import React from "react";

export default function EmptyState({ title, subtitle, action }) {
  return (
    <div className="w-[90%] md:w-[60%] rounded-2xl border border-gray-800 bg-gray-900/40 p-6 text-center">
      <div className="text-white text-[22px] font-semibold">{title}</div>
      {subtitle ? (
        <div className="mt-2 text-gray-300 text-[14px]">{subtitle}</div>
      ) : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}

