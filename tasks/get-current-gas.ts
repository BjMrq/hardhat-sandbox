import { ethers } from "ethers"
import { task } from "hardhat/config"

const getCurrentGasLimit = async (provider: ethers.providers.JsonRpcProvider) =>
  (await provider.getBlock(await provider.getBlockNumber())).gasLimit.toNumber()

task("get-current-gas-limit").setAction(async (noArguments, { ethers: { provider } }) =>
  console.log(await getCurrentGasLimit(provider))
)
