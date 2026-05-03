const fs = require('fs');
let envContent = fs.readFileSync('.env', 'utf8');

// Find the line starting with FIREBASE_PRIVATE_KEY
let lines = envContent.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith('FIREBASE_PRIVATE_KEY=')) {
    let keyLine = lines[i];
    // Fix common typos in the literal string:
    // replacing any backslash that is not followed by n with \n + the character
    // But be careful, maybe \r is there, so let's just fix the specific ones we saw,
    // or better, extract the base64 part, strip all backslashes and whitespace,
    // and re-wrap it to 64 columns!
    
    const match = keyLine.match(/FIREBASE_PRIVATE_KEY="?-----BEGIN PRIVATE KEY-----\\n(.*)\\n-----END PRIVATE KEY-----/);
    if (match) {
      const base64data = match[1].replace(/\\n/g, '').replace(/\\/g, ''); // Remove all \n and stray \
      
      const wrapped = base64data.match(/.{1,64}/g).join('\\n');
      lines[i] = `FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n${wrapped}\\n-----END PRIVATE KEY-----\\n"`;
    }
  }
}

fs.writeFileSync('.env', lines.join('\n'));
console.log('Fixed .env FIREBASE_PRIVATE_KEY');
