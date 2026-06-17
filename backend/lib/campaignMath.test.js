import { describe, expect, it } from 'vitest'
import { clampCampaignValue, isLikelyValidEmail } from './fileMime.js'

describe('campaign value helpers', () => {
  it('clamps below minimum', () => {
    expect(clampCampaignValue(0, 1, 90, 7)).toBe(1)
  })

  it('clamps above maximum', () => {
    expect(clampCampaignValue(120, 1, 90, 7)).toBe(90)
  })

  it('uses fallback on NaN', () => {
    expect(clampCampaignValue('abc', 1, 50, 15)).toBe(15)
  })
})

describe('email heuristic', () => {
  it('accepts basic valid email', () => {
    expect(isLikelyValidEmail('test@example.com')).toBe(true)
  })

  it('rejects malformed email', () => {
    expect(isLikelyValidEmail('testexample.com')).toBe(false)
  })
})

