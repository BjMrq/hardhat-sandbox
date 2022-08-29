import { task } from "hardhat/config"

task("get-transaction")
  .addParam("transaction")
  .setAction(async ({ transaction }, { ethers: { provider } }) => {
    console.log(await provider.getTransaction(transaction))
  })
