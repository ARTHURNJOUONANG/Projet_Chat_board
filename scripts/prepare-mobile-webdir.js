/**
 * Crée un dossier out/ minimal pour Capacitor quand on utilise l'URL distante
 * (CareerAI charge https://www.careerai.live dans la WebView).
 */
const fs = require('fs')
const path = require('path')

const outDir = path.join(process.cwd(), 'out')
const remoteUrl = process.env.CAPACITOR_REMOTE_URL || 'https://www.careerai.live'

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

const indexHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>CareerAI</title>
  <meta http-equiv="refresh" content="0;url=${remoteUrl}" />
</head>
<body>
  <p>Chargement de CareerAI…</p>
  <p><a href="${remoteUrl}">Ouvrir l'application</a></p>
</body>
</html>
`

fs.writeFileSync(path.join(outDir, 'index.html'), indexHtml, 'utf8')
console.log('Mobile webDir ready:', outDir, '→', remoteUrl)
