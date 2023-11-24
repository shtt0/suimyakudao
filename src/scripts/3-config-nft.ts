import { readFileSync } from "fs";

import sdk from "./1-initialize-sdk";
import { editionDropAddress } from "./module";

const editionDrop = sdk.getContract(
  0xf68c366613c84a39cfb67071c79fa65e3e1d0758,
  "edition-drop"
);

(async () => {
  try {
    await (
      await editionDrop
    ).createBatch([
      {
        name: "Member's symbol",
        description: "daoにアクセスすることができる限定アイテムです",
        image: readFileSync("src/scripts/assets/MEMBERSHIP.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
