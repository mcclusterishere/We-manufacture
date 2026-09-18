export const APP_NAME = "WE Manufacture";

export const brand = {
  name: "WE Manufacture",
  parent: "Whip Equipped",
  tagline: "In this together",
  email: "matthew@mccluster.org",
  founder: "Matthew McCluster",
  hq: "Connecticut",
  assembly: "Georgia. Site not chosen.",
};

export const nav = [
  { to: "/platform" as const, label: "The 125", line: "The bike", shot: "urban" as const },
  { to: "/build" as const, label: "Build", line: "The line", shot: "fleet" as const },
  { to: "/interest" as const, label: "The list", line: "Get on it", shot: "front" as const },
];

export const stats = [
  { kicker: "The bike", value: "125cc", note: "Mini. Street. Made for the city." },
  { kicker: "The number", value: "$2,995", note: "What we are building toward. Not a price yet." },
  { kicker: "Year one", value: "500", note: "A ramp target. Not a waitlist. Not orders." },
  { kicker: "The line", value: "US", note: "Final assembly here. Georgia is in front. Site still open." },
] as const;

export const principles = [
  {
    num: "01",
    title: "Looks like us.",
    body: "Bodywork, light, stance, the wrench mark. That is WE. The motor is a tool. The bike has to look like it belongs to us.",
  },
  {
    num: "02",
    title: "Rides like a 125.",
    body: "Engine, brakes, shocks, controls that already work. We do not invent a mill to prove a point.",
  },
  {
    num: "03",
    title: "Built here.",
    body: "A short American line. Receive, assemble, check, ship. Georgia is in front. The site is not chosen.",
  },
  {
    num: "04",
    title: "Always findable.",
    body: "Find it. Fence it. Know if it needs a chain. The radio lives in the harness from day one.",
  },
] as const;

export const phases = [
  {
    id: "p0",
    short: "P0",
    label: "Run",
    badge: "Bones",
    copy: "Catalog guts, ridden hard. Engine, frame, brakes, wiring room. Prove it before we spend on a face.",
  },
  {
    id: "p1",
    short: "P1",
    label: "Face",
    badge: "Ours",
    copy: "Same bones. Our body, our light, our bars, our mark. The first bike that looks like it belongs here.",
  },
  {
    id: "p2",
    short: "P2",
    label: "Gold",
    badge: "Repeat",
    copy: "The one the line has to copy. Parts list frozen. Process written. No guessing on the floor.",
  },
  {
    id: "scale",
    short: "US",
    label: "Line",
    badge: "Home",
    copy: "Hire the first crew. Stand up a short line. Ship the first honest units from America.",
  },
] as const;

export const stack = [
  { title: "The bike", body: "A 125 you throw a leg over. City range. Built to be ridden." },
  { title: "The radio", body: "Where it is. If it should be moving. Designed into the harness." },
  { title: "The people", body: "Riders, fleets, clubs. Direct. Dealers later, on purpose." },
  { title: "The line", body: "Final assembly in America. A floor we have not opened yet." },
] as const;

export const specs = [
  { group: "Powertrain", items: [
    { label: "Motor", value: "About 125cc four stroke, air cooled, EFI", note: "The class. Exact mill not frozen." },
    { label: "Gearbox", value: "Manual", note: "A gearbox you can service. Ratio count still open." },
    { label: "Drive", value: "Chain", note: "Because chains get fixed on a Tuesday." },
  ]},
  { group: "Chassis", items: [
    { label: "Form", value: "Grom class mini", note: "Short wheelbase. About 12 inch wheels. City stance." },
    { label: "Brakes", value: "Hydraulic discs", note: "Has to pass FMVSS 122. That is the work." },
    { label: "Suspension", value: "Inverted fork, dual rear", note: "What we are aiming to spec. Not locked." },
  ]},
  { group: "Connected", items: [
    { label: "Core", value: "GNSS and cellular in the harness", note: "Generation one. Not optional." },
    { label: "What it does", value: "Find it, fence it, know if it is out", note: "The jobs that earn the radio." },
    { label: "Service", value: "Not priced", note: "We do not sell a plan until we know what the radio costs." },
  ]},
  { group: "Program", items: [
    { label: "Ask", value: "About $2,995", note: "The number we are building toward." },
    { label: "How it ships", value: "Direct first", note: "Dealers later. On purpose." },
    { label: "Status", value: "Not in production", note: "Not certified. Not for sale. Not on a truck." },
  ]},
] as const;

export const lanes = [
  { id: "rider", label: "Rider", subject: "WE 125 rider", blurb: "You want the first one. Say where you ride." },
  { id: "fleet", label: "Fleet", subject: "WE 125 fleet", blurb: "You run bikes for money. Tell us how many." },
  { id: "dealer", label: "Shop", subject: "WE 125 shop", blurb: "You are looking. We are not signing yet." },
  { id: "supplier", label: "Supplier", subject: "WE 125 supplier", blurb: "You make parts. Send what you actually make." },
  { id: "gov", label: "Town", subject: "WE 125 site", blurb: "You have a building. Be specific." },
  { id: "club", label: "Club", subject: "WE 125 club", blurb: "You ride together. We design with people who do." },
] as const;

export type LaneId = (typeof lanes)[number]["id"];

export const claims = [
  "Not federally certified.",
  "Production has not started.",
  "Oreion Motors helps with prototype, planning, and certification on contract. They do not own WE.",
  "500 is a year one target, not orders.",
  "Georgia has not given us land, a building, or a grant.",
  "$2,995 is a target, not a price.",
  "Connected service is not for sale yet.",
  "No KBB, no NADA, no consumer financing. Not yet.",
] as const;

export const ticker = [
  "WE 125",
  "The city motorcycle",
  "Assembled in America",
  "Connected from day one",
  "In this together",
  "Get on the list",
];

export function laneById(id: string) {
  return lanes.find((lane) => lane.id === id) ?? lanes[0];
}

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string) {
  if (!path.startsWith("/")) return path;
  return `${assetBase}${path}`;
}

const WE125 = asset("/media/we-125");

export const shots = {
  curbside: `${WE125}/we-125-front-three-quarter-curbside.png`,
  urban: `${WE125}/we-125-front-three-quarter-urban.png`,
  profile: `${WE125}/we-125-side-profile-studio.png`,
  rear: `${WE125}/we-125-rear-three-quarter-studio.png`,
  cutout: `${WE125}/we-125-cutout-side-profile.png`,
  front: `${WE125}/we-125-detail-front-end.png`,
  mid: `${WE125}/we-125-detail-mid-body.png`,
  tail: `${WE125}/we-125-detail-tail.png`,
  fleet: `${WE125}/we-125-fleet-lineup-curbside.png`,
  rider: `${WE125}/we-125-rider-curbside.png`,
} as const;

export const renderNote = "Render. Not a built unit.";
