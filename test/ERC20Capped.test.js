const { BN, ether, expectRevert } = require('@openzeppelin/test-helpers');
const { shouldBehaveLikeERC20Capped } = require('./behaviors/ERC20Capped.behavior');

const ERC20Capped = artifacts.require('ERC20CappedMock');

contract('ERC20Capped', function (accounts) {
  const [ minter, ...otherAccounts ] = accounts;

  const cap = ether('1000000000');
  const initialBalance = new BN(1000);

  const name = 'Yay Games';
  const symbol = '$YAY';

  context('once deployed', async function () {
    beforeEach(async function () {
      this.token = await ERC20Capped.new({ from: minter });
      // await this.token.mint(initialBalance);
    });

    shouldBehaveLikeERC20Capped(minter, otherAccounts, cap);
  });
});
