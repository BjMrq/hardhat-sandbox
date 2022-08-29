// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ColorBoxV1.sol";

/// @title A box containing some hex color
/// @author Mr Tumeric A. Gardner
/// @notice You can use this contract for only the most basic simulation
/// @dev All function calls are currently implemented without..
/// @custom:experimental This is an experimental contract.
contract ColorBoxV2 is ColorBoxV1 {
  /// @notice A v2 implementation.
  /// @dev Returns an acknowledgment that it is a v2 implementation.
  /// @return An acknowledgment that it is a v2 implementation.
  function isV2() public pure returns (bool) {
    return true;
  }
  

  /// @notice Returns current version of the contract.
  /// @dev Returns only a string.
  /// @return The current version of the contract
  function getVersion() override public pure returns (string memory) {
    return "V2";
  }
}
