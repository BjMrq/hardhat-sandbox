import { task } from "hardhat/config"
import { type ethers } from "ethers"

const getCurrentGasLimit = async (provider: ethers.providers.JsonRpcProvider): Promise<string> =>
  (await provider.getBlock(await provider.getBlockNumber())).gasLimit.toString()

task("get-current-gas-info")
  .addFlag("history")
  .setAction(async ({ history }, { ethers: { provider } }) => {
    const { gasPrice, lastBaseFeePerGas, maxFeePerGas, maxPriorityFeePerGas } =
      await provider.getFeeData()

    console.log({
      price: {
        gasPrice: gasPrice?.toString(),
        lastBaseFeePerGas: lastBaseFeePerGas?.toString(),
        maxFeePerGas: maxFeePerGas?.toString(),
        maxPriorityFeePerGas: maxPriorityFeePerGas?.toString(),
      },
      limit: await getCurrentGasLimit(provider),
      ...(history && { history: await provider.send("eth_feeHistory", []) }),
    })
  })
