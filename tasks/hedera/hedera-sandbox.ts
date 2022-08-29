import { task } from "hardhat/config"

type SandboxParams = { account?: string; address?: string }

task("hedera-sandbox").setAction(
  async ({ account, address }: SandboxParams, { hardhatArguments: {}, ethers: {} }) => {}
)
