import { task } from "hardhat/config"

task("get-network-info").setAction(async (noArguments, { ethers: { provider } }) =>
  console.log(await provider.getNetwork())
)
