export type ServiceItem = {
  id: string;
  number: string;
  title: string;
  /** One-line summary for the homepage carousel card. */
  tagline: string;
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
    tagline: "TV and online ads, from script to final grade.",
    description:
      "We make TV and online ads for products, services and campaigns. We handle the concept, script, shoot, edit and colour grade, and deliver a version for each platform the campaign runs on.",
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
    tagline: "Monthly social videos, reels and campaign content.",
    description:
      "We produce regular video and photo content for your social channels and campaigns, shot in one consistent style so your audience recognises your brand. Book a single campaign or a monthly package.",
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
    tagline: "Films about people, companies and communities.",
    description:
      "We research, film and edit documentaries about people, businesses, communities and institutions, built on interviews and real footage rather than staged scenes.",
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
    tagline: "Multi-camera event coverage, with same-week highlights.",
    description:
      "We film conferences, launches, summits, AGMs and company events with multiple cameras. You get highlight films, full recordings, interviews and social cuts, with highlights delivered the same week.",
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
    tagline: "Switching, streaming and broadcast for live and hybrid events.",
    description:
      "We run multi-camera live production for events, broadcasts and hybrid events: the cameras, live switching, streaming to your platforms and coordination on site.",
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
    tagline: "Full episodes in studio or on location, plus short clips.",
    description:
      "We film video podcasts in a studio or on location, covering cameras, lighting, audio recording, directing and editing. Each episode can also be cut into short clips for Reels, TikTok and YouTube Shorts.",
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
    tagline: "Studio, lighting and direction for leaders on camera.",
    description:
      "Studio videos for executives, founders and professionals who need to speak on camera. We provide the studio, lighting, cameras, sound and on-set direction, then edit the video for your channels.",
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
    tagline: "Portraits, product, campaign and event photography.",
    description:
      "We shoot corporate portraits, product photography, campaign imagery and event photography, edited to one consistent style across your brand.",
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
