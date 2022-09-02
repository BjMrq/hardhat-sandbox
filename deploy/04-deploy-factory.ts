import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { simpleContractDeployAndVerify } from "../helpers/contracts/deploy"
import { BoxFactory } from "../helpers/generated-types"

const deployColorBox: DeployFunction = async ({
  ethers: { getContractAt },
}: HardhatRuntimeEnvironment) => {
  const deployedFactory = await simpleContractDeployAndVerify({
    contractName: "BoxFactory",
    deploymentArguments: [],
  })
  const contractFactory = await getContractAt<BoxFactory>("BoxFactory", deployedFactory.address)

  await (await contractFactory.createNewBox("factored")).wait(6)
}

deployColorBox.tags = ["all", "Box"]
export default deployColorBox
