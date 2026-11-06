/** Verified business facts. No ZIP, hours, rank, or years-of-experience count. */

export const site = {
  name: "Computing Made Easy",
  smartHomeBrand: "Smart Touch Homes",
  domain: "https://computingmadeeasy.org",
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
  service: "Retired United States Air Force",
  certification: "Microsoft Certified Engineer",
  coLead: "Nathan JaraAlmonte",
  since: 2004,
  clientsLabel: "2500+",
  clientsApprox: "~2500",
  serviceArea: "Spring Hill, Brooksville, and Central Florida",
  bachelor: {
    name: "Bachelor of Science in Information Systems Security",
    school: "ITT Technical Institute",
    place: "Albuquerque, NM",
    date: "March 19, 2010",
    expertise: "ethical hacking",
  },
  associate: {
    name: "Associate of Applied Science in Information Technology – Computer Network Systems",
    school: "ITT Technical Institute",
    place: "Albuquerque, NM",
    date: "March 14, 2008",
  },
  honors:
    "Highest Honors Award (3.8–4.0 GPA across the entire degree program), ITT Technical Institute",
} as const;

export const smartHomePackages = [
  { id: "basic", price: "$1,500–$2,000", popular: false },
  { id: "standard", price: "$2,500–$3,500", popular: true },
  { id: "premium", price: "$4,000–$5,500", popular: false },
] as const;

export type PackageId = (typeof smartHomePackages)[number]["id"];
