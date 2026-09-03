// Mock data standing in for the Google Sheets–backed content model described
// in the project brief. Every field here maps 1:1 to a Sheets column
// (see services/*.ts) so swapping the mock reads for real API calls later
// does not require touching any component.

import type {
  Project,
  Service,
  ApproachStep,
  StatMetric,
  SiteContent,
  Lead,
} from "../types";

import biggestCoil from "../assets/images/portfolio/biggest-coil.jpg";
import ikorodu from "../assets/images/portfolio/ikorodu-property-markets.jpg";
import greatMinds from "../assets/images/portfolio/great-minds-investments.jpg";
import tabernacle from "../assets/images/portfolio/tabernacle-investments.jpg";
import ora from "../assets/images/portfolio/ora-app.jpg";
import palmeira from "../assets/images/portfolio/palmeira.jpg";

export const siteContent: SiteContent = {
  heroEyebrow: "Kandle Business Agency",
  heroHeadline: "Your business is changing shape. Your brand should keep pace.",
  heroSubhead:
    "Kandle is a strategy-led branding and growth agency. We help growing businesses clarify who they are, strengthen how they're perceived, and build the systems they need to grow with confidence.",
  heroPrimaryCta: "Start a project",
  heroSecondaryCta: "Explore our work",
  aboutEyebrow: "We are Kandle",
  aboutHeadline: "Clarity first. Design follows.",
  aboutBody:
    "Kandle is a strategy-led branding and growth agency that helps businesses clarify who they are, position themselves clearly, and build strong, consistent identities. We work with emerging and scaling brands to improve visibility, credibility, and long-term growth through intentional strategy and execution. Our work goes beyond visuals — we build brand systems that communicate clearly, connect with the right audience, and support real business objectives.",
  contactHeadline: "Ready to build what's next?",
  contactSubhead:
    "Whether you need brand strategy, marketing, a new website, or a full growth system — tell us where your business is and where it's headed.",
};

export const stats: StatMetric[] = [
  { metric: "years", value: "3+", label: "Years of service experience" },
  { metric: "projects", value: "150+", label: "Projects completed" },
  { metric: "clients", value: "25+", label: "Happy clients" },
];

export const services: Service[] = [
  {
    id: "brand-identity",
    index: "01",
    name: "Brand Identity",
    summary:
      "We turn unclear brands into visible, trusted, credible businesses — clarifying who you are before we ever touch a visual system.",
    capabilities: [
      "Brand strategy",
      "Brand positioning",
      "Visual identity",
      "Brand systems",
      "Brand guidelines",
      "Communication direction",
    ],
  },
  {
    id: "marketing",
    index: "02",
    name: "Marketing",
    summary:
      "Strategic, brand-aligned marketing built to improve visibility, strengthen audience connection, and support measurable growth.",
    capabilities: [
      "Campaign strategy",
      "Content direction",
      "Digital marketing",
      "Audience growth",
      "Marketing systems",
      "Campaign execution",
    ],
  },
  {
    id: "web-design-development",
    index: "03",
    name: "Web Design & Development",
    summary:
      "Functional, brand-aligned websites that communicate clearly, perform efficiently, and are built for long-term scalability.",
    capabilities: [
      "UX strategy",
      "Website design",
      "Web development",
      "Conversion optimization",
      "Digital experiences",
      "Scalable web systems",
    ],
  },
  {
    id: "packaging",
    index: "04",
    name: "Packaging",
    summary:
      "Purposeful packaging that reflects brand identity, communicates value clearly, and stands out where it's shelved or shipped.",
    capabilities: [
      "Packaging strategy",
      "Packaging identity",
      "Product presentation",
      "Visual systems",
      "Print-ready design",
    ],
  },
  {
    id: "automation",
    index: "05",
    name: "Automation",
    summary:
      "Systems that remove repetitive work from the business, so the team spends time on the growth work only people can do.",
    capabilities: [
      "AI automation",
      "Systems automation",
      "Workflow design",
      "Lead & follow-up automation",
    ],
  },
  {
    id: "consultation",
    index: "06",
    name: "Consultation",
    summary:
      "Strategic advisory for businesses that need an outside perspective before they commit to a direction.",
    capabilities: [
      "Brand & growth strategy",
      "Positioning workshops",
      "Systems & operations review",
      "Growth roadmapping",
    ],
  },
];

export const approachSteps: ApproachStep[] = [
  {
    index: "01",
    title: "Discover",
    description:
      "We start by understanding your business, audience, goals, and challenges — not by opening a design file.",
  },
  {
    index: "02",
    title: "Define",
    description:
      "We clarify positioning, strategy, priorities, and direction, so every decision after this has something to answer to.",
  },
  {
    index: "03",
    title: "Build",
    description:
      "We create the brand, digital experience, or growth system — grounded in the strategy we defined together.",
  },
  {
    index: "04",
    title: "Activate",
    description:
      "We launch, implement, and connect everything, so the work goes live in a way people actually encounter it.",
  },
  {
    index: "05",
    title: "Grow",
    description:
      "We measure, refine, and support the next stage — because growth doesn't stop at launch.",
  },
];

