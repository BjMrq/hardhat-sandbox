// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";

contract DummyGovernor is Governor, GovernorSettings, GovernorCountingSimple {
  uint256[] public proposalsId;

  struct ProposalInfo {
    address[] targets;
    uint256[] values;
    bytes[] calldatas;
    string description;
  }

  mapping(uint256 => ProposalInfo) private _proposalsInfo;

  constructor()
    Governor("DummyGovernor")
    GovernorSettings(
      1, /* 1 block */
      5, /* 1 minute */
      0
    )
  {}

  function getAllProposalsId() public view returns (uint256[] memory) {
    return proposalsId;
  }

  function getProposal(uint256 proposalId) public view returns (ProposalInfo memory) {
    return _proposalsInfo[proposalId];
  }

  function quorum(uint256 blockNumber) public pure override returns (uint256) {
    return 0e18;
  }

  function _quorumReached(uint256 proposalId)
    internal
    pure
    override(Governor, GovernorCountingSimple)
    returns (bool)
  {
    return true;
  }

  function _countVote(
    uint256 proposalId,
    address account,
    uint8 support,
    uint256 weight,
    bytes memory // params
  ) internal pure override(Governor, GovernorCountingSimple) {}
  

  function _voteSucceeded(uint256 proposalId)
    internal
    pure
    override(Governor, GovernorCountingSimple)
    returns (bool)
  {
    return true;
  }

  function _getVotes(
    address account,
    uint256 blockNumber,
    bytes memory /*params*/
  ) internal view virtual override returns (uint256) {
    return 1;
  }

  // The following functions are overrides required by Solidity.

  function propose(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    string memory description
  ) public override(Governor) returns (uint256) {
    uint256 proposalId = super.propose(targets, values, calldatas, description);

    proposalsId.push(proposalId);
    _proposalsInfo[proposalId] = ProposalInfo(targets, values, calldatas, description);

    return proposalId;
  }

  function votingDelay() public view override(IGovernor, GovernorSettings) returns (uint256) {
    return super.votingDelay();
  }

  function votingPeriod() public view override(IGovernor, GovernorSettings) returns (uint256) {
    return super.votingPeriod();
  }

  function proposalThreshold() public view override(Governor, GovernorSettings) returns (uint256) {
    return super.proposalThreshold();
  }
}
