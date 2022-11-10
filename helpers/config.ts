import hardhatConfig from "../hardhat.config"

//@ts-expect-error extended hardhat config
export const getPrivateKey = (keyName: "oz" | "hederaEOA") => hardhatConfig.privateKeys[keyName]
