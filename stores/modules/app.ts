import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useAppStore = defineStore('app', () => {
    // state
    const etherscanApiKey = ref(useStorage('ETHERSCAN_API_KEY', '')); // Etherscan api key
    const showEtherscanApiModal = ref(false); // Etherscan api key show modal

    // getters

    // actions
    const setEtherscanApiKey = (key: string) => {
        etherscanApiKey.value = key
        console.log(111);
        useStorage('ETHERSCAN_API_KEY', key)
    }
    const setShowEtherscanApiModal = (showModal: boolean) => {
        showEtherscanApiModal.value = showModal
    }

    return {
        etherscanApiKey,
        setEtherscanApiKey,
        showEtherscanApiModal,
        setShowEtherscanApiModal
    }
})
