var DappTokenSale = artifacts.require("./DappTokenSale.sol");

contract("DappTokenSale", async function (accounts) {
    let dApp;
    let tokenPrice = 1000000000000000; //wei

    // before tells our tests to run this first before anything else
    before(async () => {
      dApp = await DappTokenSale.deployed();
    });


    it("Initializes the contract with the correct Values", async () => {
        let address = await dApp.address;
        assert.notEqual(address, 0x0, "Has the correct address");

        let tokenContract = await dApp.tokenContract();

        assert.notEqual(tokenContract, 0x0, "Has a token correct address");

        let price = await dApp.tokenPrice();

        assert.equal(price, tokenPrice, "Token price is correct");


      });
    

})