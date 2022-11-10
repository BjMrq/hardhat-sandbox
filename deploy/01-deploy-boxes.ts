import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { simpleContractDeployAndVerify } from "../helpers/contracts/deploy"

const deployColorBox: DeployFunction = async ({}: HardhatRuntimeEnvironment) => {
  //Regular
  await simpleContractDeployAndVerify({
    contractName: "RevertibleBox",
    deploymentArguments: ["regular"],
  })

  //Pausable
  await simpleContractDeployAndVerify({
    contractName: "PausableBox",
    deploymentArguments: ["pausable"],
  })

  //Access Control
  await simpleContractDeployAndVerify({
    contractName: "AccessRolesBox",
    deploymentArguments: ["pausable"],
  })
}

deployColorBox.tags = ["all", "Box"]
export default deployColorBox
