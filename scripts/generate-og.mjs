#!/usr/bin/env node
// Gera a imagem de preview de link (Open Graph) da Shift Jundiaí.
//
// É a foto que aparece quando alguém cola o link do site no WhatsApp, Instagram,
// etc. — a foto da Shift com a mensagem "ONDE MUDAR É SÓ O COMEÇO" por cima.
//
// Pega a foto do hero (public/images/shift-training-wide.jpeg), escurece com um
// gradiente pra leitura, aplica a marca + headline e exporta um JPEG otimizado
// (1200x630, leve o bastante pro crawler do WhatsApp renderizar) em:
//   public/images/og-shift.jpg
//
// Rode sempre que mudar a foto ou o texto:
//   node scripts/generate-og.mjs

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(root, "public/images/shift-training-wide.jpeg");
const OUTPUT = join(root, "public/images/og-shift.jpg");

const WIDTH = 1200;
const HEIGHT = 630;

// Pilha de fontes pesadas que existem no macOS/Linux. font-weight 900 deixa o
// headline com o peso da identidade (Archivo Black) mesmo sem a fonte instalada.
const SANS =
  "'Archivo Black','Helvetica Neue',Helvetica,'Arial Black',Arial,sans-serif";

const overlay = `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ring" x1="11" y1="105" x2="113" y2="18" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFB000"/>
      <stop offset=".5" stop-color="#FF5C00"/>
      <stop offset="1" stop-color="#E6007E"/>
    </linearGradient>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#070809" stop-opacity="0.15"/>
      <stop offset="0.5" stop-color="#070809" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#070809" stop-opacity="0.94"/>
    </linearGradient>
    <linearGradient id="shadeLeft" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#070809" stop-opacity="0.82"/>
      <stop offset="0.6" stop-color="#070809" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#shade)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#shadeLeft)"/>

  <!-- Marca Shift -->
  <g transform="translate(80,66) scale(0.43)">
    <circle cx="64" cy="64" r="61" fill="#090A0B" stroke="url(#ring)" stroke-width="5"/>
    <path d="M45 28L84 58L98 69L84 80L45 110V83L69 64L45 46V28Z" fill="#FF5C00"/>
  </g>
  <text x="146" y="108" font-family="${SANS}" font-weight="900" font-size="38" letter-spacing="6" fill="#F7F5F2">SHIFT</text>
  <text x="338" y="107" font-family="${SANS}" font-weight="700" font-size="20" letter-spacing="5" fill="#9FA3A7">ESTÚDIO · JUNDIAÍ</text>

  <!-- Headline -->
  <rect x="82" y="356" width="62" height="6" rx="3" fill="#FF5C00"/>
  <text x="80" y="470" font-family="${SANS}" font-weight="900" font-size="94" letter-spacing="-2" fill="#F7F5F2">ONDE MUDAR</text>
  <text x="80" y="562" font-family="${SANS}" font-weight="900" font-size="94" letter-spacing="-2" fill="#FF5C00">É SÓ O COMEÇO</text>
</svg>`;

const base = sharp(SOURCE).resize(WIDTH, HEIGHT, {
  fit: "cover",
  position: "attention",
});

const buffer = await base
  .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
  .jpeg({ quality: 84, mozjpeg: true })
  .toBuffer();

await writeFile(OUTPUT, buffer);

const kb = Math.round(buffer.length / 1024);
console.log(`✓ Gerado: public/images/og-shift.jpg (${WIDTH}x${HEIGHT}, ${kb} KB)`);
if (kb > 300) {
  console.warn(
    "⚠  Acima de ~300 KB — o WhatsApp pode não renderizar como preview grande. Reduza a quality.",
  );
}
