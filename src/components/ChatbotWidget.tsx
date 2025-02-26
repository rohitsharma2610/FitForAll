// ChatbotWidget.tsx
import React from 'react';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Inject the Chatbase embed script on mount
  React.useEffect(() => {
    // Only run in the browser
    if (typeof window !== 'undefined') {
      // Initialize window.chatbase if not already initialized
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        const w = window as any;
        w.chatbase = (...args: any[]) => {
          if (!w.chatbase.q) {
            w.chatbase.q = [];
          }
          w.chatbase.q.push(args);
        };
        w.chatbase = new Proxy(w.chatbase, {
          get(target, prop: string) {
            if (prop === "q") {
              return target.q;
            }
            return (...args: any[]) => target(prop, ...args);
          }
        });
      }

      const onLoad = () => {
        // Prevent multiple injections
        if (!document.getElementById("SgqIxpdml8ss5pYlISJjS")) {
          const script = document.createElement("script");
          script.src = "https://www.chatbase.co/embed.min.js";
          script.id = "SgqIxpdml8ss5pYlISJjS";
          // Instead of setting script.domain, use a data attribute
          script.setAttribute("data-domain", "www.chatbase.co");
          document.body.appendChild(script);
        }
      };

      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
        return () => {
          window.removeEventListener("load", onLoad);
        };
      }
    }
  }, []);

 

  // When open, show the Chatbase iframe with a close button
  return (
    <div className="fixed bottom-0 right-0 w-full md:w-1/3 h-96 md:h-[700px] shadow-lg z-50">
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-2 right-2 z-50 text-white bg-gray-700 p-2 rounded-full"
      >
        X
      </button>
      
    </div>
  );
};

export default ChatbotWidget;
