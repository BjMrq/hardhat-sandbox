import { task } from "hardhat/config"

task("get-transaction-info")
  .addPositionalParam("transaction")
  .setAction(async ({ transaction }, { ethers: { provider } }) => {
    console.log({
      transaction: await provider.getTransaction(transaction),
      receipt: await provider.getTransactionReceipt(transaction),
    })
  })
