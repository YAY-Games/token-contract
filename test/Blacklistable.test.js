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

    describe('banned user', function () {
        describe('transfer', function () {
            describe('for user', function () {
                beforeEach(async function () {
                    await this.token.transfer(account1, initialSupply, { from: initialHolder });
                });
                it('from banned', async function () {
                    this.token.blacklist(account1, { from: initialHolder });
                    await expectRevert(
                        this.token.transfer(account2, initialSupply, { from: account1 }),
                        'BEP20: account is blacklisted',
                    );
                });
                it('to banned', async function () {
                    this.token.blacklist(account2, { from: initialHolder });
                    await expectRevert(
                        this.token.transfer(account2, initialSupply, { from: account1 }),
                        'BEP20: account is blacklisted',
                    );
                });
            });
        });
        describe('burn', function () {
            describe('for user', function () {
                beforeEach(async function () {
                    await this.token.transfer(account1, initialSupply, { from: initialHolder });
                });
                it('self', async function () {
                    await this.token.blacklist(account1, { from: initialHolder });
                    await expectRevert(
                        this.token.burn(initialSupply, { from: account1 }),
                        'BEP20: account is blacklisted',
                    );
                });
                it('to banned', async function () {
                    await this.token.approve(account2, initialSupply, { from: account1 });
                    await this.token.blacklist(account1, { from: initialHolder });
                    await expectRevert(
                        this.token.burnFrom(account1, initialSupply, { from: account2 }),
                        'BEP20: account is blacklisted',
                    );
                });
                it('from banned', async function () {
                    await this.token.approve(account2, initialSupply, { from: account1 });
                    await this.token.blacklist(account2, { from: initialHolder });
                    await this.token.burnFrom(account1, initialSupply, { from: account2 });
                    expect(await this.token.balanceOf(account1)).to.be.bignumber.equal(new BN("0"));
                });
            });
        });
    });
    describe('unbanned user', function () {
        describe('transfer', function () {
            describe('for user', function () {
                beforeEach(async function () {
                    await this.token.transfer(account1, initialSupply, { from: initialHolder });
                });
                it('from unbanned', async function () {
                    await this.token.blacklist(account1, { from: initialHolder });
                    await this.token.unBlacklist(account1, { from: initialHolder });
                    await this.token.transfer(account2, initialSupply, { from: account1 })
                    expect(await this.token.balanceOf(account2)).to.be.bignumber.equal(initialSupply);
                });
                it('to banned', async function () {
                    await this.token.blacklist(account2, { from: initialHolder });
                    await this.token.unBlacklist(account2, { from: initialHolder });
                    await this.token.transfer(account2, initialSupply, { from: account1 });
                    expect(await this.token.balanceOf(account2)).to.be.bignumber.equal(initialSupply);
                });
            });
        });
        describe('burn', function () {
            describe('for user', function () {
                beforeEach(async function () {
                    await this.token.transfer(account1, initialSupply, { from: initialHolder });
                });
                it('self', async function () {
                    await this.token.blacklist(account1, { from: initialHolder });
                    await this.token.unBlacklist(account1, { from: initialHolder });
                    await this.token.burn(initialSupply, { from: account1 });
                    expect(await this.token.balanceOf(initialHolder)).to.be.bignumber.equal(new BN("0"));
                });
                it('to banned', async function () {
                    await this.token.approve(account2, initialSupply, { from: account1 });
                    await this.token.blacklist(account1, { from: initialHolder });
                    await this.token.unBlacklist(account1, { from: initialHolder });
                    await this.token.burnFrom(account1, initialSupply, { from: account2 });
                    expect(await this.token.balanceOf(account1)).to.be.bignumber.equal(new BN("0"));
                });
                it('from banned', async function () {
                    await this.token.approve(account2, initialSupply, { from: account1 });
                    await this.token.blacklist(account2, { from: initialHolder });
                    await this.token.unBlacklist(account2, { from: initialHolder });
                    await this.token.burnFrom(account1, initialSupply, { from: account2 });
                    expect(await this.token.balanceOf(account1)).to.be.bignumber.equal(new BN("0"));
                });
            });
        });
    });
    describe('mint', function () {
        it('for admin', async function () {
            // await this.token.blacklist(initialHolder, {from: initialHolder});
            await this.token.mint(initialSupply, {from: initialHolder});
            expect(await this.token.balanceOf(initialHolder)).to.be.bignumber.equal(initialSupply.mul(new BN("2")));
        });
    });
    it('cannot ban zero address', async function () {
        await expectRevert(
            this.token.blacklist(ZERO_ADDRESS, {from: initialHolder}),
            'BEP20: blacklisted zero address',
        );
    });
    it('ban blacklisted', async function () {
        await this.token.blacklist(account1, {from: initialHolder});
        await expectRevert(
            this.token.blacklist(account1, {from: initialHolder}),
            'BEP20: already blacklisted',
        )
    });
    it('ban owner', async function () {
        await expectRevert(
            this.token.blacklist(initialHolder, {from: initialHolder}),
            'BEP20: blacklisted owner',
        )
    });
    it('unban not blacklisted', async function () {
        await expectRevert(
            this.token.unBlacklist(account1, {from: initialHolder}),
            'BEP20: not yet blacklisted',
        )
    });
    describe('takeBlackFunds', function () {
        beforeEach(async function () {
            await this.token.transfer(account1, initialSupply, { from: initialHolder });
        });
        it('for banned', async function () {
            await this.token.blacklist(account1, {from: initialHolder});
            await this.token.takeBlackFunds(account1, initialSupply, {from: initialHolder});
            expect(await this.token.balanceOf(initialHolder)).to.be.bignumber.equal(new BN("0"));
        });
        it('for not banned', async function () {
            await expectRevert(
                this.token.takeBlackFunds(account1, initialSupply, {from: initialHolder}),
                'BEP20: target must be blacklisted',
            )
        });
    });

  

});
