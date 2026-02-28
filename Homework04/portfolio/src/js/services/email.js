export function initEmailService() {
  emailjs.init({
    publicKey: "dpOoidKudU1IIfR86",
  });
}

export async function sendContactEmail(formElement) {
  const SERVICE_ID = "service_drruus5";
  const TEMPLATE_ID = "template_nnt8k77";
  return await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formElement);
}
