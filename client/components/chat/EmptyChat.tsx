export const EmptyChat = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-[32px] font-bold text-[#F8FAFC] mb-4">👋 Welcome to Spur Support AI</h2>
      <p className="text-[#94A3B8] mb-8">Try asking:</p>
      
      <div className="space-y-3 w-full max-w-md text-left">
        {[
          "What is your refund policy?",
          "Do you ship internationally?",
          "What are your support hours?"
        ].map((q) => (
          <div 
            key={q} 
            className="p-4 rounded-xl border border-[#334155] bg-[#1E293B] 
                       text-[#F8FAFC] hover:bg-[#334155] transition-colors 
                       cursor-pointer"
          >
            • {q}
          </div>
        ))}
      </div>
    </div>
  );
};
