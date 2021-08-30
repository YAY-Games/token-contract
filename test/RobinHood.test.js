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
        describe('positive', function () {
            // TODO
        });
        describe('negative', function () {
            // TODO
            // it('self', async function () {
                // await expectRevert(
                //     this.token.burnFrom(account1, initialSupply, { from: account2 }),
                //     'BEP20: account is blacklisted',
                // );
            // });
        });
    });


  

});
