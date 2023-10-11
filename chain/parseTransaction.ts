import { BigNumber, utils } from 'ethers'
import axios from 'axios'

import UniSwapV2ABI from '~/chain/abi/UniSwapV2.json'

// test data
import transactions from '~/json/transactions.json';
import erc20TransferTransactions from '~/json/erc20Transfer.json';
import internalTransfer from '~/json/internalTransfer.json';

// etherscan api
const api = axios.create({
    baseURL: 'https://api.etherscan.io/api', // api base
    timeout: 10 * 60 * 1000, // request timeout
    params: {
        apikey: process.env.ETHERSCAN_API_KEY || '',
    },
})

// Swap method collection
const SWAP_FUNCTION_NAME = [
    'swapETHForExactTokens',
    'swapTokensForExactTokens',
    'swapTokensForExactETH',
    'swapExactTokensForTokensSupportingFeeOnTransferTokens',
    'swapExactTokensForTokens',
    'swapExactTokensForETHSupportingFeeOnTransferTokens',
    'swapExactTokensForETH',
    'swapExactETHForTokensSupportingFeeOnTransferTokens',
    'swapExactETHForTokens',
    'multicall',
    'exactInput',
    'exactInputSingle',
    'exactOutput',
    'exactOutputSingle',
]
// uniswap v2 abi
const uniV2Abi = new utils.Interface(UniSwapV2ABI)


/**
 * Get address transaction history
 * @param {string} toAddress wallte address 
 * @returns 
 */
export async function fetchTransaction(toAddress: string) {
    if (process.env.NODE_ENV === 'development') return transactions;
    return api.get('', {
        params: {
            module: 'account',
            action: 'txlist',
            address: toAddress,
            startblock: 0,
            endblock: 99999999,
            page: 1,
            offset: 1000,
            sort: 'asc',
        },
    })
}

/**
 * Get address ERC20 transfer transactions
 * @param {string} toAddress wallte address 
 * @returns 
 */
export async function fetchErc20TransferTransaction(toAddress: string) {
    if (process.env.NODE_ENV === 'development') return erc20TransferTransactions;
    return api.get('', {
        params: {
            module: 'account',
            action: 'tokentx',
            address: toAddress,
            startblock: 0,
            endblock: 99999999,
            page: 1,
            offset: 1000,
            sort: 'asc',
        },
    })
}

/**
 * Get address internal transfer transactions
 * @param {string} toAddress wallte address 
 * @returns 
 */
export async function fetchInternalTransferTransaction(toAddress: string) {
    if (process.env.NODE_ENV === 'development') return internalTransfer;
    return api.get('', {
        params: {
            module: 'account',
            action: 'txlistinternal',
            address: toAddress,
            startblock: 0,
            endblock: 99999999,
            page: 1,
            offset: 1000,
            sort: 'asc',
        },
    })
}

/**
 * Decode function data
 * @param {string} methodName Function name
 * @param {string} data Data source
 * @param {string} type Abi data type
 * @returns 
 */
function decodeFunctionData(methodName: string, data: string, type = 'v2') {
    if (type === 'v2')
        return uniV2.decodeFunctionData(methodName, data)
    return null
}