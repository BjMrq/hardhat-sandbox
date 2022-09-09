import { task } from "hardhat/config"

task("get-code")
  .addParam("address")
  .setAction(async ({ address }: { address: string }, { ethers: { provider } }) => {
    console.log(await provider.getCode(address))
  })
