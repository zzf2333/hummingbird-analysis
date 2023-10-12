
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