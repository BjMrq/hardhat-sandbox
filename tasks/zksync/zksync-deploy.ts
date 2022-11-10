import { task } from "hardhat/config"
import { Wallet } from "zksync-web3"
import { getPrivateKey } from "../../helpers/config"
import { Deployer } from "@matterlabs/hardhat-zksync-deploy"

task("zksync-deploy")
  .addParam("contract")
  .addOptionalParam("initarguments")
  .setAction(
    async ({ contract, initarguments }: { contract: string; initarguments: string }, hre) => {
      const wallet = new Wallet(getPrivateKey("oz"))

      const deployer = new Deployer(hre, wallet)
      const contractArtifact = await deployer.loadArtifact(contract)

      const constructorArguments = initarguments?.split(",") || []
      const DeployedContract = await deployer.deploy(contractArtifact, constructorArguments)

      console.log(
        `${contract} deployed at ${
          DeployedContract.address
        } with ${DeployedContract.interface.encodeDeploy(constructorArguments)}`
      )
    }
  )
