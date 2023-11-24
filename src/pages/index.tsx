import { Zkatana } from "@thirdweb-dev/chains";
import {
  ConnectWallet,
  useAddress,
  useChain,
  useContract,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import styles from "../styles/Home.module.css";
import { useEffect, useMemo, useState } from "react";

// If used on the FRONTEND pass your 'clientId'
const sdk = new ThirdwebSDK(Zkatana, {
  clientId: "2c48a39ba889938f1f0e09bc4d7d820b",
});

const Home: NextPage = () => {
  const address = useAddress();
  console.log("👋Wallet Address: ", address);

  const chain = useChain();

  // NFTDrop コントラクトを初期化
  const NFTDrop = useContract(
    "0xe8D2E99337bF101F4d12e657A4Dd9603BF899e03",
    "NFT-drop"
  ).contract;

  // ユーザーがメンバーシップ NFT を持っているかどうかを知るためのステートを定義
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  // NFT をミンティングしている間を表すステートを定義
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    // もしウォレットに接続されていなかったら処理をしない
    if (!address) {
      return;
    }
    // ユーザーがメンバーシップ NFT を持っているかどうかを確認する関数を定義
    const checkBalance = async (tokenId) => {
      try {
        const balance = await NFTDrop!.balanceOf(address, tokenId);
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log(
            `🌟 this user has a membership NFT with TokenID: ${tokenId}!`
          );
        } else {
          setHasClaimedNFT(false);
          console.log(
            `😭 this user doesn't have a membership NFT with TokenID: ${tokenId}.`
          );
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Failed to get balance", error);
      }
    };

    // TokenIDを0から500までに制限してcheckBalance関数を呼び出す
    for (let tokenId = 0; tokenId <= 500; tokenId++) {
      checkBalance(tokenId);
    }
  }, [address, NFTDrop]);

  const mintNft = async () => {
    try {
      setIsClaiming(true);
      await NFTDrop!.claim("0", 1);
      console.log(
        `🌊 Successfully Minted! Check it out : https://zkatana.blockscout.com/address/${NFTDrop!.getAddress()}`
      );
      setHasClaimedNFT(true);
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setIsClaiming(false);
    }
  };

  // ウォレットと接続していなかったら接続を促す
  if (!address) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to 水脈DAO !!</h1>
          <div className={styles.connect}>
            <ConnectWallet />
          </div>
        </main>
      </div>
    );
  }

  // テストネットが Zkatana ではなかった場合に警告を表示
  else if (chain && chain.chainId !== Zkatana.chainId) {
    console.log("wallet address: ", address);
    console.log("chain name: ", chain.name);

    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Zkatana に切り替えてください⚠️</h1>
          <p>この dApp は Zkatana テストネットのみで動作します。</p>
          <p>ウォレットから接続中のネットワークを切り替えてください。</p>
        </main>
      </div>
    );
  }
  // ウォレットと接続されていたら Mint ボタンを表示
  else {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <img
            src="https://purple-inland-toucan-496.mypinata.cloud/ipfs/QmSjZADDDJ7YrnsRWKXdDFA3huBmGGB5iYWai4QWr5bt6R?_gl=1*1mvwk0y*_ga*ODQyMDMwMTU3LjE3MDA0MTM2NTY.*_ga_5RMPXG14TE*MTcwMDc1ODA1OS4xMC4xLjE3MDA3NTgxMDQuMTUuMC4wL"
            alt="ヘッダー画像"
            style={{ maxWidth: "100%" }}
          />
          <h1 className={styles.title}>Welcome to -水脈 DAO-</h1>
          <h1 className={styles.title}>
            Membershipを持っていない方はここから購入
          </h1>
          <iframe
            src="https://embed.ipfscdn.io/ipfs/bafybeicd3qfzelz4su7ng6n523virdsgobrc5pcbarhwqv3dj3drh645pi/?contract=0xe8D2E99337bF101F4d12e657A4Dd9603BF899e03&chain=%7B%22name%22%3A%22zKatana%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fzkatana.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Sepolia+Ether%22%2C%22symbol%22%3A%22ETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22azktn%22%2C%22chainId%22%3A1261120%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22zkatana%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmRySLe3su59dE5x5JPm2b1GeZfz6DR9qUzcbp3rt4SD3A%22%2C%22width%22%3A300%2C%22height%22%3A300%2C%22format%22%3A%22png%22%7D%7D&clientId=2c48a39ba889938f1f0e09bc4d7d820b&theme=dark&primaryColor=blue"
            width="600px"
            height="600px"
            style={{ maxWidth: "100%" }}
            frameBorder="0"
          />
          <a
            className={styles.largeLink}
            href="https://app.aragon.org/#/daos/mumbai/0x9fba03ce3e690c3c8af47241d9436b3916ec8c7e/dashboard"
          >
            <h1>Check our proposals on Aragon.</h1>
          </a>
          <h1 className={styles.title}>*Member限定* Ticketセール</h1>
          <iframe
            src="https://embed.ipfscdn.io/ipfs/bafybeicd3qfzelz4su7ng6n523virdsgobrc5pcbarhwqv3dj3drh645pi/?contract=0xdbD232003D8661b657E014D8d1F5415611aD7169&chain=%7B%22name%22%3A%22zKatana%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fzkatana.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Sepolia+Ether%22%2C%22symbol%22%3A%22ETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22azktn%22%2C%22chainId%22%3A1261120%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22zkatana%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmRySLe3su59dE5x5JPm2b1GeZfz6DR9qUzcbp3rt4SD3A%22%2C%22width%22%3A300%2C%22height%22%3A300%2C%22format%22%3A%22png%22%7D%7D&clientId=2c48a39ba889938f1f0e09bc4d7d820b&theme=dark&primaryColor=blue"
            width="600px"
            height="600px"
            style={{ maxWidth: "100%" }}
            frameBorder="0"
          ></iframe>
        </main>
      </div>
    );
  }
};
export default Home;
