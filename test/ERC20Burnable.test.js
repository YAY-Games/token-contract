const { BN } = require('@openzeppelin/test-helpers');

const { shouldBehaveLikeERC20Burnable } = require('./behaviors/ERC20Burnable.behavior');
const ERC20BurnableMock = artifacts.require('ERC20BurnableMock');

contract('ERC20Burnable', function (accounts) {
  const [ owner, ...otherAccounts ] = accounts;

  const initialBalance = new BN(1000);

  const name = 'Yay Games';
  const symbol = '$YAY';

  beforeEach(async function () {
    this.token = await ERC20BurnableMock.new({ from: owner });
    await this.token.mint(initialBalance);
  });

  shouldBehaveLikeERC20Burnable(owner, initialBalance, otherAccounts);
});
