import { ethers } from "hardhat"
import { executeScriptWith } from "../helpers/scripts/execute-script"

export const sandbox = async () => {
  console.log("Executing script")

  const gasPrice = await ethers.provider.getGasPrice()

  console.log(gasPrice)
}

executeScriptWith(sandbox())
