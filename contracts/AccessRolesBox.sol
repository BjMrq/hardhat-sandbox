// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract AccessRolesBox is AccessControl{

    string public value;

    event ColorChanged(string newValue);

    bytes32 public constant VALUE_GETTER = keccak256("VALUE_GETTER");
    bytes32 public constant VALUE_SETTER = keccak256("VALUE_SETTER");


    constructor(string memory initialValue) {
        value = initialValue;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(VALUE_GETTER, msg.sender);
        _grantRole(VALUE_SETTER, msg.sender);
    }

    function changeValue(string calldata newValue) public onlyRole(VALUE_SETTER) {
        value = newValue;
        emit ColorChanged(newValue);
    }

    function getValue() public view onlyRole(VALUE_GETTER) returns(string memory) {
        return value;
    }
}