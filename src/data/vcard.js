import { CONTACT } from './content.js'; // O './content.jsx' dependiendo de cómo esté en el original

// Genera y descarga un archivo .vcf con los datos de contacto.
export function downloadVCard(roleLine) {
  const vcf = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:Barbaran Cotrina;Dihenrry;;;`,
    `FN:${CONTACT.name}`,
    `TITLE:${roleLine}`,
    `TEL;TYPE=CELL:${CONTACT.phone}`,
    `EMAIL;TYPE=INTERNET:${CONTACT.email}`,
    `URL:${CONTACT.web}`,
    `URL:${CONTACT.github}`,
    `URL;TYPE=LinkedIn:${CONTACT.linkedin}`,
    `ADR;TYPE=HOME:;;;Madrid;;;España`,
    `NOTE:${roleLine} — Madrid`,
    'END:VCARD',
  ].join('\r\n');

  const blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Dihenrry-Barbaran-Cotrina.vcf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}