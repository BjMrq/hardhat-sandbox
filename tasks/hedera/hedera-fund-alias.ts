import { task } from "hardhat/config"
import { getHederaClientAndAccounts } from "../../helpers/hedera/hedera-helpers"

task("hedera-fund-alias")
  .addOptionalParam("amount")
  .setAction(
    async ({ amount }: { amount: string }, { hardhatArguments: { network }, ethers: {} }) => {
      const { operatorAccount, etherAliasAccount, transferTransaction, getBalanceQuery } =
        getHederaClientAndAccounts(network)

      await transferTransaction(operatorAccount, etherAliasAccount, Number(amount) || 1)

      console.log({
        newOperatorBalance: (await getBalanceQuery(operatorAccount)).toJSON().hbars,
        newAliasBalance: (await getBalanceQuery(etherAliasAccount)).toJSON().hbars,
      })
    }
  )
