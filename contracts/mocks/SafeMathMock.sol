// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "../BEP20YAY.sol";

contract SafeMathMock {

    // using the do* naming convention to avoid warnings due to clashing opcode names

    function doAdd(uint256 a, uint256 b) public pure returns (uint256) {
        return SafeMath.add(a, b);
    }

    function doSub(uint256 a, uint256 b) public pure returns (uint256) {
        return SafeMath.sub(a, b);
    }

    function doMul(uint256 a, uint256 b) public pure returns (uint256) {
        return SafeMath.mul(a, b);
    }

    function doDiv(uint256 a, uint256 b) public pure returns (uint256) {
        return SafeMath.div(a, b);
    }

    function doMod(uint256 a, uint256 b) public pure returns (uint256) {
        return SafeMath.mod(a, b);
    }

    function subWithMessage(uint256 a, uint256 b, string memory errorMessage) public pure returns (uint256) {
        return SafeMath.sub(a, b, errorMessage);
    }

    function divWithMessage(uint256 a, uint256 b, string memory errorMessage) public pure returns (uint256) {
        return SafeMath.div(a, b, errorMessage);
    }

    function modWithMessage(uint256 a, uint256 b, string memory errorMessage) public pure returns (uint256) {
        return SafeMath.mod(a, b, errorMessage);
    }

}