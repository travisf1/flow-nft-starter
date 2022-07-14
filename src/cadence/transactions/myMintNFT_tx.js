export const myMintNFT = //changed to myMintNFT from mintNFT

`

import buildSpacemyPicsfinalproj from 0x29f4ad0f552505bb 
 
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20


transaction{

    let minter: &buildSpacemyPicsfinalproj.NFTMinter

    prepare(signer: Authaccount) {
        
        self.minter = signer.borrow<&buildSpacemyPicsfinalproj.NFTMinter>(from: buildSpacemyPicsfinalproj.MinterStoragePath)
        ?? panic("Could not borrow a reference to the NFT Minter")
    }

  execute {

    let receiver = getAccount(0x29f4ad0f552505bb)
        .getCapability(buildSpacemyPicsfinalproj.CollectionPublicPath)
        .borrow<&{NonFungibleToken.Collection}>()
        ?? panic("Could not get receiver reference to the NFT Collection")
        
        //changed from self.minter.mintNFT
  self.minter.myMintNFT(
    recipient: receiver,
    name: name,
    description: description,
    thumbnail: thumbnail,
  )      

  log("Minted an NFT and stored it into the collection")
  }  

}


`