/** Replace the values below with the addresses of your smart contracts. */

// 1. Set up the network your smart contracts are deployed to.
// First, import the chain from the package, then set the NETWORK variable to the chain.
import { Zkatana } from "@thirdweb-dev/chains";
export const NETWORK = Zkatana;

// 2. The address of the marketplace V3 smart contract.
// Deploy your own: https://thirdweb.com/thirdweb.eth/MarketplaceV3
export const MARKETPLACE_ADDRESS = "0x2AAc15e1eC0EABb355436E1251f223901819EA35";

// 3. The address of your NFT collection smart contract.
export const NFT_COLLECTION_ADDRESS =
  "0x27610D528949419668E7Ff9EB08eEDdCd0500cC3";

// (Optional) Set up the URL of where users can view transactions on
// For example, below, we use Mumbai.polygonscan to view transactions on the Mumbai testnet.
export const ETHERSCAN_URL = "https://zkatana.blockscout.com/";
