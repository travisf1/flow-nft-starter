

`
// REPLACE THIS WITH YOUR CONTRACT NAME + ADDRESS
import buildSpacemyPicsfinal from 0x29f4ad0f552505bb 
// This remains the same 
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20


transaction{

    let minter: &buildSpacemypicsfinal.NFTMinter

    prepare(signer: Authaccount) {
        
        self.minter = signer.borrow<&buildSpacemyPicsfinal.NFTMinter>(from: buildSpacemyPicsfinal.MinterStoragePath)
        ?? panic("Could not borrow a reference to the NFT Minter")
    }

  execute {

    let receiver = getAccount(0x29f4ad0f552505bb)
        .getCapability(buildSpacemyPicsfinal.CollectionPublicPath)
        .borrow<&{NonFungibleToken.Collection}>()
        ?? panic("Could not get receiver reference to the NFT Collection")

  self.minter.mintNFT(
    recipient: receiver,
    name: name,
    description: description,
    thumbnail: thumbnail,
  )      

  log("Minted an NFT and stored it into the collection")
  }  

}


`