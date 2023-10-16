
import { BigNumber, utils } from 'ethers'

/**
 * Number => BigNumber
 * @param {Number} num number
 * @param {Number} decimals decimals
 * @returns
 */
export function floatToFixed(num: number, decimals = 18) {
    return BigNumber.from(utils.parseUnits(num.toString(), decimals))
}

/**
 * BigNumber => Number
 * @param {Number} num number
 * @param {Number} decimals decimals
 * @returns
 */
export function fixedToFloat(num: BigNumber, decimals = 18) {
    return parseFloat(utils.formatUnits(num, decimals))
}


/**
 * Thousand percentile display value
 * @param value value
 * @param decimals Number of reserved bits
 * @returns
 */
export function formatNumber(value: number | string, decimals = 4) {
    value = typeof value === 'number' ? value : Number(value)
    // Keep the value in the specified decimal places
    const roundedValue = value.toFixed(decimals)

    // Separate the decimal part and the integer part.
    const parts = roundedValue.split('.')
    const integerPart = parts[0]
    const decimalPart = parts[1] || ''

    // Use regular expressions to add a thousand-digit separator
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    // Splice the integer part and the decimal part
    const formattedValue = formattedIntegerPart + (decimalPart ? `.${decimalPart}` : '')

    return formattedValue
}