import { task } from "hardhat/config"

task("get-current-gas-price").setAction(async (noArguments, { ethers: { provider } }) =>
  console.log((await provider.getGasPrice()).toString())
)
