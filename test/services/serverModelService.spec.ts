import { describe, expect, test } from 'vitest'
import {
  getServerModelOptions,
  memorySizeFormatCheck,
  memorySizeMinMaxCheck,
  memorySizePowerOfTwoCheck,
} from '../../src/services/serverModelService'

describe('serverModelService tests', function () {
  describe('getServerModelOptions tests', function () {
    test('given gpu, and memory >= 524,288, and cpu is AMR, should return only High Density Server', async () => {
      // assemble

      // action
      const result = getServerModelOptions(
        'ARM', '524,288', true,
      )

      // assert
      expect(result).toEqual(['High Density Server'])
    })
    test('given gpu and memory >= 524,288, but cpu is not ARM, should not return High Density Server', async () => {
      // assemble

      // action
      const result = getServerModelOptions(
        'Power', '524,288', true,
      )

      // assert
      expect(result).not.toContain('High Density Server')
    })
    test('given no gpu, should not return High Density Server', async () => {
      // assemble

      // action
      const result = getServerModelOptions(
        'ARM', '524,288', false,
      )

      // assert
      expect(result).not.toContain('High Density Server')
    })
    test('given cpu is Power, should not return High Density Server', async () => {
      // assemble

      // action
      const result = getServerModelOptions(
        'Power', '524,288', false,
      )

      // assert
      expect(result).not.toContain('High Density Server')
    })
    test('given memory >= 131,072, should return 4U Server and Tower Server', async () => {
      // assemble

      // action
      const result = getServerModelOptions(
        'ARM', '131,072', false,
      )

      // assert
      expect(result).toEqual(['4U Rack Server', 'Tower Server'])
    })
    test('given memory < 131,072, should only return Tower Server', async () => {
      // assemble

      // action
      const result = getServerModelOptions(
        'ARM', '131,071', false,
      )

      // assert
      expect(result).toEqual(['Tower Server'])
    })
    test('given memory < 2,048, should return No Options', async () => {
      // assemble

      // action
      const result = getServerModelOptions(
        'ARM', '2,047', false,
      )

      // assert
      expect(result).toEqual(['No Options'])
    })
    test('given cpu is Power, should return Mainframe', async () => {
      // assemble

      // action
      const result = getServerModelOptions(
        'Power', '131,072', false,
      )

      // assert
      expect(result).toContain('Mainframe')
    })
  })

  describe('memorySizeMinMaxCheck tests', function () {
    test('should return false if less than 4096', async () => {
      expect(memorySizeMinMaxCheck('4,095')).toBe(false)
    })
    test('should return false if greater than 8388608', async () => {
      expect(memorySizeMinMaxCheck('8,388,609')).toBe(false)
    })
    test('should return true if >= 4096 and <= 8388609', async () => {
      expect(memorySizeMinMaxCheck('5000')).toBe(true)
    })
  })

  describe('memorySizeFormatCheck tests', function () {
    test('should return false if not a number', async () => {
      expect(memorySizeFormatCheck('a')).toBe(false)
    })
    test('should return false if contain decimal', async () => {
      expect(memorySizeFormatCheck('100.1')).toBe(false)
    })
    test('should return false if not using comma as thousand separator', async () => {
      expect(memorySizeFormatCheck('1100')).toBe(false)
    })
    test('should return true if using comma as thousand separator', async () => {
      expect(memorySizeFormatCheck('100')).toBe(true)
    })
    test('should return true if no comma but less than 1,000', async () => {
      expect(memorySizeFormatCheck('100')).toBe(true)
    })
  })

  describe('memorySizePowerOfTwoCheck tests', function () {
    test('should return false if not power of 2', async () => {
      expect(memorySizePowerOfTwoCheck('3')).toBe(false)
    })
    test('should return false if negative', async () => {
      expect(memorySizePowerOfTwoCheck('-4')).toBe(false)
    })
    test('should return true if power of 2', async () => {
      expect(memorySizePowerOfTwoCheck('4')).toBe(true)
    })
  })
})
