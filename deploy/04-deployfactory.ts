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

  await contractFactory.createNewBox("factored")

  console.log("Boxes", await contractFactory.getAllBoxes())
}

deployColorBox.tags = ["all", "Box"]
export default deployColorBox

// deploying "Box" (tx: 0x970b63bf828b3d4e35ec3ab6de276f5e98ea5d96f3f09ae104d3eddb940e2c85)...: deployed at 0x520d917448201cf90720708Ab91133C6493ad3c1 with 628111 gas
// running etherscan-verify for Box deployed at 0x520d917448201cf90720708Ab91133C6493ad3c1:
// verifying Box (0x520d917448201cf90720708Ab91133C6493ad3c1) ...
// waiting for result...
//  => contract Box is now verified
// running sourcify for Box deployed at 0x520d917448201cf90720708Ab91133C6493ad3c1:
// verifying Box (0x520d917448201cf90720708Ab91133C6493ad3c1 on chain 5) ...
// "<html>\r\n<head><title>504 Gateway Time-out</title></head>\r\n<body bgcolor=\"white\">\r\n<center><h1>504 Gateway Time-out</h1></center>\r\n<hr><center>nginx/1.14.2</center>\r\n</body>\r\n</html>\r\n"
// deploying "PausableBox" (tx: 0xa9ee7999c3494f2669361923c4bf239c2f2592344f103d9ea57dd1a493e82756)...: deployed at 0x17b5AE6eEb6797D50d1f16F51F45f4c4098F83f6 with 519576 gas
// running etherscan-verify for PausableBox deployed at 0x17b5AE6eEb6797D50d1f16F51F45f4c4098F83f6:
// verifying PausableBox (0x17b5AE6eEb6797D50d1f16F51F45f4c4098F83f6) ...
// waiting for result...
//  => contract PausableBox is now verified
// running sourcify for PausableBox deployed at 0x17b5AE6eEb6797D50d1f16F51F45f4c4098F83f6:
// verifying PausableBox (0x17b5AE6eEb6797D50d1f16F51F45f4c4098F83f6 on chain 5) ...
// "<html>\r\n<head><title>504 Gateway Time-out</title></head>\r\n<body bgcolor=\"white\">\r\n<center><h1>504 Gateway Time-out</h1></center>\r\n<hr><center>nginx/1.14.2</center>\r\n</body>\r\n</html>\r\n"
// deploying "AccessRolesBox" (tx: 0xcceed9b502f6784ed8624a6bd354f8a2fff825fa73fe4ad169adf3d982252d31)...: deployed at 0xA834AC1A5eF83AE03FC7ac509345a291B4E03459 with 794397 gas
// running etherscan-verify for AccessRolesBox deployed at 0xA834AC1A5eF83AE03FC7ac509345a291B4E03459:
// verifying AccessRolesBox (0xA834AC1A5eF83AE03FC7ac509345a291B4E03459) ...
// waiting for result...
//  => contract AccessRolesBox is now verified
// running sourcify for AccessRolesBox deployed at 0xA834AC1A5eF83AE03FC7ac509345a291B4E03459:
// verifying AccessRolesBox (0xA834AC1A5eF83AE03FC7ac509345a291B4E03459 on chain 5) ...
// "<html>\r\n<head><title>504 Gateway Time-out</title></head>\r\n<body bgcolor=\"white\">\r\n<center><h1>504 Gateway Time-out</h1></center>\r\n<hr><center>nginx/1.14.2</center>\r\n</body>\r\n</html>\r\n"
// deploying "VerifiableBox" (tx: 0xe1bce04253c08c3dbdc4bddd81fcd963726e3807a2cf25f5b2ca70ec37cc8057)...: deployed at 0x132870A9f6EeC78397Dd53706b4c0E4e8aa6aAD0 with 628099 gas
// running etherscan-verify for VerifiableBox deployed at 0x132870A9f6EeC78397Dd53706b4c0E4e8aa6aAD0:
// verifying VerifiableBox (0x132870A9f6EeC78397Dd53706b4c0E4e8aa6aAD0) ...
// waiting for result...
//  => contract VerifiableBox is now verified
// running sourcify for VerifiableBox deployed at 0x132870A9f6EeC78397Dd53706b4c0E4e8aa6aAD0:
// verifying VerifiableBox (0x132870A9f6EeC78397Dd53706b4c0E4e8aa6aAD0 on chain 5) ...
// "<html>\r\n<head><title>504 Gateway Time-out</title></head>\r\n<body bgcolor=\"white\">\r\n<center><h1>504 Gateway Time-out</h1></center>\r\n<hr><center>nginx/1.14.2</center>\r\n</body>\r\n</html>\r\n"
// upgradable "ColorBoxV1" (tx: 0x0fa1f0c714df9af4ee26ca8a976f317e7f0b90ca0e8e9d6f367106cbed70491a)...: deployed at 0x6B4cF38fC2d2CE5C16af3e648D18b7C7b8EA5dD9
// running verify for ColorBoxV1 deployed at 0x6B4cF38fC2d2CE5C16af3e648D18b7C7b8EA5dD9:
// Verifying implementation: 0x9c97CBA3Ec35d4448f771F85096F7d5AdB608AD7
// Generating typings for: 42 artifacts in dir: ./helpers/generated-types for target: ethers-v5
// Successfully generated 128 typings!
// Compiled 41 Solidity files successfully
// Successfully submitted source code for contract
// contracts/ColorBoxV1.sol:ColorBoxV1 at 0x9c97CBA3Ec35d4448f771F85096F7d5AdB608AD7
// for verification on the block explorer. Waiting for verification result...

// Successfully verified contract ColorBoxV1 on Etherscan.
// https://goerli.etherscan.io/address/0x9c97CBA3Ec35d4448f771F85096F7d5AdB608AD7#code
// Verifying proxy: 0x6B4cF38fC2d2CE5C16af3e648D18b7C7b8EA5dD9
// Contract at 0x6B4cF38fC2d2CE5C16af3e648D18b7C7b8EA5dD9 already verified.
// Linking proxy 0x6B4cF38fC2d2CE5C16af3e648D18b7C7b8EA5dD9 with implementation
// Successfully linked proxy to implementation.
// Verifying proxy admin: 0xdE6906d533006539e0421F35376f4eb723E00a24
// Contract at 0xdE6906d533006539e0421F35376f4eb723E00a24 already verified.

// Proxy fully verified.
// deploying "ColorBoxV2" (tx: 0x79c60a0b060e2afa170e04ee4ac6e46d15e1923e10965d22d949a1362ae42cf1)...: deployed at 0xfA95E8Dc359F9936114ED7049e58EE79aDBe2F93 with 669538 gas
// running etherscan-verify for ColorBoxV2 deployed at 0xfA95E8Dc359F9936114ED7049e58EE79aDBe2F93:
// verifying ColorBoxV2 (0xfA95E8Dc359F9936114ED7049e58EE79aDBe2F93) ...
// waiting for result...
//  => contract ColorBoxV2 is now verified
// running sourcify for ColorBoxV2 deployed at 0xfA95E8Dc359F9936114ED7049e58EE79aDBe2F93:
// verifying ColorBoxV2 (0xfA95E8Dc359F9936114ED7049e58EE79aDBe2F93 on chain 5) ...
// "<html>\r\n<head><title>504 Gateway Time-out</title></head>\r\n<body bgcolor=\"white\">\r\n<center><h1>504 Gateway Time-out</h1></center>\r\n<hr><center>nginx/1.14.2</center>\r\n</body>\r\n</html>\r\n"
