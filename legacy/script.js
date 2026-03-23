class ChatMessage extends HTMLElement {
  connectedCallback() {
    const role = this.getAttribute("role") || "ai"; // "ai" or "user"
    const time = this.getAttribute("time") || "";

    // Read the inner text content (the message)
    const text = this.textContent.trim();

    // Clear original content so we can rebuild the template
    this.textContent = "";

    // Wrapper for alignment (left for AI, right for user)
    const wrapper = document.createElement("div");
    wrapper.className =
      role === "user" ? "flex justify-end" : "flex justify-start";

    // Bubble
    const bubble = document.createElement("div");
    bubble.className =
      role === "user"
        ? "max-w-[75%] rounded-2xl px-4 py-2 bg-slate-900 text-white"
        : "max-w-[75%] rounded-2xl px-4 py-2 bg-white text-slate-900 border border-slate-200";

    const messageText = document.createElement("div");
    messageText.className = "text-sm leading-relaxed";
    messageText.textContent = text;

    const meta = document.createElement("div");
    meta.className =
      role === "user"
        ? "mt-1 text-xs text-slate-300 text-right"
        : "mt-1 text-xs text-slate-400";
    meta.textContent = time;

    bubble.appendChild(messageText);
    if (time) bubble.appendChild(meta);

    wrapper.appendChild(bubble);
    this.appendChild(wrapper);
  }
}

customElements.define("chat-message", ChatMessage);