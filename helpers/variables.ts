import { NetworkConfigInfo } from "./types"

export const DEVELOPMENT_CHAINS = ["hardhat", "localhost"] as const

export const NON_VERIFIABLE_CHAINS = ["hedera", "hederatest", "harmonytest"]

export const TEST_CHAINS = ["rinkeby", "kovan", , "goerli", "hederatest", "harmonytest"] as const

export const NETWORK_CONFIG: NetworkConfigInfo = {
  localhost: {},
  hardhat: {},
  rinkeby: {
    blockConfirmations: 6,
  },
  goerli: {
    blockConfirmations: 6,
  },
}
