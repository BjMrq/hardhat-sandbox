// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

/// @title A box containing some hex color
/// @author Mr Tumeric A. Gardner
/// @notice You can use this contract for only the most basic simulation
/// @dev All function calls are currently implemented without..
/// @custom:experimental This is an experimental contract.
contract DaoNat is
  Ownable,
  Governor,
  GovernorSettings,
  GovernorCountingSimple,
  GovernorVotes,
  GovernorVotesQuorumFraction,
  GovernorTimelockControl,
  ReentrancyGuard
{
  uint256[] public proposalsId;

  struct ClearProposal {
    address[] targets;
    uint256[] values;
    bytes[] calldatas;
    string description;
  }

  mapping(uint256 => ClearProposal) private _clearProposals;

  /// @notice Returns public state (automatic accessor, also using this opportunity to add more content to test a rather long NatSpec)
  string public aPublicString = "So public";

  /**
   * @notice Some struct example
   * @member coolName Simple string
   * @member coolLevel Simple uint
   * @custom:member coolName Simple string
   * @custom:member coolLevel Simple uint
   */
  struct CoolStruct {
    string coolName;
    uint256 coolLevel;
  }

  ///@notice An event
  event Nothing(string anyThing);

  constructor(
    uint256 _anyNumber,
    IVotes _testAddressToken,
    TimelockController _testAddressTimeLock
  )
    Governor("GovernanceOrchestrator")
    GovernorSettings(_anyNumber, _anyNumber, 0)
    GovernorVotes(_testAddressToken)
    GovernorVotesQuorumFraction(_anyNumber)
    GovernorTimelockControl(_testAddressTimeLock)
  {}

  function getAllProposalsId() public view returns (uint256[] memory) {
    return proposalsId;
  }

  function getProposal(uint256 proposalId) public view returns (ClearProposal memory) {
    return _clearProposals[proposalId];
  }

  // The following functions are overrides required by Governor.

  function votingDelay() public view override(IGovernor, GovernorSettings) returns (uint256) {
    return super.votingDelay();
  }

  function votingPeriod() public view override(IGovernor, GovernorSettings) returns (uint256) {
    return super.votingPeriod();
  }

  function quorum(uint256 blockNumber)
    public
    view
    override(IGovernor, GovernorVotesQuorumFraction)
    returns (uint256)
  {
    return super.quorum(blockNumber);
  }

  function getVotes(address account, uint256 blockNumber)
    public
    view
    override(IGovernor, Governor)
    returns (uint256)
  {
    return super.getVotes(account, blockNumber);
  }

  function state(uint256 proposalId)
    public
    view
    override(Governor, GovernorTimelockControl)
    returns (ProposalState)
  {
    return super.state(proposalId);
  }

  function propose(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    string memory description
  ) public override(Governor, IGovernor) returns (uint256) {
    uint256 proposalId = super.propose(targets, values, calldatas, description);

    proposalsId.push(proposalId);
    _clearProposals[proposalId] = ClearProposal(targets, values, calldatas, description);

    return proposalId;
  }

  function proposalThreshold() public view override(Governor, GovernorSettings) returns (uint256) {
    return super.proposalThreshold();
  }

  function _execute(
    uint256 proposalId,
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
  ) internal override(Governor, GovernorTimelockControl) {
    super._execute(proposalId, targets, values, calldatas, descriptionHash);
  }

  function _cancel(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
  ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
    return super._cancel(targets, values, calldatas, descriptionHash);
  }

  function _executor() internal view override(Governor, GovernorTimelockControl) returns (address) {
    return super._executor();
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(Governor, GovernorTimelockControl)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