export const growthStages = [
  { label: "Idea", description: "A direction, not yet a business." },
  { label: "Foundation", description: "The basics are in place, but nothing is consistent yet." },
  { label: "Clarity", description: "You know who you are — but not everyone else does yet." },
  { label: "Visibility", description: "The right people are starting to notice." },
  { label: "Growth", description: "Demand is real, and the systems need to hold." },
  { label: "Scale", description: "What worked at a small size has to work at a larger one." },
];

export const projects: Project[] = [
  {
    id: "biggest-coil",
    title: "Biggest Coil Company",
    slug: "biggest-coil",
    client: "Biggest Coil",
    category: "Branding",
    description:
      "Logo design for a chain of office supply stores, built to read as secure and established while staying approachable.",
    year: "2025",
    featured: true,
    displayOrder: 1,
    coverImage: biggestCoil,
    size: "large",
    status: "published",
    overview:
      "Biggest Coil is a chain of stores selling office supplies. They needed a mark that could sit on storefronts, invoices, and packaging alike, and hold up at small sizes.",
    challenge:
      "The existing identity didn't communicate the scale or reliability of the business, and had no system for consistent use across store locations and materials.",
    approach:
      "We worked from the brand's initials to build a distinct, geometric letterform that could function as a standalone icon as well as a full wordmark lockup.",
    solution:
      "A flexible identity system with a icon mark that works independently of the wordmark, plus light, dark, and single-colour variants for different applications.",
    gallery: [biggestCoil],
    createdAt: "2025-01-10T00:00:00.000Z",
    updatedAt: "2025-01-10T00:00:00.000Z",
  },
  {
    id: "ikorodu-property-markets",
    title: "Ikorodu Property Markets",
    slug: "ikorodu-property-markets",
    client: "Ikorodu Property Markets",
    category: "Branding",
    description:
      "Brand identity for a property marketplace, designed to project credibility in a market where trust is the main currency.",
    year: "2025",
    featured: true,
    displayOrder: 2,
    coverImage: ikorodu,
    size: "medium",
    status: "published",
    overview:
      "Ikorodu Property Markets connects buyers, sellers, and renters in the Ikorodu property market — a space where credibility matters more than decoration.",
    challenge:
      "As a newer name in a market of established agencies, the brand needed to look immediately trustworthy without borrowing anyone else's visual language.",
    approach:
      "We built a mark and identity system rooted in structure and stability, avoiding decorative flourishes that could read as unserious.",
    solution:
      "A clean, confident identity designed to work across signage, listings, and print — built to be recognisable at a glance.",
    gallery: [ikorodu],
    createdAt: "2025-02-04T00:00:00.000Z",
    updatedAt: "2025-02-04T00:00:00.000Z",
  },
  {
    id: "great-minds-investments",
    title: "Great Minds Investments",
    slug: "great-minds-investments",
    client: "Great Minds Investments",
    category: "Logo Design",
    description: "Logo design for an investment firm positioning itself around clarity and long-term thinking.",
    year: "2025",
    featured: false,
    displayOrder: 3,
    coverImage: greatMinds,
    size: "small",
    status: "published",
    overview:
      "Great Minds Investments needed a mark that could sit comfortably next to established financial brands, without the budget of one.",
    challenge:
      "Financial identities lean heavily on a small set of visual clichés. The brand needed to feel credible without defaulting to them.",
    approach:
      "We focused on restraint — simple geometry, a considered typeface pairing, and a mark built to be legible at document and signage scale alike.",
    solution: "A composed, confidence-first identity built for use across statements, signage, and digital touchpoints.",
    gallery: [greatMinds],
    createdAt: "2025-03-01T00:00:00.000Z",
    updatedAt: "2025-03-01T00:00:00.000Z",
  },
  {
    id: "tabernacle-investments",
    title: "Tabernacle Investments",
    slug: "tabernacle-investments",
    client: "Tabernacle Investments",
    category: "Branding",
    description: "Full brand identity design for an investment company built on long-term client relationships.",
    year: "2024",
    featured: true,
    displayOrder: 4,
    coverImage: tabernacle,
    size: "medium",
    status: "published",
    overview:
      "Tabernacle Investments came to us without a consistent identity — different materials used different marks, colours, and type.",
    challenge:
      "Inconsistency was undermining trust before conversations with clients even started. The brand needed one system, used everywhere.",
    approach:
      "We defined a single identity — mark, colour palette, and type system — and documented how it should be used across every touchpoint.",
    solution:
      "A complete brand identity system built to give the business one consistent face, regardless of who is producing the material.",
    gallery: [tabernacle],
    createdAt: "2024-11-12T00:00:00.000Z",
    updatedAt: "2024-11-12T00:00:00.000Z",
  },
  {
    id: "ora-app",
    title: "Ora App",
    slug: "ora-app",
    client: "Ora",
    category: "Logo Design",
    description: "Logo design for a digital app product, built to work at the small scale app icons demand.",
    year: "2024",
    featured: false,
    displayOrder: 5,
    coverImage: ora,
    size: "small",
    status: "published",
    overview: "Ora is a digital app product that needed a mark able to hold its own on a home screen full of icons.",
    challenge:
      "App icons are judged in a grid, at a glance, often below a centimetre in size. Detail and subtlety don't survive that context.",
    approach:
      "We stripped the mark back to a single, simple form that stays legible from full size down to a home-screen icon.",
    solution: "A compact, single-form mark designed specifically for app-icon legibility, with a matching wordmark for wider use.",
    gallery: [ora],
    createdAt: "2024-08-20T00:00:00.000Z",
    updatedAt: "2024-08-20T00:00:00.000Z",
  },
  {
    id: "palmeira",
    title: "Palmeira",
    slug: "palmeira",
    client: "Palmeira",
    category: "Web Design",
    description: "Website design for Palmeira, focused on a clean, brand-aligned digital presence.",
    year: "2024",
    featured: false,
    displayOrder: 6,
    coverImage: palmeira,
    size: "small",
    status: "published",
    overview: "Palmeira needed a website that matched the quality of the brand it was representing.",
    challenge: "The brand had a clear identity offline, but no digital presence that reflected it.",
    approach: "We designed a site structure and visual treatment that carried the existing brand online without diluting it.",
    solution: "A clean, brand-aligned website built around clear navigation and consistent visual language.",
    gallery: [palmeira],
    createdAt: "2024-06-15T00:00:00.000Z",
    updatedAt: "2024-06-15T00:00:00.000Z",
  },
];

