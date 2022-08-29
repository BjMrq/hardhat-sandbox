import { task } from "hardhat/config"
import { AccountBalanceQuery } from "@hashgraph/sdk"
import { getHederaClientAndAccounts } from "../helpers/hedera/hedera-helpers"

type SandboxParams = { account?: string; address?: string }

task("get-address-info")
  .addOptionalParam("account")
  .addOptionalParam("address")
  .setAction(
    async (
      { account, address }: SandboxParams,
      {
        hardhatArguments: { network },
        ethers: {
          provider,
          utils: { formatEther },
        },
      }
    ) => {
      if (account) {
        const { getAccountQuery } = getHederaClientAndAccounts(network)

        const accountInfo = await getAccountQuery(account)

        console.log({
          balance: accountInfo.balance.toString(),
          nonce: accountInfo.ethereumNonce?.toString(),
        })
      }

      if (address) {
        address
        console.log({
          balance: formatEther((await provider.getBalance(address)).toString()),
          nonce: await provider.getTransactionCount(address),
        })
      }
    }
  )
