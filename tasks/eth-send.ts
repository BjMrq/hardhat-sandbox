import { task } from "hardhat/config"

task("eth-send")
  .addParam("method")
  .addOptionalParam("params")
  .setAction(
    async ({ method, params }: { method: string; params?: string }, { ethers: { provider } }) => {
      console.log(await provider.send(method, params?.split(",") || []))
    }
  )
