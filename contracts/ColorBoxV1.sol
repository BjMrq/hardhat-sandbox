// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/// @title A box containing some hex color
/// @author Mr Tumeric A. Gardner
/// @notice You can use this contract for only the most basic simulation
/// @dev All function calls are currently implemented without..
/// @custom:experimental This is an experimental contract.
contract ColorBoxV1 is Initializable, OwnableUpgradeable {
  string private color;
  bool public shouldRevert;
  mapping (string => uint) public testMapping;


  // Emitted when the stored value changes
  event ColorChanged(string newValue);

  function initialize(string memory initialColor) public initializer {
    __Context_init();

    color = initialColor;
    shouldRevert = false;
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


  /// @notice Allow to change the color stored in the Box
  /// @notice Only the Owner can call this function
  /// @dev The Alexandr N. Tetearing algorithm could increase precision
  /// @param newColor The new color to be stored in the box state
  function changeColorCouldRevert(string calldata newColor) public {
    require(!shouldRevert, "Set to revert");
    color = newColor;
    emit ColorChanged(newColor);
  }

  /// @notice Allow to change the color stored in the Box
  /// @notice Only the Owner can call this function
  /// @dev The Alexandr N. Tetearing algorithm could increase precision
  /// @param newColor The new color to be stored in the box state
  function changeColorOwner(string calldata newColor) public onlyOwner {
    color = newColor;
    emit ColorChanged(newColor);
  }

  /// @notice Allow to simulate changing the color stored in the Box
  /// @dev The Alexandr N. Tetearing algorithm could increase precision
  /// @param newColor The new color to be stored in the box state
  /// @custom:event-only This function simply emit an event.
  function changeColorDryRun(string calldata newColor) public {
    emit ColorChanged(newColor);
  }

  /// @notice Returns current color in the box.
  /// @dev Returns only a string.
  /// @return The current color of in the box state
  function getColor() public view returns (string memory) {
    require(!shouldRevert, "Set to revert");
    return color;
  }

  /// @notice Returns current version of the contract.
  /// @dev Returns only a string.
  /// @return The current version of the contract
  function getVersion() virtual public pure returns (string memory) {
    return "V1";
  }
}
