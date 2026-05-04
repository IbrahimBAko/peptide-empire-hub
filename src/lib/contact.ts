export const CONTACT = {
  whatsapp: "1234567890", // placeholder, replace with full intl number, no +
  telegram: "peptideempire", // placeholder username
  email: "contact@peptideempire.com", // placeholder
  phoneDisplay: "+1 (234) 567-890",
};

export function waLink(message = "Hello, I'm interested in ordering peptides.") {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function tgLink(message = "Hello, I'm interested in ordering peptides.") {
  return `https://t.me/${CONTACT.telegram}?text=${encodeURIComponent(message)}`;
}

export function mailLink(subject = "Peptide Order Inquiry", body = "Hello,\n\nI'd like to order:") {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}