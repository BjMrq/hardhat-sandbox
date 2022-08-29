import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { DEVELOPMENT_CHAINS, TEST_CHAINS } from "./variables"

export type PossibleNetwork = typeof DEVELOPMENT_CHAINS[number] | typeof TEST_CHAINS[number]

type NamedAccounts<TNamedData> = {
  deployer: TNamedData
  faucetFounder: TNamedData
  faucetUser: TNamedData
  astroSender: TNamedData
  astroReceiver: TNamedData
  astroBuyer: TNamedData
  astroSeller: TNamedData
  maliciousEncounter: TNamedData
}

export type NamedAddresses = NamedAccounts<string>
export type NamedSigners = NamedAccounts<SignerWithAddress>

export type NetworkConfigItem = {
  blockConfirmations?: number
}

export type NetworkConfigInfo = {
  [key: string]: NetworkConfigItem
}
