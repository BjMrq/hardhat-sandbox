import { task } from "hardhat/config"

task("eth-call")
  .addParam("address")
  .addParam("data")
  .setAction(
    async ({ address, data }: { address: string; data: string }, { ethers: { provider } }) => {
      console.log(await provider.call({ to: address, data }))
    }
  )
