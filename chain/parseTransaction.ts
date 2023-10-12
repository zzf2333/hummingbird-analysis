import { BigNumber, utils } from 'ethers'
import { Token } from '@uniswap/sdk-core'
import axios from 'axios'
import _ from 'lodash'
import { fixedToFloat } from '~/utils'

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

const CHAINID = 1; // etherscan Main network
const WETH = new Token(CHAINID, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'ETH', 'Ether')
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
    if (process.env.NODE_ENV === 'development') return { data: { status: '1', result: transactions, message: 'success' } };
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
    if (process.env.NODE_ENV === 'development') return { data: { status: '1', result: erc20TransferTransactions, message: 'success' } };
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
    if (process.env.NODE_ENV === 'development') return { data: { status: '1', result: internalTransfer, message: 'success' } };
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
        return uniV2Abi.decodeFunctionData(methodName, data)
    return null
}

/**
 * Set Token
 * @param {string} address erc20 address
 * @param {number} decimal erc20 decimal
 * @param {string} symbol erc20 symbol
 * @param {string} name erc20 name
 * @returns 
 */
function setToken(address: string, decimal: number, symbol: string, name: string) {
    return new Token(CHAINID, address, decimal, symbol, name)
}

/**
 * Analyze transaction data
 * @param {any} tx  Transaction data
 * @returns 
 */
function parseSwapData(tx: any) {
    const { functionName, input, transfer, erc20 } = tx
    if (/swapETHForExactTokens/.test(functionName)) {
        const decodedParameters: any = decodeFunctionData(functionName, input, 'v2')
        // console.log('swapETHForExactTokens', decodedParameters, tx)
        tx.swap = {
            tokenOut: erc20 ? setToken(erc20.contractAddress, Number(erc20.tokenDecimal), erc20.tokenSymbol, erc20.tokenName) : decodedParameters.path[1],
            amountOut: decodedParameters.amountOut.toString(),
            tokenIn: WETH,
            amountIn: transfer ? String(Number(tx.value) - Number(transfer.value)) : tx.value,
        }
    }
    else if (/swapTokensForExactTokens/.test(functionName)) {
        const decodedParameters: any = decodeFunctionData(functionName, input, 'v2')
        console.log('swapTokensForExactTokens', decodedParameters, tx)
    }
    else if (/swapTokensForExactETH/.test(functionName)) {
        const decodedParameters: any = decodeFunctionData(functionName, input, 'v2')
        console.log('swapTokensForExactETH', decodedParameters, tx)
    }
    else if (/swapExactTokensForTokensSupportingFeeOnTransferTokens/.test(functionName)) {
        const decodedParameters: any = decodeFunctionData(functionName, input, 'v2')
        console.log('swapExactTokensForTokensSupportingFeeOnTransferTokens', decodedParameters, tx)
    }
    else if (/swapExactTokensForTokens\(/.test(functionName)) {
        const decodedParameters: any = decodeFunctionData(functionName, input, 'v2')
        console.log('swapExactTokensForTokens', decodedParameters, tx)
    }
    else if (/swapExactTokensForETHSupportingFeeOnTransferTokens/.test(functionName)) {
        const decodedParameters: any = decodeFunctionData(functionName, input, 'v2')
        // console.log('swapExactTokensForETHSupportingFeeOnTransferTokens', decodedParameters, tx)
        tx.swap = {
            tokenOut: WETH,
            amountOut: transfer ? transfer.value : decodedParameters.amountOutMin.toString(),
            tokenIn: erc20 ? setToken(erc20.contractAddress, Number(erc20.tokenDecimal), erc20.tokenSymbol, erc20.tokenName) : decodedParameters.path[0],
            amountIn: decodedParameters.amountIn.toString(),
        }
    }
    else if (/swapExactTokensForETH\(/.test(functionName)) {
        const decodedParameters: any = decodeFunctionData(functionName, input, 'v2')
        console.log('swapExactTokensForETH', decodedParameters, tx)
    }
    else if (/swapExactETHForTokensSupportingFeeOnTransferTokens/.test(functionName)) {
        const decodedParameters: any = decodeFunctionData(functionName, input, 'v2')
        // console.log('swapExactETHForTokensSupportingFeeOnTransferTokens', decodedParameters, tx)
        tx.swap = {
            tokenOut: erc20 ? setToken(erc20.contractAddress, Number(erc20.tokenDecimal), erc20.tokenSymbol, erc20.tokenName) : decodedParameters.path[1],
            amountOut: erc20 ? erc20.value : decodedParameters.amountOutMin.toString(),
            tokenIn: WETH,
            amountIn: tx.value,
        }
    }
    else if (/swapExactETHForTokens\(/.test(functionName)) {
        const decodedParameters: any = decodeFunctionData(functionName, input, 'v2')
        console.log('swapExactETHForTokens', decodedParameters, tx)
    }

    // Format the amount
    if (tx.swap) {
        const { tokenOut, amountOut, tokenIn, amountIn } = tx.swap
        tx.swap.amountIn = fixedToFloat(BigNumber.from(amountIn), tokenIn.decimals)
        tx.swap.amountOut = fixedToFloat(BigNumber.from(amountOut), tokenOut.decimals)
    }

    return tx
}

/**
 * Filter out swap transaction data
 * @param {Array} transactions transaction data list
 */
export function filterSwapTransactions(txns: any[]) {
    return txns.map((tx: any) => parseSwapData(tx))
}

/**
 * Analyze transaction records
 * @param txs All transactions
 * @param erc20Txs Erc20 transfer record
 * @param transferTxs Internal transfer record
 * @returns
 */
export function parseTransaction(txs: any[], erc20Txs: any[], transferTxs: any[]) {
    let allTxs = _.filter(txs, { txreceipt_status: '1' })
    allTxs = allTxs.map((tx) => {
        const erc20 = _.find(erc20Txs, { hash: tx.hash })
        const transfer = _.find(transferTxs, { hash: tx.hash })
        if (erc20)
            tx.erc20 = erc20
        if (transfer)
            tx.transfer = transfer
        return tx
    })
    let swapTxs = _.filter(allTxs, (transaction: any) => _.some(SWAP_FUNCTION_NAME, (name: string) => transaction.functionName.includes(name)))
    swapTxs = filterSwapTransactions(swapTxs)
    const swapData = swapTxs.map((tx: any) => ({ ...tx.swap, hash: tx.hash, timeStamp: tx.timeStamp }))
    console.log('Unparsed data: ', swapTxs.filter((row: any) => !row.swap))
    return swapData
}
