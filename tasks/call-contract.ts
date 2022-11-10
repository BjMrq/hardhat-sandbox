import { task } from "hardhat/config"

task("call-contract")
  .addParam("name")
  .addParam("address")
  .addParam("method")
  .addOptionalParam("args")
  .setAction(
    async (
      {
        name,
        address,
        method,
        args,
      }: { name: string; address: string; method: string; args?: string },
      { ethers: { getContractAt } }
    ) => {
      const ContractToCall = await getContractAt(name, address)

      const callArguments = args?.split(",") || []

      console.log(await ContractToCall[method](...callArguments))
    }
  )
