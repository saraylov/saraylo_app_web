import { error } from "@sveltejs/kit";
const products = [
  {
    id: "taskflow-pro",
    name: "TaskFlow Pro",
    description: "Advanced task management application with AI-powered scheduling and team collaboration features.",
    type: "desktop",
    icon: "📋",
    images: ["/images/taskflow-1.jpg", "/images/taskflow-2.jpg"],
    features: [
      "AI-powered task prioritization",
      "Real-time team collaboration",
      "Cross-platform synchronization",
      "Advanced reporting dashboard"
    ],
    technologies: ["SvelteKit", "TypeScript", "SQLite", "Electron"],
    link: "#",
    releaseDate: /* @__PURE__ */ new Date("2024-03-15")
  },
  {
    id: "codevault",
    name: "CodeVault",
    description: "Secure code snippet manager with version control and cloud synchronization.",
    type: "desktop",
    icon: "🔒",
    images: ["/images/codevault-1.jpg", "/images/codevault-2.jpg"],
    features: [
      "End-to-end encryption",
      "Git integration",
      "Syntax highlighting for 200+ languages",
      "Team sharing capabilities"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Tauri"],
    link: "#",
    releaseDate: /* @__PURE__ */ new Date("2024-01-22")
  },
  {
    id: "focusmate-mobile",
    name: "FocusMate Mobile",
    description: "Pomodoro timer with ambient soundscapes and productivity analytics.",
    type: "mobile",
    icon: "⏱️",
    images: ["/images/focusmate-1.jpg", "/images/focusmate-2.jpg"],
    features: [
      "Customizable pomodoro sessions",
      "Ambient sound library",
      "Productivity insights",
      "Dark mode support"
    ],
    technologies: ["React Native", "Redux", "Firebase"],
    link: "#",
    releaseDate: /* @__PURE__ */ new Date("2023-11-08")
  },
  {
    id: "notion-sync",
    name: "Notion Sync",
    description: "Offline-first note-taking app with seamless Notion integration.",
    type: "desktop",
    icon: "📝",
    images: ["/images/notion-sync-1.jpg", "/images/notion-sync-2.jpg"],
    features: [
      "Offline capability",
      "Notion API integration",
      "Markdown support",
      "Tag-based organization"
    ],
    technologies: ["Vue.js", "Electron", "IndexedDB"],
    link: "#",
    releaseDate: /* @__PURE__ */ new Date("2024-05-30")
  },
  {
    id: "habit-tracker",
    name: "Habit Tracker",
    description: "Gamified habit building application with social features.",
    type: "mobile",
    icon: "🎯",
    images: ["/images/habit-tracker-1.jpg", "/images/habit-tracker-2.jpg"],
    features: [
      "Stake-based motivation system",
      "Social challenges",
      "Progress visualization",
      "Community leaderboards"
    ],
    technologies: ["Flutter", "Dart", "Supabase"],
    link: "#",
    releaseDate: /* @__PURE__ */ new Date("2023-09-12")
  },
  {
    id: "dev-dashboard",
    name: "Dev Dashboard",
    description: "Developer productivity dashboard with system monitoring and workflow automation.",
    type: "desktop",
    icon: "📊",
    images: ["/images/dev-dashboard-1.jpg", "/images/dev-dashboard-2.jpg"],
    features: [
      "System resource monitoring",
      "Workflow automation",
      "API request testing",
      "Code deployment tracking"
    ],
    technologies: ["Svelte", "Rust", "Tauri", "WebSocket"],
    link: "#",
    releaseDate: /* @__PURE__ */ new Date("2024-07-18")
  }
];
async function load({ params }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) {
    throw error(404, "Product not found");
  }
  return {
    product
  };
}
export {
  load
};
