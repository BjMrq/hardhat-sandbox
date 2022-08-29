import { task } from "hardhat/config"

task("get-nonce", "get the nonce of a given address")
  .addParam("address", "The account's address")
  .setAction(async ({ address }, { ethers: { provider } }) =>
    console.log({
      transactionCount: await provider.getTransactionCount(address),
    })
  )
