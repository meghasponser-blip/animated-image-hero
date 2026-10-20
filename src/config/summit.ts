// Edit everything about the summit here. Leave values as null until confirmed.
export const summit = {
  name: "AICS",
  fullName: "Artificial Intelligence Career Summit",
  tagline: "Discover AI. Build Your Future.",
  date: null as string | null, // e.g. "2027-02-14T09:00:00+05:30"
  dateLabel: "DATE TO BE ANNOUNCED",
  venue: "VENUE TO BE ANNOUNCED",
  city: "CITY TO BE ANNOUNCED",
  format: "Format to be announced",
  registrationStatus: "Registrations opening soon",
  registrationUrl: null as string | null,
  contactEmail: "To be announced",
  contactPhone: "To be announced",
  organizer: {
    conductedBy: "[ORGANIZER / INSTITUTION NAME]",
    presentedBy: "[PRESENTING ORGANIZATION, IF APPLICABLE]",
    association: "[CONFIRMED PARTNER ORGANIZATIONS]",
    knowledge: "[CONFIRMED KNOWLEDGE PARTNERS]",
    community: "[CONFIRMED COMMUNITY PARTNERS]",
  },
};

export const tracks = [
  { t: "Artificial Intelligence & Machine Learning", topics: "ML fundamentals, model training, neural networks, AI applications", roles: "ML Engineer, AI Researcher, Applied Scientist", skills: "Python, linear algebra, PyTorch" },
  { t: "Generative AI & LLMs", topics: "Large language models, prompt engineering, AI assistants, RAG", roles: "LLM Engineer, Prompt Engineer, AI Product Builder", skills: "Prompting, embeddings, APIs" },
  { t: "Data Science & Analytics", topics: "Python, data analysis, visualization, predictive analytics, BI", roles: "Data Scientist, Data Analyst, BI Developer", skills: "SQL, pandas, statistics" },
  { t: "AI Automation & Agents", topics: "Workflow automation, AI agents, process optimization, productivity tools", roles: "Automation Engineer, AI Ops Specialist", skills: "No-code tools, scripting, agent frameworks" },
  { t: "AI Software Development", topics: "AI-powered apps, API integration, full-stack, intelligent software", roles: "AI Developer, Full-stack Engineer", skills: "TypeScript, APIs, cloud" },
  { t: "AI in Business & Marketing", topics: "AI marketing, customer insights, content workflows, strategy", roles: "Growth Marketer, AI Strategist", skills: "Analytics, content tools, strategy" },
  { t: "Robotics & Intelligent Systems", topics: "Robotics, computer vision, perception, intelligent devices", roles: "Robotics Engineer, CV Engineer", skills: "C++, ROS, OpenCV" },
  { t: "AI Ethics, Safety & Governance", topics: "Responsible AI, data privacy, model risks, transparency", roles: "AI Policy Analyst, Trust & Safety Lead", skills: "Policy, risk assessment, auditing" },
];

export const agenda = [
  { time: "TBA", title: "Registration and Welcome", type: "General", dur: "TBA" },
  { time: "TBA", title: "Opening Ceremony", type: "General", dur: "TBA" },
  { time: "TBA", title: "Summit Inauguration", type: "General", dur: "TBA" },
  { time: "TBA", title: "Keynote: The Future of Artificial Intelligence", type: "Keynote", dur: "TBA" },
  { time: "TBA", title: "AI Career Opportunities and Industry Trends", type: "Talk", dur: "TBA" },
  { time: "TBA", title: "Generative AI Demonstration", type: "Demo", dur: "TBA" },
  { time: "TBA", title: "Expert Panel Discussion", type: "Panel", dur: "TBA" },
  { time: "TBA", title: "Career Pathways and Skills for the Future", type: "Talk", dur: "TBA" },
  { time: "TBA", title: "Hands-on Workshop or Live Technology Experience", type: "Demo", dur: "TBA" },
  { time: "TBA", title: "Networking and Q&A", type: "General", dur: "TBA" },
  { time: "TBA", title: "Closing Remarks", type: "General", dur: "TBA" },
];

export const speakerTypes = ["Keynote Speaker", "AI Researcher", "Industry Professional", "Startup Founder", "Technology Leader", "Career Mentor"];

export const faqs = [
  ["What is AICS?", "AICS — Artificial Intelligence Career Summit connects people with the knowledge, technologies and opportunities shaping the AI-driven economy."],
  ["Who can attend the summit?", "Students, aspiring professionals, educators, entrepreneurs and anyone curious about AI careers."],
  ["Do I need prior AI knowledge?", "No. Sessions are designed for beginners as well as experienced learners."],
  ["How do I register?", "Use the registration form on this page. Full registration details will be announced."],
  ["Is there a registration fee?", "To be announced."],
  ["Will certificates be provided?", "To be announced."],
  ["Are workshops included?", "To be announced."],
  ["Will there be networking opportunities?", "Networking time is planned in the proposed agenda; final details to be announced."],
  ["Where and when will the summit take place?", "Date and venue to be announced."],
  ["Can organizations become sponsors or partners?", "Yes — use the partnership inquiry form in the Partners section."],
  ["How can I contact the organizers?", "Contact details will be announced soon."],
];
