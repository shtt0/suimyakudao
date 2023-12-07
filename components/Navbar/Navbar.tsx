import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

/**
 * Navigation bar that shows up on all pages.
 * Rendered in _app.tsx file above the page content.
 */
export function Navbar() {
  const address = useAddress();

  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/" className={`${styles.homeLink} ${styles.navLeft}`}>
            <Image
              src="/sub_logo.png"
              width={122 * 1.2}
              height={40 * 1.2}
              alt="水脈DAO"
            />
          </Link>

          <div className={styles.navMiddle}>
            <Link href="/buy" className={styles.link}>
              / Ticket NFTの購入 /
            </Link>
            <Link
              href="https://app.aragon.org/#/daos/mumbai/0x9fba03ce3e690c3c8af47241d9436b3916ec8c7e/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              / DAOへの起案・投票 /
            </Link>
          </div>
        </div>

        <div className={styles.navRight}>
          <div className={styles.navConnect}>
            <ConnectWallet theme="dark" btnTitle="Connect Wallet" />
          </div>
          {address && (
            <Link className={styles.link} href={`/profile/${address}`}>
              <Image
                className={styles.profileImage}
                src="/user-icon.png"
                width={42}
                height={42}
                alt="Profile"
              />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
