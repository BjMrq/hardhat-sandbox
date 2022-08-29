// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PausableBox is Pausable, Ownable {

    string public value;

    event ColorChanged(string newValue);


    constructor(string memory initialValue) {
        value = initialValue;
    }

    function changeValue(string calldata newValue) public whenNotPaused {
        value = newValue;
        emit ColorChanged(newValue);
    }

    function getValue() public view whenNotPaused returns(string memory) {
        return value;
    }
    
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}