const DappToken = artifacts.require("./DappToken.sol");
const DappTokenSale = artifacts.require("./DappTokenSale.sol");

module.exports = async (deployer) => {
  let tokenPrice = 1000000000000000;

  await deployer.deploy(DappToken, 100000000);
  await deployer.deploy(DappTokenSale, DappToken.address, tokenPrice);
};
