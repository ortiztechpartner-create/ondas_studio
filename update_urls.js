const fs = require('fs');
const filePath = 'h:/Mi unidad/OTD/ondas_studio/app.js';
let data = fs.readFileSync(filePath, 'utf8');

// Replace all WhatsApp buyUrls with the BeatStars URL
data = data.replace(/buyUrl:\s*["']https:\/\/wa\.me\/[^"']+["']/g, 'buyUrl: "https://www.beatstars.com/yosoygka"');

fs.writeFileSync(filePath, data);
console.log('Successfully updated buyUrls');
