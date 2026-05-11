export const CONTACT = {
  whatsapp: "237673258790",
  telegram: "+237673258790",
  email: "peptideempire4@gmail.com",
  phoneDisplay: "+237 673 258 790",
};

export function waLink(message = "Hello, I'm interested in ordering peptides.") {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function tgLink(message = "Hello, I'm interested in ordering peptides.") {
  // Phone-based Telegram invite link. Text param is appended for compatibility
  // with username links; phone-invite chats may require pasting manually.
  return `https://t.me/${CONTACT.telegram}?text=${encodeURIComponent(message)}`;
}

export function mailLink(subject = "Product Inquiry – Peptide Empire", body = "Hello,\n\nI'd like to order:") {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}