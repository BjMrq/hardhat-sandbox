import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { simpleContractDeployAndVerify } from "../helpers/contracts/deploy"

const deployColorBox: DeployFunction = async ({
  ethers: { provider },
}: HardhatRuntimeEnvironment) => {
  await simpleContractDeployAndVerify({
    contractName: "DummyGovernor",
    deploymentArguments: [],
    deploymentOptions: {
      gasLimit: (await provider.getBlock("latest")).gasLimit.toString(),
    },
  })
}

deployColorBox.tags = ["all", "Governor"]
export default deployColorBox
