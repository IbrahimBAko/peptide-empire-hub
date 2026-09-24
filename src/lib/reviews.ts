import reviewer1 from "@/assets/reviewers-uploaded/reviewer-1.webp.asset.json";
import reviewer2 from "@/assets/reviewers-uploaded/reviewer-2.jpeg.asset.json";
import reviewer3 from "@/assets/reviewers-uploaded/reviewer-3.jpeg.asset.json";
import reviewer4 from "@/assets/reviewers-uploaded/reviewer-4.jpeg.asset.json";
import reviewer5 from "@/assets/reviewers-uploaded/reviewer-5.jpeg.asset.json";
import reviewer6 from "@/assets/reviewers-uploaded/reviewer-6.jpeg.asset.json";

export type Review = {
  name: string;
  role: string;
  location: string;
  rating: 5;
  title: string;
  body: string;
  verified: boolean;
  avatar: string;
};

export const REVIEW_COUNT = 148;
export const REVIEW_AVERAGE = 4.9;

export const reviews: Review[] = [
  {
    name: "Dr. M. Halvorsen",
    avatar: reviewer1.url,
    role: "Research Lead, Clinical Endocrinology",
    location: "Oslo, Norway",
    rating: 5,
    title: "Purity matches the paperwork",
    body: "Consistent results batch after batch. The COA documentation is the most thorough we have worked with, and the values line up with our own in-house HPLC checks.",
    verified: true,
  },
  {
    name: "Aisha R.",
    avatar: reviewer2.url,
    role: "Procurement, Compounding Pharmacy",
    location: "Dubai, UAE",
    rating: 5,
    title: "Flawless logistics",
    body: "Every shipment has arrived intact and on schedule. Packaging is discreet, vials are perfectly sealed and clearly labelled — no guesswork in the lab.",
    verified: true,
  },
  {
    name: "J. Okafor",
    avatar: reviewer3.url,
    role: "Regional Distributor, EMEA",
    location: "Lagos, Nigeria",
    rating: 5,
    title: "Scaled us across three regions",
    body: "The wholesale programme made it possible to grow distribution across three regions in under six months. Pricing is transparent and restocks are quick.",
    verified: true,
  },
  {
    name: "Dr. L. Ferreira",
    avatar: reviewer4.url,
    role: "Principal Investigator, Peptide Chemistry",
    location: "São Paulo, Brazil",
    rating: 5,
    title: "Documentation on request, always",
    body: "I asked for the batch certificate before ordering and had it the same day. That level of openness is rare and it is why we keep coming back.",
    verified: true,
  },
  {
    name: "H. Nakamura",
    avatar: reviewer5.url,
    role: "Lab Manager, Biotech Startup",
    location: "Osaka, Japan",
    rating: 5,
    title: "Support that actually answers",
    body: "Questions about storage and reconstitution were answered within the hour on WhatsApp. Practical, technical answers — not sales talk.",
    verified: true,
  },
  {
    name: "S. Whitfield",
    avatar: reviewer6.url,
    role: "Independent Distributor",
    location: "Manchester, UK",
    rating: 5,
    title: "Ordering is refreshingly simple",
    body: "Cart, inquiry, confirmation — done in two minutes. Invoicing and payment options were flexible and the order was dispatched the next morning.",
    verified: true,
  },
];
