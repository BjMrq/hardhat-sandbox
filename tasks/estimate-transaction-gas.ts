import { task } from "hardhat/config"

task("estimate-transaction-gas")
  .addOptionalPositionalParam("contractAddress")
  .addOptionalPositionalParam("transactionData")
  .setAction(
    async (
      { contractAddress, transactionData }: { contractAddress: string; transactionData: string },
      { ethers: { provider } }
    ) => {
      console.log(
        (
          await provider.estimateGas({
            to: contractAddress,
            data: transactionData,
          })
        ).toString()
      )
    }
  )
