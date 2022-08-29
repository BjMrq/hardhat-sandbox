import { task } from "hardhat/config"

task("get-network").setAction(async (noArguments, { ethers: { provider } }) =>
  console.log(await provider.getNetwork())
)
