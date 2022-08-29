import { AccountId, PrivateKey, Client, Hbar } from "@hashgraph/sdk"
import { Wallet, providers } from "ethers"
import hardhatConfig from "../../hardhat.config"
import { contractCallQuery, getBalanceQuery, transferTransaction } from "./hedera-transactions"

type HederaNetworkType = "mainnet" | "testnet"

type HederaAccounts = {
  operator: {
    accountId: string
    privateKey: string
  }
  alias: {
    privateKey: string
  }
}

type HederaExtraConfig = {
  hederaAccounts: HederaAccounts
  type: HederaNetworkType
}

type OperatorConfig = {
  operatorAccount: AccountId
  etherAliasAccount: AccountId
  hederaClient: Client
} & ReturnType<typeof hederaExecutors>

const executeWithHederaClient =
  (hederaClient: Client) =>
  <TFunction extends (...args: any) => any>(hederaTransactionToExecute: TFunction) =>
  (...otherArguments: Parameters<TFunction>): ReturnType<TFunction> =>
    //@ts-expect-error
    hederaTransactionToExecute(...otherArguments).execute(hederaClient)

export const hederaExecutors = (hederaClient: Client) => ({
  transferTransaction: transferTransaction(hederaClient),
  getBalanceQuery: getBalanceQuery(hederaClient),
  contractCallQuery: contractCallQuery(hederaClient),
  hederaExecutor: executeWithHederaClient(hederaClient),
})

const getHederaHardhatConfig = (hederaNetwork: string | undefined = "hederatest") => {
  const { hederaAccounts, type: networkType } = hardhatConfig?.networks?.[
    hederaNetwork
  ] as HederaExtraConfig

  return { hederaAccounts, networkType }
}

export const getHederaClientAndAccounts = (
  hederaNetwork: string | undefined = "hederatest"
): OperatorConfig => {
  const {
    hederaAccounts: { operator, alias },
    networkType,
  } = getHederaHardhatConfig(hederaNetwork)

  const operatorPrivateKey = PrivateKey.fromString(operator.privateKey)
  const operatorAccount = AccountId.fromString(operator.accountId)

  const etherAliasAccount = PrivateKey.fromStringECDSA(alias.privateKey).publicKey.toAccountId(0, 0)

  const hederaClient = Client.forName(networkType)
    .setOperator(operatorAccount, operatorPrivateKey)
    .setDefaultMaxTransactionFee(new Hbar(10))

  return {
    operatorAccount,
    etherAliasAccount,
    hederaClient,
    ...hederaExecutors(hederaClient),
  }
}

export const getHederaSigners = (
  provider: providers.JsonRpcProvider,
  hederaNetwork: string | undefined = "hederatest"
) => {
  const {
    hederaAccounts: { alias },
  } = getHederaHardhatConfig(hederaNetwork)

  return {
    aliasSigner: new Wallet(alias.privateKey, provider),
  }
}
