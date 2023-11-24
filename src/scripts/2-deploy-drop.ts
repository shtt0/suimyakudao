import { AddressZero } from "@ethersproject/constants";
import { readFileSync } from "fs";

import sdk from "./1-initialize-sdk";

(async () => {
  try {
    const editionDropAddress = await sdk.deployer.deployEditionDrop({
      name: "Suimyaku Dao Membership NFT",
      description: "Suimyaku Dao Membership NFT",
      image: readFileSync("src/scripts/assets/logo.png"),
      primary_sale_recipient: 0x8d77b4e72c5aec74d24176bb8dc21843dcfc6e54,
    });

    // 初期化し、返ってきた editionDrop コントラクトのアドレスから editionDrop を取得
    const editionDrop = sdk.getContract(editionDropAddress, "edition-drop");

    // メタデータを取得
    const metadata = await (await editionDrop).metadata.get();

    // editionDrop コントラクトのアドレスを出力
    console.log(
      "✅ Successfully deployed editionDrop contract, 0xF68c366613C84A39cfb67071c79Fa65E3E1d0758:",
      editionDropAddress
    );

    // editionDrop コントラクトのメタデータを出力
    console.log("✅ editionDrop metadata:", metadata);
  } catch (error) {
    // エラーをキャッチしたら出力
    console.log("failed to deploy editionDrop contract", error);
  }
})();
