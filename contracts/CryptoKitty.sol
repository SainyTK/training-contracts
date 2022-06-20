pragma solidity 0.8.4;

import "./interfaces/KittyInterface.sol";

contract CryptoKitty is KittyInterface {
    function getKitty(uint256 _id)
        external
        override
        view
        returns (
            bool isGestating,
            bool isReady,
            uint256 cooldownIndex,
            uint256 nextActionAt,
            uint256 siringWithId,
            uint256 birthTime,
            uint256 matronId,
            uint256 sireId,
            uint256 generation,
            uint256 genes
        )
    {
        return (true, true, 0, 0, 0, 0, 0, 0, 0, 0);
    }
}
