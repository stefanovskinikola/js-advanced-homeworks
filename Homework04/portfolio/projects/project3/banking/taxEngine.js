import { sectorRules } from "../data/sectorRules.js";

export function calculateTax(amount, senderSector, receiverSector) {
  let baseTax = 0;
  let commTax = 0;

  // Sender sector tax
  if (senderSector === "Mars") baseTax = amount * sectorRules.Mars.taxRate;
  else if (senderSector === "Earth")
    baseTax = amount * sectorRules.Earth.taxRate;
  else if (senderSector === "Belt") baseTax = amount * sectorRules.Belt.taxRate;

  // Inter-sector communication tax
  if (senderSector !== receiverSector) {
    if (senderSector === "Mars" && receiverSector === "Earth")
      commTax = amount * sectorRules.Mars.communicationTax;
    else if (senderSector === "Mars" && receiverSector === "Belt")
      commTax = amount * sectorRules.Mars.communicationTax;
    else if (senderSector === "Earth" && receiverSector === "Mars")
      commTax = amount * sectorRules.Earth.communicationTax;
    else if (senderSector === "Earth" && receiverSector === "Belt")
      commTax = amount * sectorRules.Earth.communicationTax;
    else if (senderSector === "Belt" && receiverSector === "Mars")
      commTax = amount * sectorRules.Belt.communicationTax;
    else if (senderSector === "Belt" && receiverSector === "Earth")
      commTax = amount * sectorRules.Belt.communicationTax;
  }

  return baseTax + commTax;
}
