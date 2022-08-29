import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { simpleContractDeployAndVerify } from "../helpers/contracts/deploy"

const deployColorBox: DeployFunction = async ({}: HardhatRuntimeEnvironment) => {
  await simpleContractDeployAndVerify({
    contractName: "ColorBoxV2",
  })
}

deployColorBox.tags = ["all", "Box"]
export default deployColorBox
