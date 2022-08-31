import { ethers, run } from "hardhat"
import console from "console"
import { DEVELOPMENT_CHAINS, NETWORK_CONFIG, NON_VERIFIABLE_CHAINS } from "../variables"
import { sleep } from "../chain/wait-block"

type VerificationSimpleContractTaskNames = "etherscan-verify" | "sourcify"
type VerificationUpgradableContractTaskNames = "verify"

type VerificationTaskNames =
  | VerificationSimpleContractTaskNames
  | VerificationUpgradableContractTaskNames

type VerifyOptions = {
  contractAddress: string
  contractName: string
  //TODO remove constructorArguments (after checking verifying upgrades)?
  constructorArguments: unknown[]
  isProxy?: boolean
}

const buildVerifyLogInfo = (
  verifierTaskName: VerificationTaskNames,
  contractName: string,
  contractAddress: string
) => `running ${verifierTaskName} for ${contractName} deployed at ${contractAddress}:`

const avoidNoBytecodeError = async () => await sleep(40000)

const verifyContractWith =
  (verifierTaskName: VerificationTaskNames) =>
  async ({ contractAddress, contractName, constructorArguments }: VerifyOptions) => {
    try {
      console.log(buildVerifyLogInfo(verifierTaskName, contractName, contractAddress))

      await run(verifierTaskName, {
        // Address is for etherscan-verify
        address: contractAddress,
        // Contract name is for sourcify
        contractName,
        constructorArguments,
      })
    } catch (error) {
      console.error(
        `Error ${buildVerifyLogInfo(verifierTaskName, contractName, contractAddress)}`,
        (error as Error).message,
        JSON.stringify(error, undefined, 2)
      )
    }
  }

const verifyContractOnSourcify = verifyContractWith("sourcify")
const verifyContractOnEtherscan = verifyContractWith("etherscan-verify")
const verifyProxyContractOnEtherscan = verifyContractWith("verify")

export const verifyContract = async (verifyOptions: VerifyOptions) => {
  if (verifyOptions.isProxy) {
    await avoidNoBytecodeError()

    await verifyProxyContractOnEtherscan(verifyOptions)
  } else {
    await verifyContractOnEtherscan(verifyOptions)
    await verifyContractOnSourcify(verifyOptions)
  }
}

export const unlessOnDevelopmentChainVerifyContract = async (
  currentNetwork: string,
  verifyOptions: VerifyOptions
) => {
  if (DEVELOPMENT_CHAINS.includes(currentNetwork as any)) return
  if (NON_VERIFIABLE_CHAINS.includes(currentNetwork)) return
  else return await verifyContract(verifyOptions)
}

export const ifOnDevelopmentChainDo = async (
  currentNetwork: string,
  functionToDo: () => void | Promise<void>
) => {
  if (DEVELOPMENT_CHAINS.includes(currentNetwork as any)) await functionToDo()
}

export const awaitDeployForBlocks = (networkName: string) =>
  NETWORK_CONFIG[networkName]?.blockConfirmations || 2
