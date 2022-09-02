import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { upgradableContractDeployAndVerify } from "../helpers/contracts/deploy"

const deployColorBox: DeployFunction = async ({}: HardhatRuntimeEnvironment) => {
  // await upgradableContractDeployAndVerify({
  //   contractName: "ColorBoxV1",
  //   deploymentArguments: ["blue"],
  // })
}

deployColorBox.tags = ["all", "Box"]
export default deployColorBox
