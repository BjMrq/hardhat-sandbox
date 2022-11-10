import { ContractTransaction } from "ethers"

export const withAwaitConfirmation = (
  transactionFunctionDone: Promise<ContractTransaction> | ContractTransaction,
  confirmationBlocks?: number
) =>
  Promise.resolve(transactionFunctionDone).then((transaction) =>
    transaction.wait(confirmationBlocks || 1)
  )
