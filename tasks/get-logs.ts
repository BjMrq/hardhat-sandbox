import { task } from "hardhat/config"

task("get-logs")
  .addParam("address")
  .setAction(async ({ address }: { address: string }, { ethers: { provider } }) => {
    ;(
      await provider.getLogs({
        address: address,
        topics: ["0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d"],
      })
    ).forEach((log) => console.log(log))
  })
