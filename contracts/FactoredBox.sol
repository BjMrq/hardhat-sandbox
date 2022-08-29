// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract BoxFactory {
   FactoredBox[] public boxes;

   function createNewBox(string memory _value) public {
     FactoredBox newBox = new FactoredBox(_value);
     boxes.push(newBox);
   }

   function getAllBoxes() public view returns ( FactoredBox[] memory){
      return boxes;
   }
}


contract FactoredBox is Ownable {
  string private value;
  bool public shouldRevert;
  mapping (string => uint) public testMapping;

  // Emitted when the stored value changes
  event ValueChanged(string newValue);
  event ShouldRevertChanged(bool newValue);

  constructor(string memory initialValue) {
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


  function changeValueCouldRevert(string calldata newValue) public {
    require(!shouldRevert, "Set to revert");
    value = newValue;
    emit ValueChanged(newValue);
  }

  
  function changeValueOwner(string calldata newValue) public onlyOwner {
    value = newValue;
    emit ValueChanged(newValue);
  }


  function changeValueDryRun(string calldata newValue) public {
    emit ValueChanged(newValue);
  }

 
  function getValue() public view returns (string memory) {
    require(!shouldRevert, "Set to revert");
    return value;
  }

  function getVersion() virtual public pure returns (string memory) {
    return "V1";
  }
}
