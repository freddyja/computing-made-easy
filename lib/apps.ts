/** App Center directory captured from https://computingmadeeasy.org/app-center on 2026-11-06. Names and taglines are the clients' own wording. */

export type AppGroupId =
  | "home-trade"
  | "food"
  | "faith"
  | "creative"
  | "business"
  | "tools";

export type CatalogApp = {
  href: string;
  subcategory: string;
  name: string;
  tagline: string;
  external: boolean;
};

export const appGroups: { id: AppGroupId; apps: CatalogApp[] }[] = [
  {
    id: "home-trade",
    apps: [
      {
        href: "https://computingmadeeasy.org/anibal-handyman/",
        subcategory: "Home Services",
        name: "Anibal Maldonado\nHandyman",
        tagline: "Quality Work. Reliable Hands. — Service booking and requests for a trusted local handyman.",
        external: false,
      },
      {
        href: "https://computingmadeeasy.org/organic-house-cleaning/",
        subcategory: "Cleaning",
        name: "Organic House\nCleaning",
        tagline: "Anne & Rosana — Clean · Organize · Refresh. Free quote PWA; organic & pet friendly. From $150*.",
        external: false,
      },
      {
        href: "https://computingmadeeasy.org/russ-bogun-auto/",
        subcategory: "Automotive",
        name: "Russ Bogun\nAuto Repair",
        tagline: "Honest Work. Trusted Hands. — Full-service auto repair in English, Spanish & Portuguese.",
        external: false,
      },
      {
        href: "https://computingmadeeasy.org/gt-details/",
        subcategory: "Automotive",
        name: "G.T.\nDetails",
        tagline: "Mobile car detailing — we come to you. Wash, wax & full details in English & Spanish. Installable app.",
        external: false,
      },
      {
        href: "https://computingmadeeasy.org/chairside/",
        subcategory: "Health",
        name: "ChairSide\nNotes",
        tagline: "Just talk — your notes write themselves. Dictate after each visit for a SOAP note, summary & transcript, filed by patient. English & Spanish. Installable app.",
        external: false,
      },
      {
        href: "https://computingmadeeasy.org/arcup-electrical/",
        subcategory: "Electrical Services",
        name: "ArcUp\nElectrical",
        tagline: "Electrical Work Done Right. — Panel upgrades, EV charger installs, wiring & surge protection.",
        external: false,
      },
      {
        href: "https://computingmadeeasy.org/pedro-woodcraft/",
        subcategory: "Custom Woodworking",
        name: "Pedro's Cuban\nWoodcraft",
        tagline: "Hecho a mano con amor. — Handcrafted rockers & tables by master carpenter Pedro Fernandez, Brooksville FL.",
        external: false,
      },
      {
        href: "https://computingmadeeasy.org/enclosed-trailer/",
        subcategory: "Trailers",
        name: "Enclosed\nTrailer",
        tagline: "Hermes Cargo LLC customer catalog — enclosed cargo trailers. Douglas GA · 912-383-0222.",
        external: false,
      },
    ],
  },
  {
    id: "food",
    apps: [
      {
        href: "https://computingmadeeasy.org/paella-de-yoansy/",
        subcategory: "Food & Catering",
        name: "La Paella\nde Yoansy",
        tagline: "Spanish Soul. Cuban Heart. — Authentic handcrafted paella delivered in Spring Hill, FL.",
        external: false,
      },
      {
        href: "https://computingmadeeasy.org/frutas-de-yuniert/",
        subcategory: "Fresh Produce",
        name: "Frutas\nde Yuniert",
        tagline: "Sun-ripened tropical fruits delivered fresh — mangoes, coconuts, papaya & more across Miami-Dade.",
        external: false,
      },
      {
        href: "https://computingmadeeasy.org/brazilian-acai/",
        subcategory: "Food & Beverages",
        name: "Brazilian\nAçaí",
        tagline: "Fresh · Natural · Made with Love. — Customizable açaí bowls with fresh fruits & toppings, delivery & pickup.",
        external: false,
      },
      {
        href: "https://computingmadeeasy.org/olas-ordering/",
        subcategory: "Food & Catering",
        name: "Ola's Route 66\nLunch Box",
        tagline: "Mobile menu and cart. Wed–Sat 8:00 AM–1:00 PM Mountain. Text 505-288-7576 — you tap Send.",
        external: false,
      },
      {
        href: "https://computingmadeeasy.org/hotdog-stop-demo/",
        subcategory: "Food & Beverages",
        name: "Hot Dog Stop\nAI Ordering Demo",
        tagline: "Type or speak your order and the AI walks you through a Brooksville, FL food truck menu. Demo only — not affiliated, no payments, no orders sent.",
        external: false,
      },
    ],
  },
  {
    id: "faith",
    apps: [
      {
        href: "https://computingmadeeasy.org/fire-and-fellowship/",
        subcategory: "Faith & Community",
        name: "Fire and\nFellowship",
        tagline: "Household & Headship. — Verses and prayers on a man's calling to lead, love, and father well.",
        external: false,
      },
      {
        href: "https://computingmadeeasy.org/faithful-service-network/",
        subcategory: "Faith-Based Directory",
        name: "Faithful Service\nNetwork",
        tagline: "Christian businesses supporting each other to serve customers better — browse, request quotes & connect.",
        external: false,
      },
      {
        href: "https://computingmadeeasy.org/kingdom-sisters/",
        subcategory: "Women's Faith Community",
        name: "Kingdom\nSisters",
        tagline: "She is clothed with strength & dignity. — Scripture, weekly challenges, prayer requests & fellowship for women of faith.",
        external: false,
      },
      {
        href: "https://computingmadeeasy.org/fathers-charge/",
        subcategory: "Men's Faith Ministry",
        name: "The Father's\nCharge",
        tagline: "Fathers of All Ages & Stages Welcome. — Weekly scripture, discussion & prayer equipping men to lead their families well.",
        external: false,
      },
      {
        href: "https://computingmadeeasy.org/60-Seconds-in-the-Word-for-women/",
        subcategory: "Daily Devotional · Women",
        name: "60 Seconds in\nthe Word — Sisters",
        tagline: "A minute with the Word, sister. — One-minute devotionals in English, Spanish & Portuguese: 15 themes, plus a Proverbs 31 chapter walk.",
        external: false,
      },
      {
        href: "https://computingmadeeasy.org/60-seconds-in-the-word/",
        subcategory: "Daily Devotional · Men",
        name: "60 Seconds in\nthe Word — Brothers",
        tagline: "A minute with the Word, brother. — One-minute daily devotionals for Fire Fellowship in English, Spanish & Portuguese.",
        external: false,
      },
      {
        href: "https://computingmadeeasy.org/biblical-pharmacy/",
        subcategory: "Biblical Herbalism",
        name: "Biblical\nPharmacy",
        tagline: "God placed these healing herbs on earth with a purpose. — Educational guide to healing plants & herbs mentioned in Scripture, for reflection & study.",
        external: false,
      },
      {
        href: "https://www.etsy.com/listing/4582102485/biblical-pharmacy-educational-herb",
        subcategory: "Digital Education Store",
        name: "Biblical Pharmacy\n— Etsy",
        tagline: "226-plant educational library on Etsy — faith-based herbal reference in English, Spanish & Portuguese. $9.99 digital download.",
        external: true,
      },
      {
        href: "https://computingmadeeasy.org/christian-food-pantry-intake/",
        subcategory: "Community Outreach",
        name: "Shady Hills Mission\nChapel — Pantry",
        tagline: "Serving neighbors in need. — Digital check-in system for the chapel's food pantry, one visit per household per month.",
        external: false,
      },
      {
        href: "https://computingmadeeasy.org/bible-verse-tracker/",
        subcategory: "Scripture Study Tool",
        name: "The Living\nWord",
        tagline: "Read and study Scripture, with prayer guides and sermon outlines — private notes stay on your device, no account needed.",
        external: false,
      },
      {
        href: "https://computingmadeeasy.org/fruit-of-the-spirit/",
        subcategory: "Scripture Practice",
        name: "Fruit of the\nSpirit",
        tagline: "Read the Scriptures and keep a private practice of the nine fruits — stays on your device, no account needed.",
        external: false,
      },
    ],
  },
  {
    id: "creative",
    apps: [
      {
        href: "https://computingmadeeasy.org/hannah-creations/",
        subcategory: "Custom Jewelry",
        name: "Hannah's\nCreations",
        tagline: "Handcrafted with faith. — Name necklaces, charm bracelets, birthstone pendants & more. Ships in 3–5 days.",
        external: false,
      },
      {
        href: "https://computingmadeeasy.org/doula-edu/",
        subcategory: "Education & Wellness",
        name: "Doula\nEdu",
        tagline: "Birth prep with lessons, positioning, nutrition, labor-readiness habits, and an evidence track. Wellness education for expectant families — not medical advice.",
        external: false,
      },
    ],
  },
  {
    id: "business",
    apps: [
      {
        href: "https://getgloballisting.com/Grokbot%20GGL/Get%20Global%20Listing/index.html",
        subcategory: "Customer Intake",
        name: "GGL Customer\nIntake",
        tagline: "Get Global Listing customer intake form. Share your business details to get listed.",
        external: true,
      },
    ],
  },
  {
    id: "tools",
    apps: [
      {
        href: "https://meeting-translator-captions.onrender.com/",
        subcategory: "Live Translation Tool",
        name: "Meeting\nTranslator",
        tagline: "Live multilingual captions in English, Spanish & Portuguese — stream your phone's captions straight to the TV for everyone to follow along.",
        external: true,
      },
      {
        href: "https://fire-fellowship-captions.onrender.com/",
        subcategory: "Live Captions Tool",
        name: "Fire & Fellowship\nLive Captions",
        tagline: "Real-time captions for Fire and Fellowship gatherings in English, Spanish & Portuguese — follow along on any device.",
        external: true,
      },
      {
        href: "https://360show.vercel.app/",
        subcategory: "Booth App",
        name: "360\nShow",
        tagline: "Remote booth app for capture, frames, and music at a live event.",
        external: true,
      },
      {
        href: "https://computingmadeeasy.org/life-church-tap/",
        subcategory: "Church",
        name: "Life Church\nSpring Hill",
        tagline: "Events and groups for Life Church Spring Hill.",
        external: false,
      },
      {
        href: "https://party-requests-flax.vercel.app/r",
        subcategory: "Party App",
        name: "Party Song\nRequests",
        tagline: "Guests scan a QR code and request songs from Spotify in English, Spanish & Portuguese — the host approves them and puts the queue on the TV.",
        external: true,
      },
    ],
  },
];

export const allApps = appGroups.flatMap((group) =>
  group.apps.map((app) => ({ ...app, groupId: group.id })),
);
