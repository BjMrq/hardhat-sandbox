import { DeployProxyOptions } from "@openzeppelin/hardhat-upgrades/dist/utils"
import { Contract } from "ethers"
import { getNamedAccounts, deployments, network, ethers, upgrades } from "hardhat"
import { DeployOptions, DeployResult } from "hardhat-deploy/types"
import { awaitDeployForBlocks, unlessOnDevelopmentChainVerifyContract } from "./verify"

type BaseToDeployOption = {
  contractName: string
  deploymentArguments?: unknown[]
}

type ContractToDeployOption = BaseToDeployOption & {
  deploymentOptions?: DeployOptions
}

type UpgradableContractToDeployOption = BaseToDeployOption & {
  deploymentOptions?: DeployProxyOptions
}

export const simpleContractDeployAndVerify = async ({
  contractName,
  deploymentArguments,
  deploymentOptions,
}: ContractToDeployOption): Promise<DeployResult> => {
  const constructorArguments = deploymentArguments || []

  const { deployer } = await getNamedAccounts()

  const deployResult = await deployments.deploy(contractName, {
    from: deployer,
    args: constructorArguments,
    log: true,
    waitConfirmations: awaitDeployForBlocks(network.name),
    ...deploymentOptions,
  })

  await unlessOnDevelopmentChainVerifyContract(network.name, {
    contractAddress: deployResult.address,
    constructorArguments: constructorArguments,
    contractName,
  })

  return deployResult
}

export const upgradableContractDeployAndVerify = async ({
  contractName,
  deploymentArguments,
  deploymentOptions,
}: UpgradableContractToDeployOption): Promise<Contract> => {
  const constructorArguments = deploymentArguments || []

  const contractFactory = await ethers.getContractFactory(contractName)

  const deployedContract = await upgrades.deployProxy(contractFactory, constructorArguments, {
    ...deploymentOptions,
  })

  console.log(
    `upgradable "${contractName}" (tx: ${deployedContract.deployTransaction.hash})...: deployed at ${deployedContract.address}`
  )

  await unlessOnDevelopmentChainVerifyContract(network.name, {
    contractAddress: deployedContract.address,
    constructorArguments,
    contractName,
    isProxy: true,
  })

  return deployedContract
}
