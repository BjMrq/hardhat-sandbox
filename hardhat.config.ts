import "hardhat-deploy"
import "hardhat-gas-reporter"
import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan"
// import "@openzeppelin/hardhat-upgrades"
import "@matterlabs/hardhat-zksync-deploy"
import "@matterlabs/hardhat-zksync-solc"
import "./tasks"
import { HardhatUserConfig, NetworkUserConfig } from "hardhat/types"
import "dotenv/config"

const getInfuraConfigFor = (
  netWorkName: string,
  extraConfig: NetworkUserConfig = {}
): NetworkUserConfig => ({
  url: process.env.INFURA_ENDPOINT?.replace("NETWORK_NAME", netWorkName),
  accounts: { mnemonic: process.env.OZ_MNEMONIC as string },
  gasPrice: 8000000000,
  ...extraConfig,
})

const etherscanConfig = {
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY as string,
  },
}

const hardhatConfig: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.4",
    settings: {},
  },
  zksolc: {
    version: "1.2.0",
    compilerSource: "docker",
    settings: {
      experimental: {
        dockerImage: "matterlabs/zksolc",
        tag: "v1.2.0",
      },
    },
  },
  zkSyncDeploy: {
    zkSyncNetwork: "https://zksync2-testnet.zksync.dev",
    ethNetwork: "goerli", // Can also be the RPC URL of the network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
  },
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        mnemonic: process.env.DEVELOPMENT_MNEMONIC,
      },
      mining: {
        auto: true,
        interval: [10000, 14000],
      },
    },
    localhost: {
      chainId: 1337,
      accounts: {
        mnemonic: process.env.DEVELOPMENT_MNEMONIC,
      },
    },
    rinkeby: getInfuraConfigFor("rinkeby"),
    goerli: getInfuraConfigFor("goerli"),
    polygon: getInfuraConfigFor("polygon-mainnet"),
    mumbai: getInfuraConfigFor("polygon-mumbai"),
    arbitrum: getInfuraConfigFor("arbitrum-mainnet"),
    harmonytest: {
      url: `https://api.s0.b.hmny.io`,
      accounts: { mnemonic: process.env.OZ_MNEMONIC },
    },
    harmony: {
      url: `https://api.harmony.one`,
      accounts: { mnemonic: process.env.OZ_MNEMONIC },
    },
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      chainId: 43114,
      accounts: { mnemonic: process.env.OZ_MNEMONIC },
    },
    zksynctest: {
      zksync: true,
      url: `https://zksync2-testnet.zksync.dev`,
      accounts: { mnemonic: process.env.OZ_MNEMONIC },
    },
    hedera: {
      url: "https://mainnet.hashio.io/api",
      chainId: 295,
      accounts: { mnemonic: process.env.OZ_MNEMONIC as string },
      //@ts-expect-error
      type: "mainnet",
      hederaAccounts: {
        operator: {
          accountId: process.env.OPERATOR_ACCOUNT_ID as string,
          privateKey: process.env.OPERATOR_PRIVATE_KEY as string,
        },
        alias: { privateKey: process.env.ETHERS_PRIVATE_KEY as string },
      },
    },
    hederatest: {
      url: "https://testnet.hashio.io/api",
      // url: "http://localhost:7546/api",
      chainId: 296,
      accounts: [process.env.ETHERS_PRIVATE_KEY as string],
      //@ts-expect-error
      type: "testnet",
      hederaAccounts: {
        operator: {
          accountId: process.env.OPERATOR_ACCOUNT_ID as string,
          privateKey: process.env.OPERATOR_PRIVATE_KEY as string,
        },
        alias: { privateKey: process.env.ETHERS_PRIVATE_KEY as string },
      },
    },
  },
  ...etherscanConfig,
  verify: etherscanConfig,
  namedAccounts: {
    deployer: { default: 0 },
    faucetFounder: { default: 1 },
    faucetUser: { default: 2 },
    astroSender: { default: 3 },
    astroReceiver: { default: 4 },
    astroBuyer: { default: 5 },
    astroSeller: { default: 6 },
    maliciousEncounter: { default: 7 },
  },
  privateKeys: {
    oz: process.env.OZ_PRIVATE_KEY as string,
    hederaEOA: process.env.ETHERS_PRIVATE_KEY as string,
  },
  paths: {
    sources: "./contracts",
    tests: "./tests",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  typechain: {
    outDir: "./helpers/generated-types",
  },
}

export default hardhatConfig
