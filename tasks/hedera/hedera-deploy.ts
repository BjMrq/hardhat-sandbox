import { task } from "hardhat/config"
import { ContractCreateFlow, ContractFunctionParameters, ContractInfoQuery } from "@hashgraph/sdk"
import { getHederaClientAndAccounts } from "../../helpers/hedera/hedera-helpers"

task("hedera-deploy").setAction(
  async (noArguments, { ethers, hardhatArguments: { network }, deployments: { deploy } }) => {
    const { hederaClient } = getHederaClientAndAccounts(network)

    const featureContract = await ethers.getContractFactory("Box")

    const deployedContract = await new ContractCreateFlow()
      .setGas(200000)
      .setBytecode(featureContract.bytecode)
      .setConstructorParameters(new ContractFunctionParameters().addString("#6038ca"))
      .execute(hederaClient)

    const contractId = (
      await deployedContract.getReceipt(hederaClient)
    ).contractId?.toString() as string

    const { contractAccountId } = await new ContractInfoQuery()
      .setContractId(contractId)
      .execute(hederaClient)

    console.log({
      contractId,
      evmAddress: `0x${contractAccountId}`,
    })
  }
)
