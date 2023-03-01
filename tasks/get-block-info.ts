import { task } from "hardhat/config"

task("get-block-info")
  .addOptionalPositionalParam("blockNumber")
  .setAction(async ({ blockNumber }, { ethers: { provider } }) => {
    const blockInfo = await provider.getBlock(blockNumber || "latest")

    console.log(
      JSON.stringify(
        {
          hash: blockInfo.hash,
          parentHash: blockInfo.parentHash,
          number: blockInfo.number,
          timestamp: blockInfo.timestamp,
          difficulty: blockInfo.difficulty,
          gasLimit: blockInfo.gasLimit.toString(),
          gasUsed: blockInfo.gasUsed.toString(),
          transactions: blockInfo.transactions,
          baseFeePerGas: blockInfo.baseFeePerGas?.toString(),
        },
        undefined,
        2
      )
    )
  })
