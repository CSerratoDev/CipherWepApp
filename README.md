
## test# CipherLab — César & Vigenère

Aplicación web que implementa los cifrados clásicos **César** y **Vigenère**, con los algoritmos portados directamente desde C++ a TypeScript.

## Stack

- **Vite + React + TypeScript** — frontend moderno y tipado
- **Netlify** — deploy continuo desde Git

## Algoritmos

### César (`src/ciphers.ts`)
Puerto directo del código C++:
```cpp
// C++ original
result += char(int(c + shift - 65) % 26 + 65);

// TypeScript equivalente
result += String.fromCharCode(((code + shift - 65) % 26 + 26) % 26 + 65);
```
> Se añade `+ 26) % 26` para manejar shifts negativos correctamente en JS.

### Vigenère (`src/ciphers.ts`)
Porto directo del código C++:
```cpp
// C++ original
result += char(int(c + key[keyIndex] - 2 * 65) % 26 + 65);

// TypeScript equivalente
result += String.fromCharCode(((code + keyCode - 2 * 65) % 26 + 26) % 26 + 65);
```

## Desarrollo local

```bash
npm install
npm run dev
```
## Estructura del proyecto

```
cipher-app/
├── src/
│   ├── ciphers.ts      # Algoritmos César y Vigenère (port desde C++)
│   ├── App.tsx         # Componente principal con UI
│   ├── App.css         # Estilos (tema terminal oscuro)
│   └── main.tsx        # Entry point
├── netlify.toml        # Configuración de deploy
├── vite.config.ts
└── package.json
```
