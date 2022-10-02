import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import {
  upgradableContractDeployAndVerify,
  upgradeContractAndVerify,
} from "../helpers/contracts/deploy"

const deployColorBox: DeployFunction = async ({}: HardhatRuntimeEnvironment) => {
  const ContractV1 = await upgradableContractDeployAndVerify({
    contractName: "ColorBoxV1",
    deploymentArguments: ["blue"],
  })

  const ContractV2 = await upgradeContractAndVerify({
    nexUpgradeContractName: "ColorBoxV2",
    currentContract: ContractV1,
  })
}

deployColorBox.tags = ["all", "Box"]
export default deployColorBox
