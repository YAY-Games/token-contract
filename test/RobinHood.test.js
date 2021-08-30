const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { ZERO_ADDRESS } = constants;

const BEP20YAY = artifacts.require('BEP20YAY');

contract('Blacklistable', function (accounts) {
    const [ initialHolder, account1, account2 ] = accounts;

    const name = 'Yay Games';
    const symbol = '$YAY';

    const initialSupply = new BN(100);

    beforeEach(async function () {
        this.token = await BEP20YAY.new();
        await this.token.mint(initialSupply);
    });

    describe('change Robin Hood wallet', function () {
        it('default value', async function () {
            expect(await this.token.robinHoodWallet()).to.equal(ZERO_ADDRESS);
        });
        it('positive', async function () {
            const receipt1 = await this.token.changeRobinHoodWallet(account1, { from: initialHolder });
            expectEvent(receipt1, 'ChangeRobinHoodWallet', {
                oldWallet: ZERO_ADDRESS,
                newWallet: account1
            });
            expect(await this.token.robinHoodWallet()).to.equal(account1);

            const receipt2 = await this.token.changeRobinHoodWallet(account2, { from: initialHolder });
            expectEvent(receipt2, 'ChangeRobinHoodWallet', {
                oldWallet: account1,
                newWallet: account2
            });
            expect(await this.token.robinHoodWallet()).to.equal(account2);
        });
        it('negative', async function () {
            await expectRevert(
                this.token.changeRobinHoodWallet(initialHolder, { from: initialHolder }),
                'BEP20: not owner wallet',
            );
            await expectRevert(
                this.token.changeRobinHoodWallet(account1, { from: account2 }),
                'Ownable: caller is not the owner',
            );
        });
    });


  

});
