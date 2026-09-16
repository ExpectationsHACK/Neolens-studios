export type ServiceItem = {
  id: string;
  number: string;
  title: string;
  description: string;
  video: string;
  perfectFor?: string[];
  deliverables?: string[];
};

export const ALL_SERVICES: ServiceItem[] = [
  {
    id: "commercials",
    number: "01",
    title: "Commercials",
    description:
      "We create cinematic advertising and commercial films that help brands communicate their products, services and ideas with impact. From concept and scripting to production and post-production, we manage the process from beginning to end.",
    video: "/videos/bts/clapperboard.mp4",
    perfectFor: [
      "Product campaigns",
      "Brand launches",
      "Advertising campaigns",
      "Social media campaigns",
      "FMCG",
      "Retail campaigns",
    ],
  },
  {
    id: "brand-content",
    number: "02",
    title: "Brand Content",
    description:
      "We help brands build a consistent visual presence through high-quality content designed specifically for their platforms and audiences. Whether you need a single campaign or ongoing monthly content, we create a production system that keeps your brand visible and relevant.",
    video: "/videos/bts/crew-warehouse.mp4",
    perfectFor: [
      "Social media content",
      "Brand stories",
      "Campaign content",
      "Behind-the-scenes content",
      "Founder stories",
      "Product videos",
    ],
  },
  {
    id: "documentary-films",
    number: "03",
    title: "Documentary Films",
    description:
      "Real people. Real experiences. Real stories. We develop and produce documentaries that explore people, businesses, communities, institutions and ideas through authentic visual storytelling.",
    video: "/videos/bts/backstage.mp4",
    perfectFor: [
      "Corporate documentaries",
      "Founder stories",
      "Social impact stories",
      "Institutional documentaries",
      "Human-interest stories",
      "Brand documentaries",
    ],
  },
  {
    id: "corporate-video-events",
    number: "04",
    title: "Corporate Video & Events",
    description:
      "We capture conferences, launches, summits, AGMs, corporate events and other important moments with a professional multi-camera production approach. Our event coverage goes beyond simply recording what happened. We focus on capturing the energy, people, key moments and story of the event.",
    video: "/videos/bts/tv-manager.mp4",
    deliverables: [
      "Event highlights",
      "Recap films",
      "Interviews",
      "Social media cuts",
      "Full event recordings",
      "Same-week highlight delivery",
    ],
  },
  {
    id: "live-production",
    number: "05",
    title: "Live Production",
    description:
      "We provide professional production support for live events, broadcasts and hybrid experiences. Our team can handle multi-camera coverage, live switching, streaming and production coordination.",
    video: "/videos/bts/talkshow-bts.mp4",
    perfectFor: [
      "Concerts",
      "Conferences",
      "Award shows",
      "Product launches",
      "Church events",
      "Hybrid events",
      "Corporate broadcasts",
    ],
  },
  {
    id: "video-podcasts",
    number: "06",
    title: "Video Podcasts",
    description:
      "We produce professional video podcasts from studio or location. From camera and lighting setup to audio recording, directing and post-production, we create a complete visual podcast experience. We can also transform each episode into short-form content for social media.",
    video: "/videos/bts/interview-bts.mp4",
    deliverables: [
      "Full podcast episodes",
      "YouTube versions",
      "Short-form clips",
      "Reels",
      "TikTok content",
      "Audiograms",
    ],
  },
  {
    id: "talking-head-videos",
    number: "07",
    title: "Talking Head Videos",
    description:
      "Professional studio videos designed for businesses, executives, founders and professionals who need to communicate clearly on camera. We provide the production environment, lighting, cameras, sound and direction required to make your message look polished and professional.",
    video: "/videos/bts/cameraman-city.mp4",
    perfectFor: [
      "Founder videos",
      "Corporate announcements",
      "Educational content",
      "Training videos",
      "Social media content",
      "Brand communication",
    ],
  },
  {
    id: "photography",
    number: "08",
    title: "Photography",
    description:
      "We create professional photography for brands, businesses, products, people and events. From corporate portraits to campaign imagery and event photography, our photography service is designed to give your brand a consistent and professional visual identity.",
    video: "/videos/bts/crew-warehouse.mp4",
    perfectFor: [
      "Corporate portraits",
      "Campaign imagery",
      "Product photography",
      "Event photography",
      "Brand identity photography",
    ],
  },
];
