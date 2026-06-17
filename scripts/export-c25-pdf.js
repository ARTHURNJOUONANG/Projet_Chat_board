const fs = require('fs')
const { marked } = require('marked')
const puppeteer = require('puppeteer')

async function run() {
  const mdPath = 'docs/C2.5-documentation.md'
  const cssPath = 'docs/pdf/c2.5-style.css'
  const outPath = 'docs/pdf/C2.5-documentation.pdf'

  const md = fs.readFileSync(mdPath, 'utf8')
  const css = fs.readFileSync(cssPath, 'utf8')

  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>${css}</style>
  </head>
  <body>
    ${marked.parse(md)}
  </body>
</html>`

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'networkidle0' })
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20mm',
      right: '16mm',
      bottom: '20mm',
      left: '16mm',
    },
  })

  await browser.close()
  console.log('Generated', outPath)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

