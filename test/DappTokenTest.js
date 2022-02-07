var DappToken = artifacts.require('./DappToken.sol')

contract('DappToken', async function (accounts) {
  let dApp
  // before tells our tests to run this first before anything else
  before(async () => {
    dApp = await DappToken.deployed()
  })

  it('Initializes the contract with the correct values',  async () => {

    let name = await dApp.name()
    assert.equal(
      name,
      'Dapp Token',
      'Has the correct name',
    )
  })

  it('sets the total supply upon deployment',  async () => {

    let totalSupply = await dApp.totalSupply()
    console.log(totalSupply.toNumber())
    assert.equal(
      totalSupply.toNumber(),
      100000000,
      'sets the total supply to 1 000 000 000 000',
    )
  })

  it('BalanceOf', async () => {

    let BalanceOf = await dApp.balanceOf(accounts[0])
    console.log(BalanceOf.toNumber())
    assert.equal(
      BalanceOf.toNumber(),
      100000000,
      'allocates the initial supply to the admin account',
    )
  })
})
