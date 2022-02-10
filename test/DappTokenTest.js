var DappToken = artifacts.require('./DappToken.sol')

contract('DappToken', async function (accounts) {
  let dApp
  // before tells our tests to run this first before anything else
  before(async () => {
    dApp = await DappToken.deployed()
  })

  it('Initializes the contract with the correct Symbol', async () => {
    let symbol = await dApp.symbol()
    assert.equal(symbol, 'STEIN', 'Has the correct symbol')
  })

  it('Initializes the contract with the correct Name', async () => {
    let name = await dApp.name()
    assert.equal(name, 'Steinnegen', 'Has the correct name')
  })

  it('sets the total supply upon deployment', async () => {
    let totalSupply = await dApp.totalSupply()
    assert.equal(
      totalSupply.toNumber(),
      100000000,
      'sets the total supply to 1 000 000 000 000',
    )
  })

  it('BalanceOf', async () => {
    let BalanceOf = await dApp.balanceOf(accounts[0])
    assert.equal(
      BalanceOf.toNumber(),
      100000000,
      'allocates the initial supply to the admin account',
    )
  })

  it('Transfers Token Ownership', async () => {
    let transferInstance = ''
    let transferAmount = 250000

    try {
      await dApp.transfer.call(accounts[1], 9999999999999999999999999)
    } catch (error) {
      assert(
        error.message.indexOf('overflow') >= 0,
        'error message must contain revert',
      )
    }

    assert.equal(
      await dApp.transfer.call(accounts[0], transferAmount),
      true,
      'Transfer Successful',
    )

    let BalanceOfSenderPrior = await dApp.balanceOf(accounts[0])
    console.log('Account 0: ' + BalanceOfSenderPrior.toNumber())

    let BalanceOfAccountPrior = await dApp.balanceOf(accounts[1])
    console.log('Account 1: ' + BalanceOfAccountPrior.toNumber())
    let receipt = ''
    try {
      receipt = await dApp.transfer(accounts[1], transferAmount, {
        from: accounts[0],
      })
    } catch (error) {
      assert(error, 'Transfer failure')
    }

    let BalanceOf = await dApp.balanceOf(accounts[1])

    assert.equal(
      BalanceOf.toNumber(),
      BalanceOfAccountPrior.toNumber() + transferAmount,
      'adds the amount to the receiving account',
    )
    console.log('Account 1: ' + BalanceOf.toNumber())

    BalanceOf = await dApp.balanceOf(accounts[0])

    assert.equal(
      BalanceOf.toNumber(),
      BalanceOfSenderPrior.toNumber() - transferAmount,
      'deducts the amount to the sending account',
    )

    console.log('Account 0: ' + BalanceOf.toNumber())

    assert.equal(receipt.logs.length, 1, 'triggers one event')
    assert.equal(
      receipt.logs[0].args._value,
      transferAmount,
      'Logs transfer amount',
    )

    console.log('Receipt Logs: ' + JSON.stringify(receipt.logs[0]))
    console.log('Receipt Logs Transfer Amount: ' + receipt.logs[0].args._value)
  })

  it('approves tokens for delegated transfer', async () => {
    let approve = await dApp.approve.call(accounts[1], 100)
    assert.equal(approve, true, 'Success')


    let receipt = await dApp.approve(accounts[1], 100);
    assert.equal(receipt.logs.length, 1, 'triggers one event')
    assert.equal(receipt.logs[0].event, 'Approval', 'Should be the "Approval" event');

    console.log(receipt);


    let allowance = await dApp.allowance(accounts[0], accounts[1])

    assert.equal(allowance, 100, 'stores the allowance for the delegated transfer');

  })
})