export const contactInfo = {
  whatsapp: ["+234 810 741 1921", "+1 (640) 269-8724"],
  emails: ["kandleagency.biz@yahoo.com", "uzodimmajoseph112@gmail.com"],
  phone: "+234 810 741 1921",
  mobile: "+234 907 908 3077",
  social: {
    facebook: "",
    twitter: "",
    instagram: "",
    behance: "",
    dribbble: "",
  },
};

export const serviceOptions = services.map((s) => s.name).concat(["Something else"]);

export const budgetRanges = [
  "Under ₦300,000",
  "₦300,000 – ₦1,000,000",
  "₦1,000,000 – ₦3,000,000",
  "₦3,000,000+",
  "Not sure yet",
];

export const timelineOptions = ["ASAP", "Within 1 month", "1–3 months", "3+ months", "Just exploring"];

export const mockLeads: Lead[] = [
  {
    id: "lead-1",
    name: "Adaeze Chukwu",
    email: "adaeze@brightlanehomes.com",
    company: "Brightlane Homes",
    phone: "+234 802 555 1120",
    service: "Brand Identity",
    budget: "₦1,000,000 – ₦3,000,000",
    timeline: "1–3 months",
    message: "We're rebranding ahead of a new development launch and need a full identity system.",
    status: "proposal",
    createdAt: "2026-08-18T09:20:00.000Z",
    updatedAt: "2026-08-24T11:00:00.000Z",
    lastContacted: "2026-08-24T11:00:00.000Z",
    nextFollowup: "2026-09-05T09:00:00.000Z",
    notes: [
      { id: "n1", body: "Sent proposal for full identity + guidelines.", createdAt: "2026-08-24T11:00:00.000Z" },
    ],
    source: "Website",
  },
  {
    id: "lead-2",
    name: "Tunde Bakare",
    email: "tunde@fixed.ng",
    company: "Fixed Logistics",
    service: "Web Design & Development",
    budget: "₦300,000 – ₦1,000,000",
    timeline: "ASAP",
    message: "Need a new site before end of quarter, current one doesn't reflect the business anymore.",
    status: "new",
    createdAt: "2026-08-29T14:05:00.000Z",
    updatedAt: "2026-08-29T14:05:00.000Z",
    source: "Website",
  },
  {
    id: "lead-3",
    name: "Ifeoma Nwosu",
    email: "ify@nwosuandco.com",
    company: "Nwosu & Co.",
    service: "Marketing",
    timeline: "Just exploring",
    message: "Exploring what a marketing retainer with an agency like yours would look like.",
    status: "contacted",
    createdAt: "2026-08-12T08:00:00.000Z",
    updatedAt: "2026-08-15T10:30:00.000Z",
    lastContacted: "2026-08-15T10:30:00.000Z",
    source: "Referral",
  },
  {
    id: "lead-4",
    name: "Segun Alabi",
    email: "segun@alabipack.com",
    company: "Alabi Packaging Co.",
    service: "Packaging",
    budget: "Under ₦300,000",
    timeline: "1–3 months",
    message: "Need packaging refreshed for three product lines.",
    status: "won",
    createdAt: "2026-07-02T12:00:00.000Z",
    updatedAt: "2026-08-01T09:00:00.000Z",
    lastContacted: "2026-08-01T09:00:00.000Z",
    source: "Instagram",
  },
];
