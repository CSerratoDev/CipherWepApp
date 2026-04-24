// ─── César Cipher ───────────────────────────────────────────────────────────
// Direct TypeScript port of the C++ cesarEncrypt function

export function cesarEncrypt(text: string, shift: number): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const code = text.charCodeAt(i);
    if (c >= 'A' && c <= 'Z') {
      result += String.fromCharCode(((code + shift - 65) % 26 + 26) % 26 + 65);
    } else if (c >= 'a' && c <= 'z') {
      result += String.fromCharCode(((code + shift - 97) % 26 + 26) % 26 + 97);
    } else {
      result += c;
    }
  }
  return result;
}

export function cesarDecrypt(text: string, shift: number): string {
  return cesarEncrypt(text, -shift);
}

// ─── Vigenère Cipher ─────────────────────────────────────────────────────────
// Direct TypeScript port of the C++ vigenereEncrypt function

export function vigenereEncrypt(text: string, key: string): string {
  if (!key) return text;
  const normalizedKey = key.toLowerCase().replace(/[^a-z]/g, '');
  if (!normalizedKey) return text;

  let result = '';
  let keyIndex = 0;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const code = text.charCodeAt(i);
    const keyCode = normalizedKey.charCodeAt(keyIndex % normalizedKey.length);

    if (c >= 'A' && c <= 'Z') {
      // Matches C++: (c + key[keyIndex] - 2*65) % 26 + 65
      result += String.fromCharCode(((code + keyCode - 2 * 65) % 26 + 26) % 26 + 65);
      keyIndex++;
    } else if (c >= 'a' && c <= 'z') {
      // Matches C++: (c + key[keyIndex] - 2*97) % 26 + 97
      result += String.fromCharCode(((code + keyCode - 2 * 97) % 26 + 26) % 26 + 97);
      keyIndex++;
    } else {
      result += c;
    }
  }
  return result;
}

export function vigenereDecrypt(text: string, key: string): string {
  if (!key) return text;
  const normalizedKey = key.toLowerCase().replace(/[^a-z]/g, '');
  if (!normalizedKey) return text;

  let result = '';
  let keyIndex = 0;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const code = text.charCodeAt(i);
    const keyCode = normalizedKey.charCodeAt(keyIndex % normalizedKey.length);

    if (c >= 'A' && c <= 'Z') {
      result += String.fromCharCode(((code - keyCode) % 26 + 26) % 26 + 65);
      keyIndex++;
    } else if (c >= 'a' && c <= 'z') {
      result += String.fromCharCode(((code - keyCode) % 26 + 26) % 26 + 97);
      keyIndex++;
    } else {
      result += c;
    }
  }
  return result;
}
