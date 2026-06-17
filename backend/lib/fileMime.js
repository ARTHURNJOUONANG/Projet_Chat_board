export function detectCvFileKind(file = {}) {
  const lowerName = (file.name || '').toLowerCase()
  const mime = (file.type || '').toLowerCase()

  if (
    mime === 'application/pdf' ||
    mime === 'application/x-pdf' ||
    lowerName.endsWith('.pdf')
  ) {
    return 'pdf'
  }

  if (
    mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    lowerName.endsWith('.docx')
  ) {
    return 'docx'
  }

  return 'other'
}

export function isLikelyValidEmail(value = '') {
  const v = String(value || '').trim().toLowerCase()
  return v.includes('@') && v.includes('.') && v.length >= 6
}

export function clampCampaignValue(value, min, max, fallback) {
  const n = Number(value)
  if (Number.isNaN(n)) return fallback
  return Math.min(Math.max(n, min), max)
}

