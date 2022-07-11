export const mintNFT = 

// REPLACE THIS WITH YOUR CONTRACT NAME + ADDRESS
import buildSpacemyPics from 0x29f4ad0f552505bb 
// This remains the same 
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20

transaction(
  recipient: Address,
  name: String,
  description: String,
  thumbnail: String,
) {
  prepare(signer: AuthAccount) {
    if signer.borrow<&buildSpacemyPics.Collection>(from: buildSpacemyPics.CollectionStoragePath) != nil {
      return
    }

    // Create a new empty collection
    let collection <- buildSpacemyPics.createEmptyCollection()

    // save it to the account
    signer.save(<-collection, to: buildSpacemyPics.CollectionStoragePath)

    // create a public capability for the collection
    signer.link<&{NonFungibleToken.CollectionPublic, MetaDateViews.ResolverCollection}>(
      buildSpacemyPics.CollectionPublicPath,
      target: buildSpacemyPics.CollectionStoragePath
    )
  }


  execute {
    // Borrow the recipient's public NFT collection reference
    let receiver = getAccount(recipient)
      .getCapability(buildSpacemyPics.CollectionPublicPath)
      .borrow<&{NonFungibleToken.CollectionPublic}>()
      ?? panic("Could not get receiver reference to the NFT Collection")

    // Mint the NFT and deposit it to the recipient's collection
    buildSpacemyPics.mintNFT(
      recipient: receiver,
      name: name,
      description: description,
      thumbnail: thumbnail,
    )
    
    log("Minted an NFT and stored it into the collection")
  } 
}
