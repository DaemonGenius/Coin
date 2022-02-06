var DappToken = artifacts.require("./DappToken.sol");

contract('DappToken',  function(accounts){
    it('sets the total supply upon deployment', async function(){
        let dApp = await DappToken.deployed();
        let totalSupply = await dApp.totalSupply();
        console.log(totalSupply.toNumber());
        assert.equal(totalSupply.toNumber(), 100000000, 'sets the total supply to 1 000 000 000 000')
    })
})