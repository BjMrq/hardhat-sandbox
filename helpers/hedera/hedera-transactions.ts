import {
  AccountId,
  Client,
  Hbar,
  TransferTransaction,
  AccountBalanceQuery,
  ContractCallQuery,
  ContractFunctionParameters,
} from "@hashgraph/sdk"

export const transferTransaction =
  (hederaClient: Client) =>
  async (fromAccount: AccountId, toAccount: AccountId, hbarAmount: number) => {
    return await (
      await new TransferTransaction()
        .addHbarTransfer(fromAccount, new Hbar(hbarAmount).negated())
        .addHbarTransfer(toAccount, new Hbar(hbarAmount))
        .execute(hederaClient)
    ).getReceipt(hederaClient)
  }

export const getBalanceQuery = (hederaClient: Client) => (accountId: AccountId) =>
  new AccountBalanceQuery().setAccountId(accountId).execute(hederaClient)

export const contractCallQuery =
  (hederaClient: Client) =>
  (contractId: string, functionName: string, functionParameters?: ContractFunctionParameters) =>
    new ContractCallQuery()
      .setContractId(contractId)
      .setGas(200_000)
      .setFunction(functionName, functionParameters)
      .execute(hederaClient)
