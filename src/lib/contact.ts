export const CONTACT = {
  whatsapp: "15415159726",
  email: "peptideempire4@gmail.com",
  phoneDisplay: "+1 (541) 515-9726",
};

export function waLink(message = "Hello Peptide Empire,\n\nI would like to place an order. Please assist me with pricing and delivery details.\n\nThank you.") {
  return `whatsapp://send?phone=${CONTACT.whatsapp}&text=${encodeURIComponent(message)}`;
}

export function mailLink(subject = "Product Inquiry – Peptide Empire", body = "Hello,\n\nI'd like to order:") {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}