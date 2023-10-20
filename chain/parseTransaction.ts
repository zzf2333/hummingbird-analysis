import { BigNumber, utils } from 'ethers'
import { Token } from '@uniswap/sdk-core'
import axios from 'axios'
import _ from 'lodash'
import { fixedToFloat } from '~/utils'
import { useStorage } from '@vueuse/core'

import UniSwapV2ABI from '~/chain/abi/UniSwapV2.json';
import UniSwapV3ABI from '~/chain/abi/UniSwapV3.json';

// etherscan api
const api = axios.create({
    baseURL: 'https://api.etherscan.io/api', // api base
    timeout: 10 * 60 * 1000, // request timeout
    params: {
        apikey: useStorage('ETHERSCAN_API_KEY', '').value || '',
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
// Other contracts for multicall operation
const SWAP_MULTICALL_EXCLUDE = [
    '0xC36442b4a4522E871399CD717aBDD847Ab11FE88'
]
// uniswap v2 abi
const uniV2Abi = new utils.Interface(UniSwapV2ABI)
// uniswap v3 abi
const uniV3Abi = new utils.Interface(UniSwapV3ABI)


/**
 * Get wallet balance
 * @param {string} toAddress wallte address 
 * @returns 
 */
export async function fetchBalance(toAddress: string) {
    return api.get('', {
        params: {
            module: 'account',
            action: 'balance',
            address: toAddress,
            tag: 'latest'
        },
    })
}

/**
 * Get address transaction history
 * @param {string} toAddress wallte address 
 * @returns 
 */
export async function fetchTransaction(toAddress: string) {
    // if (process.env.NODE_ENV === 'development') return { data: { status: '1', result: transactions, message: 'success' } };
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
    // if (process.env.NODE_ENV === 'development') return { data: { status: '1', result: erc20TransferTransactions, message: 'success' } };
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
    // if (process.env.NODE_ENV === 'development') return { data: { status: '1', result: internalTransfer, message: 'success' } };
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
 * BigNumber => Number
 * @param data
 * @returns
 */
function bigNumberToNumber(data: any) {
    if (BigNumber.isBigNumber(data)) {
        return data.toString()
    }
    else if (typeof data === 'object') {
        return _.mapValues(data, (value: any) => {
            return BigNumber.isBigNumber(value) ? value.toString() : value
        })
    }
    else {
        return data
    }
}


/**
 * Analysis of transaction parameters
 * @param {string} txData data
 * @returns 
 */
function parseTransactionArgs(data: any): any {
    if (Array.isArray(data)) {
        return data.map((item: any) => {
            if (Array.isArray(item))
                return parseTransactionArgs(item)
            if (typeof item === 'string' && item.length !== 42)
                return parseUniV3TransactionData(item)
            return bigNumberToNumber(item)
        })
    }
    else {
        return bigNumberToNumber(data)
    }
}

/**
 * Parsing uniswapv3 data
 * @param {string} txData data
 * @returns
 */
export function parseUniV3TransactionData(txData: string) {
    try {
        const calldata: any = uniV3Abi.parseTransaction({ data: txData })
        const { args, name, sighash, signature } = calldata
        const param = args.map((row: any) => parseTransactionArgs(row))
        return {
            name,
            param,
            sighash,
            signature,
        }
    }
    catch (error) {
        console.error(error)
        return txData
    }
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
    if (type === 'v3')
        return parseUniV3TransactionData(data)
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
 * Get token information based on address
 * @param {string} address token address
 * @param {Array} erc20 token list
 */
function getAddressToken(address: string, erc20: any[]) {
    const token = _.find(erc20, (item) => item.contractAddress.toLowerCase() === address.toLowerCase());
    return token ? setToken(token.contractAddress, parseInt(token.tokenDecimal), token.tokenSymbol, token.tokenName) : address
}

// Method parsing set
const functionHandlers: any = {
    "0x38ed1739": (tx: any, erc20: any[]) => {
        return {
            tokenOut: getAddressToken(erc20[1].contractAddress, erc20),
            amountOut: erc20[1].value,
            tokenIn: getAddressToken(erc20[0].contractAddress, erc20),
            amountIn: erc20[0].value,
        }
    },
    "0x7ff36ab5": (tx: any, erc20: any[]) => {
        return {
            tokenOut: getAddressToken(erc20[0].contractAddress, erc20),
            amountOut: erc20[0].value,
            tokenIn: WETH,
            amountIn: tx.value,
        }
    },
    "0x18cbafe5": (tx: any, erc20: any[], transfer: any[]) => {
        return {
            tokenOut: WETH,
            amountOut: transfer[0].value,
            tokenIn: getAddressToken(erc20[0].contractAddress, erc20),
            amountIn: erc20[0].value,
        }
    },
    "0x791ac947": (tx: any, erc20: any[], transfer: any[]) => {
        return {
            tokenOut: WETH,
            amountOut: transfer[0].value,
            tokenIn: getAddressToken(erc20[0].contractAddress, erc20),
            amountIn: erc20[0].value,
        }
    },
    "0x414bf389": (tx: any, erc20: any[], transfer: any[]) => {
        return {
            tokenOut: getAddressToken(erc20[0].contractAddress, erc20),
            amountOut: erc20[0].value,
            tokenIn: WETH,
            amountIn: tx.value,
        }
    },
    "0x5ae401dc": (tx: any, erc20: any[], transfer: any[]) => {
        if (/472b43f3/.test(tx.input)) {
            return {
                tokenOut: getAddressToken(erc20[0].contractAddress, erc20),
                amountOut: erc20[0].value,
                tokenIn: WETH,
                amountIn: tx.value,
            }
        } else if (/04e45aaf/.test(tx.input)) {
            return {
                tokenOut: tx.value ? getAddressToken(erc20[0].contractAddress, erc20) : WETH,
                amountOut: tx.value ? erc20[0].value : transfer[0].value,
                tokenIn: tx.value ? WETH : getAddressToken(erc20[0].contractAddress, erc20),
                amountIn: tx.value ? tx.value : erc20[0].value,
            }
        } else if (/5023b4df/.test(tx.input)) {
            return {
                tokenOut: WETH,
                amountOut: transfer[0].value,
                tokenIn: getAddressToken(erc20[0].contractAddress, erc20),
                amountIn: erc20[0].value,
            }
        } else {
            console.log("0x5ae401dc", tx);
        }
        return ''
    },
    "0xac9650d8": (tx: any, erc20: any[], transfer: any[]) => {
        if (/414bf389/.test(tx.input)) {
            return {
                tokenOut: WETH,
                amountOut: transfer[0].value,
                tokenIn: getAddressToken(erc20[0].contractAddress, erc20),
                amountIn: erc20[0].value,
            }
        } else {
            console.log("0xac9650d8", tx);
        }
        return ''
    },
};

/**
 * Filter out swap transaction data
 * @param {Array} transactions transaction data list
 */
export function filterSwapTransactions(txns: any[]) {
    return txns.map((tx: any) => {
        const { methodId, transfer, erc20 } = tx;
        const handler = functionHandlers[methodId];
        if (handler) {
            const swap = handler(tx, erc20, transfer);
            tx.swap = swap;
        } else {
            console.log(methodId, tx);
        }

        if (tx.swap) {
            const { tokenOut, amountOut, tokenIn, amountIn } = tx.swap
            tx.swap.amountIn = fixedToFloat(BigNumber.from(amountIn), tokenIn.decimals)
            tx.swap.amountOut = fixedToFloat(BigNumber.from(amountOut), tokenOut.decimals)
        }
        return tx;
    })
}

/**
 * Analyze transaction records
 * @param transactions All transactions
 * @param erc20Txs Erc20 transfer record
 * @param internalTransferTxs Internal transfer record
 * @returns
 */
export function parseTransaction(transactions: any[], erc20Txs: any[], internalTransferTxs: any[]) {
    console.log("transactions count: ", transactions.length, 'erc20 count: ', erc20Txs.length, 'internalTransfer count: ', internalTransferTxs.length)
    let txs = _.filter(transactions, { txreceipt_status: '1' })
    txs = txs.map((tx) => {
        const erc20 = _.filter(erc20Txs, { hash: tx.hash })
        const transfer = _.filter(internalTransferTxs, { hash: tx.hash })
        if (erc20)
            tx.erc20 = erc20
        if (transfer)
            tx.transfer = transfer
        return tx
    })
    const transferTxs = _.filter(txs, (transaction: any) => transaction.methodId === '0x');
    let swapTxs = _.filter(txs, (transaction: any) => _.some(SWAP_FUNCTION_NAME, (name: string) => transaction.functionName.includes(name)))
    swapTxs = _.filter(swapTxs, (transaction: any) => (_.some(SWAP_MULTICALL_EXCLUDE, (name: string) => transaction.to.toLowerCase() !== name.toLowerCase()) && transaction.methodId !== '0x'))
    swapTxs = filterSwapTransactions(swapTxs)
    swapTxs = swapTxs.map((tx: any) => ({ ...tx.swap, hash: tx.hash, timeStamp: tx.timeStamp }))
    const swapData = _.filter(swapTxs, (tx: any) => tx.tokenIn);
    console.log('Parse swap failed data: ', _.filter(swapTxs, (tx: any) => !tx.tokenIn));
    return { swapData, transferTxs }
}
