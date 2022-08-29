// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title A box containing some value
/// @author Mr Tumeric A. Gardner
/// @notice You can use this contract for only the most basic simulation
/// @dev All function calls are currently implemented without..
/// @custom:experimental This is an experimental contract.
contract VerifiableBox is Ownable {
  string private value;
  bool public shouldRevert;
  mapping (string => uint) public testMapping;

  // Emitted when the stored value changes
  event ValueChanged(string newValue);
  event ShouldRevertChanged(bool newValue);

  constructor(string memory initialValue) {
    require(true, "if this revert call 911");
    value = initialValue;
    shouldRevert = false;
  }

  function switchShouldRevert() public onlyOwner {
    shouldRevert = !shouldRevert;
    emit ShouldRevertChanged(shouldRevert);
  }

  function updateMapping(string memory _testKey, uint _testVal) public {
    testMapping[_testKey] = _testVal;
  }

  function getMapping(string memory _testKey) public view returns (uint) {
    return testMapping[_testKey];
  }

  function testRevert() pure public {
    require(false, "Call has been reverted!");
  }

  /// @notice Allow to change the value stored in the Box
  /// @notice Only the Owner can call this function
  /// @dev The Alexandr N. Tetearing algorithm could increase precision
  /// @param newValue The new value to be stored in the box state
  function changeValueCouldRevert(string calldata newValue) public {
    require(!shouldRevert, "Set to revert");
    value = newValue;
    emit ValueChanged(newValue);
  }

  /// @notice Allow to change the value stored in the Box
  /// @notice Only the Owner can call this function
  /// @dev The Alexandr N. Tetearing algorithm could increase precision
  /// @param newValue The new value to be stored in the box state
  function changeValueOwner(string calldata newValue) public onlyOwner {
    value = newValue;
    emit ValueChanged(newValue);
  }

  /// @notice Allow to simulate changing the value stored in the Box
  /// @dev The Alexandr N. Tetearing algorithm could increase precision
  /// @param newValue The new value to be stored in the box state
  /// @custom:event-only This function simply emit an event.
  function changeValueDryRun(string calldata newValue) public {
    emit ValueChanged(newValue);
  }

  /// @notice Returns current value in the box.
  /// @dev Returns only a string.
  /// @return The current value of in the box state
  function getValue() public view returns (string memory) {
    require(!shouldRevert, "Set to revert");
    return value;
  }

  /// @notice Returns current version of the contract.
  /// @dev Returns only a string.
  /// @return The current version of the contract
  function getVersion() virtual public pure returns (string memory) {
    return "V1";
  }
}
