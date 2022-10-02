import { DeployProxyOptions, UpgradeProxyOptions } from "@openzeppelin/hardhat-upgrades/dist/utils"
import { Contract } from "ethers"
import { getNamedAccounts, deployments, network, ethers, upgrades } from "hardhat"
import { DeployOptions, DeployResult } from "hardhat-deploy/types"
import { awaitDeployForBlocks, unlessOnDevelopmentChainVerifyContract } from "./verify"

type BaseToDeployOption = {
  contractName: string
  deploymentArguments?: unknown[]
}

type ContractToDeployOption = BaseToDeployOption & {
  deploymentOptions?: Omit<DeployOptions, "from">
}

type UpgradableContractToDeployOption = BaseToDeployOption & {
  deploymentOptions?: DeployProxyOptions
}

type UpgradableContractToUpgradeOption = {
  nexUpgradeContractName: string
  currentContract: Contract
  upgradeOptions?: UpgradeProxyOptions
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

  await deployedContract.deployed()

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

export const upgradeContractAndVerify = async ({
  nexUpgradeContractName,
  currentContract,
  upgradeOptions,
}: UpgradableContractToUpgradeOption) => {
  const constructorArguments = upgradeOptions?.constructorArgs || []

  const contractFactory = await ethers.getContractFactory(nexUpgradeContractName)

  const newUpgradedContract = await upgrades.upgradeProxy(
    currentContract.address,
    contractFactory,
    {
      ...upgradeOptions,
      constructorArgs: constructorArguments,
    }
  )

  await newUpgradedContract.deployed()

  console.log(
    `upgrade to "${nexUpgradeContractName}" (tx: ${newUpgradedContract.deployTransaction.hash})...: deployed at ${newUpgradedContract.address}`
  )

  // await unlessOnDevelopmentChainVerifyContract(network.name, {
  //   contractAddress: newUpgradedContract.address,
  //   constructorArguments,
  //   contractName: nexUpgradeContractName,
  //   isProxy: true,
  // })
}
