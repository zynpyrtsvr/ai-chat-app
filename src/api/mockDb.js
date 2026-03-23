export const conversationsDb = [
  {
    id: 1,
    title: "Chat 1",
  },
  {
    id: 2,
    title: "Chat 2",
  },
];

export const messagesDb = {
  1: [
    {
      id: 1,
      role: "assistant",
      content: "Hi! This is a React chat app.",
      time: "19:10",
    },
    {
      id: 2,
      role: "user",
      content: "Cool — now this is inside React.",
      time: "19:11",
    },
    {
      id: 3,
      role: "assistant",
      content: "Yes — and it uses components, state, and effects.",
      time: "19:12",
    },
  ],
  2: [
    {
      id: 4,
      role: "assistant",
      content: "This is another conversation.",
      time: "18:40",
    },
    {
      id: 5,
      role: "user",
      content: "Nice, so the sidebar already has data.",
      time: "18:41",
    },
  ],
};

export function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}