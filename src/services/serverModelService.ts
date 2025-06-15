export const cpuList = ['X86', 'Power', 'ARM']
export type CPU = typeof cpuList[number]

export const serverModelsList = ['Tower Server', '4U Rack Server', 'Mainframe', 'High Density Server', 'No Options']
export type ServerModels = typeof serverModelsList[number]

export function getServerModelOptions (cpu: CPU, memorySize: string, hasGpu: boolean): ServerModels[] {
  const options: ServerModels[] = []
  const memorySizeAsNum = Number(memorySize.replace(',', ''))
  if (memorySizeAsNum < 2048) {
    return ['No Options']
  }
  if (hasGpu && cpu === 'ARM') {
    return ['High Density Server']
  } else {
    if (memorySizeAsNum >= 131_072) {
      options.push('4U Rack Server', 'Tower Server')
      if (cpu === 'Power') {
        options.push('Mainframe')
      }
    } else {
      options.push('Tower Server')
    }
  }
  return options
}

export function memorySizeMinMaxCheck (value: string): boolean {
  const memorySize = Number(value?.replace(/,/g, ''))
  return memorySize >= 4096 && memorySize <= 8_388_608
}

export function memorySizeFormatCheck (value: string): boolean {
  return new RegExp(/^\d{1,3}(?:,\d{3})*$/).test(value)
}

export function memorySizePowerOfTwoCheck (value: string): boolean {
  const memorySize = Number(value?.replace(/,/g, ''))
  return Number.isInteger(Math.log2(memorySize))
}
