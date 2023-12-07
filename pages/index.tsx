import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import IframeComponent from "../components/Iframe.js";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroBackground}>
            <div className={styles.heroBackgroundInner}></div>
          </div>
          <div className={styles.heroAssetFrame}>
            <Image
              src="/torch-asset.png"
              width={1080}
              height={540}
              alt="水脈DAO"
              quality={100}
              className={styles.heroAsset}
            />
          </div>
          <div className={styles.heroBodyContainer}>
            <div className={styles.heroBody}>
              <h2 className={styles.heroTitle}>
                <span className={styles.heroTitleGradient}></span>
                <br />
                Welcome to -水脈 DAO-
              </h2>
              <p className={styles.heroSubtitle}>
                Membershipを持っていない方は、下から入手。
                <br />
                （販売していない時期もあります。DAO内の見学は自由ですが、各機能の利用や参加にはMembership
                NFTによる認証が必要です。
              </p>

              <div className={styles.heroCtaContainer}>
                <h2>Membership NFTの購入はこちら（1人1枚まで）</h2>
              </div>

              <div className={styles.heroCtaContainer}>
                <IframeComponent src="https://embed.ipfscdn.io/ipfs/bafybeicd3qfzelz4su7ng6n523virdsgobrc5pcbarhwqv3dj3drh645pi/?contract=0xe8D2E99337bF101F4d12e657A4Dd9603BF899e03&chain=%7B%22name%22%3A%22zKatana%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fzkatana.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Sepolia+Ether%22%2C%22symbol%22%3A%22ETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22azktn%22%2C%22chainId%22%3A1261120%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22zkatana%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmRySLe3su59dE5x5JPm2b1GeZfz6DR9qUzcbp3rt4SD3A%22%2C%22width%22%3A300%2C%22height%22%3A300%2C%22format%22%3A%22png%22%7D%7D&clientId=2c48a39ba889938f1f0e09bc4d7d820b&theme=dark&primaryColor=blue" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
