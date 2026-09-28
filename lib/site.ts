/** Shared site content — real contact/business facts from live WP audit. */

export const site = {
  name: "Computing Made Easy",
  smartHomeBrand: "Smart Touch Homes",
  phone: "407-925-2589",
  phoneTel: "+14079252589",
  email: "freddy@computingmadeeasy.org",
  address: {
    line1: "1720 Alameda Dr",
    city: "Spring Hill",
    state: "FL",
    full: "1720 Alameda Dr, Spring Hill FL",
  },
  owner: "Freddy Jara-Almonte",
  ownerCreds: "Retired USAF",
  coOwner: "Nathan JaraAlmonte",
  since: 2004,
  clientsApprox: 2500,
  serviceArea: "Spring Hill, Brooksville, and Central Florida",
} as const;

export const navLinks = [
  { href: "/business-it", label: "Business IT" },
  { href: "/smart-home", label: "Smart Home" },
  { href: "/security", label: "Security" },
  { href: "/contact", label: "Contact" },
] as const;

/** Smart-home package ranges from live WordPress site — confirm later. */
export const smartHomePackages = [
  {
    id: "basic",
    name: "Basic",
    subtitle: "Great for starters",
    price: "$1,500–$2,000",
    popular: false,
    features: [
      "Ring doorbell",
      "Echo Dot",
      "Philips Hue starter bulbs",
      "eero Wi-Fi setup",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    subtitle: "Best balance & coverage",
    price: "$2,500–$3,500",
    popular: true,
    features: [
      "Ring doorbell + 2 cameras",
      "Echo Show 8",
      "Expanded Philips Hue",
      "eero 6+",
      "Door/window sensors",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    subtitle: "Whole-home intelligence",
    price: "$4,000–$5,500",
    popular: false,
    features: [
      "4 cameras",
      "Echo Show 10",
      "Whole-home Philips Hue",
      "eero Pro 6E",
      "Smart locks & thermostats",
    ],
  },
] as const;
