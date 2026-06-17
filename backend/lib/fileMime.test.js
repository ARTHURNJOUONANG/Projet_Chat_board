import { describe, expect, it } from 'vitest'
import { detectCvFileKind } from './fileMime.js'

describe('detectCvFileKind', () => {
  it('detects PDF by mime', () => {
    expect(detectCvFileKind({ name: 'cv', type: 'application/pdf' })).toBe('pdf')
  })

  it('detects PDF by extension when mime is empty', () => {
    expect(detectCvFileKind({ name: 'mon-cv.PDF', type: '' })).toBe('pdf')
  })

  it('detects DOCX by mime', () => {
    expect(
      detectCvFileKind({
        name: 'cv.docx',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      })
    ).toBe('docx')
  })
})

