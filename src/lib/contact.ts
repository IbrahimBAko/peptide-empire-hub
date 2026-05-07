export const CONTACT = {
  whatsapp: "673258790",
  telegram: "673258790",
  email: "peptideempire4@gmail.com",
  phoneDisplay: "+673 258 790",
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