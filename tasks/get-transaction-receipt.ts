import { task } from "hardhat/config"

task("get-transaction-receipt")
  .addParam("transaction")
  .setAction(async ({ transaction }, { ethers: { provider } }) => {
    console.log(await provider.getTransactionReceipt(transaction))
  })
