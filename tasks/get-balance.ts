import { task } from "hardhat/config"
import { AccountBalanceQuery } from "@hashgraph/sdk"
import { getHederaClientAndAccounts } from "../helpers/hedera/hedera-helpers"

type SandboxParams = { account?: string; address?: string }

task("get-balance")
  .addOptionalParam("account")
  .addOptionalParam("address")
  .setAction(
    async (
      { account, address }: SandboxParams,
      { hardhatArguments: { network }, ethers: { provider, utils } }
    ) => {
      if (account) {
        const { hederaClient } = getHederaClientAndAccounts(network)

        console.log({
          balance: (
            await new AccountBalanceQuery().setAccountId(account).execute(hederaClient)
          ).toJSON(),
        })
      }

      if (address) {
        console.log({
          balance: utils.formatEther((await provider.getBalance(address)).toString()),
        })
      }
    }
  )
