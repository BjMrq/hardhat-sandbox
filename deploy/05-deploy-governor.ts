import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { simpleContractDeployAndVerify } from "../helpers/contracts/deploy"
import { sleep } from "../helpers/chain/wait-block"

const deployColorBox: DeployFunction = async ({}: HardhatRuntimeEnvironment) => {
  await sleep(40000)
  await simpleContractDeployAndVerify({
    contractName: "DummyGovernor",
    deploymentArguments: [],
    deploymentOptions: {
      gasLimit: "10000000",
    },
  })
}

deployColorBox.tags = ["all", "Governor"]
export default deployColorBox
