const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Test", () => {
  it("should mint and transfer an NFT to someone", async () => {
    const FiredGuys = await ethers.getContractFactory("FiredGuys");
    const firedGuys = await FiredGuys.deploy();
    await firedGuys.deployed();

    const recipient = "0xdd2fd4581271e230360230f9337d5c0430bf44c0";
    const metadataURI = "cid/test.png";

    let balance = await firedGuys.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await firedGuys.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther("0.05"),
    });

    // wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await firedGuys.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await firedGuys.isContentOwned(metadataURI)).to.equal(true);
  });
});
