import { task } from "hardhat/config"
import { utils, Wallet, Provider } from "zksync-web3"
import { getPrivateKey } from "../../helpers/config"
import { withAwaitConfirmation } from "../../helpers/chain/wait-transactions"
import { providers } from "ethers"

task("zksync-fund-l2")
  .addParam("amount")
  .addOptionalParam("l2ProviderUrl")
  .setAction(
    async (
      { amount, l2ProviderUrl }: { amount: string; l2ProviderUrl?: string },
      { ethers: { utils: etherUtils, provider: l1Provider } }
    ) => {
      const zkWallet = new Wallet(
        getPrivateKey("oz"),
        new Provider(l2ProviderUrl || "https://zksync2-testnet.zksync.dev"),
        l1Provider
      )

      console.log(
        await withAwaitConfirmation(
          zkWallet.deposit({
            to: zkWallet.address,
            token: utils.ETH_ADDRESS,
            amount: etherUtils.parseEther(amount || "0.001"),
          })
        )
      )
    }
  )
