export const JATENGINE_CONTRACT_ADDRESS = "0x06Fd0d02EF885c8CeBC11a0E7Da198473B8E30d4" as `0x${string}`;
//testing
// export const JATENGINE_CONTRACT_ADDRESS = "0xe1DA8919f262Ee86f9BE05059C9280142CF23f48" as `0x${string}`;




// jatique@DESKTOP-RT2E06G:~/blockchain-development/my-blockchain-projects/jat-stable-coin$ make deploy ARGS="--network sepolia"
// [⠢] Compiling...
// [⠒] Compiling 2 files with Solc 0.8.26
// [⠑] Solc 0.8.26 finished in 3.28s
// Compiler run successful!
// Traces:
//   [5974830] DeployJatEngine::run()
//     ├─ [0] VM::envUint("PRIVATE_KEY") [staticcall]
//     │   └─ ← [Return] <env var value>
//     ├─ [0] VM::startBroadcast(<pk>)
//     │   └─ ← [Return] 
//     ├─ [372255] → new MockV3Aggregator@0x8c6Cb7a3f1e4b2c147e99f5Cc45b1b373eBFF2de
//     │   └─ ← [Return] 1082 bytes of code
//     ├─ [372255] → new MockV3Aggregator@0x1263706c7BAf569a6bEa0a377b6f3EFa0730f827
//     │   └─ ← [Return] 1082 bytes of code
//     ├─ [516505] → new ERC20Mock@0x951B20DBbfA3e0546c484711b398cC5823d5fd38
//     │   ├─ emit Transfer(from: 0x0000000000000000000000000000000000000000, to: 0x553199572773F818170afF2e523Dc5Ef8B4D9512, value: 1000000000000000000000000000000000000 [1e36])
//     │   └─ ← [Return] 2117 bytes of code
//     ├─ [0] console::log("this is the collateral address for wethMock", ERC20Mock: [0x951B20DBbfA3e0546c484711b398cC5823d5fd38]) [staticcall]
//     │   └─ ← [Stop] 
//     ├─ [516505] → new ERC20Mock@0xa1edd3d9F4826822749719387a1729120A80FB76
//     │   ├─ emit Transfer(from: 0x0000000000000000000000000000000000000000, to: 0x553199572773F818170afF2e523Dc5Ef8B4D9512, value: 1000000000000000000000000000000000000 [1e36])
//     │   └─ ← [Return] 2117 bytes of code
//     ├─ [0] console::log("this is the address for wbtc mock", ERC20Mock: [0xa1edd3d9F4826822749719387a1729120A80FB76]) [staticcall]
//     │   └─ ← [Stop] 
//     ├─ [591661] → new JatStableCoin@0xfe0EDf0368FdC97978dE9121b8c1cC3043B97204
//     │   ├─ emit OwnershipTransferred(previousOwner: 0x0000000000000000000000000000000000000000, newOwner: 0x553199572773F818170afF2e523Dc5Ef8B4D9512)
//     │   └─ ← [Return] 2611 bytes of code
//     ├─ [3393454] → new JatEngine@0x06Fd0d02EF885c8CeBC11a0E7Da198473B8E30d4
//     │   ├─ emit OwnershipTransferred(previousOwner: 0x0000000000000000000000000000000000000000, newOwner: 0x553199572773F818170afF2e523Dc5Ef8B4D9512)
//     │   └─ ← [Return] 15821 bytes of code
//     ├─ [2424] JatStableCoin::transferOwnership(JatEngine: [0x06Fd0d02EF885c8CeBC11a0E7Da198473B8E30d4])
//     │   ├─ emit OwnershipTransferred(previousOwner: 0x553199572773F818170afF2e523Dc5Ef8B4D9512, newOwner: JatEngine: [0x06Fd0d02EF885c8CeBC11a0E7Da198473B8E30d4])
//     │   └─ ← [Stop] 
//     ├─ [0] VM::stopBroadcast()
//     │   └─ ← [Return] 
//     └─ ← [Return] JatStableCoin: [0xfe0EDf0368FdC97978dE9121b8c1cC3043B97204], JatEngine: [0x06Fd0d02EF885c8CeBC11a0E7Da198473B8E30d4], Config({ wethUsdPriceFeed: 0x8c6Cb7a3f1e4b2c147e99f5Cc45b1b373eBFF2de, wbtcUsdPriceFeed: 0x1263706c7BAf569a6bEa0a377b6f3EFa0730f827, weth: 0x951B20DBbfA3e0546c484711b398cC5823d5fd38, wbtc: 0xa1edd3d9F4826822749719387a1729120A80FB76, interestRate: 5 })


// Script ran successfully.

// == Return ==
// 0: contract JatStableCoin 0xfe0EDf0368FdC97978dE9121b8c1cC3043B97204
// 1: contract JatEngine 0x06Fd0d02EF885c8CeBC11a0E7Da198473B8E30d4
// 2: struct DeployJatEngine.Config Config({ wethUsdPriceFeed: 0x8c6Cb7a3f1e4b2c147e99f5Cc45b1b373eBFF2de, wbtcUsdPriceFeed: 0x1263706c7BAf569a6bEa0a377b6f3EFa0730f827, weth: 0x951B20DBbfA3e0546c484711b398cC5823d5fd38, wbtc: 0xa1edd3d9F4826822749719387a1729120A80FB76, interestRate: 5 })

// == Logs ==
//   this is the collateral address for wethMock 0x951B20DBbfA3e0546c484711b398cC5823d5fd38
//   this is the address for wbtc mock 0xa1edd3d9F4826822749719387a1729120A80FB76

// ## Setting up 1 EVM.
// ==========================
// Simulated On-chain Traces:

//   [372255] → new MockV3Aggregator@0x8c6Cb7a3f1e4b2c147e99f5Cc45b1b373eBFF2de
//     └─ ← [Return] 1082 bytes of code

//   [372255] → new MockV3Aggregator@0x1263706c7BAf569a6bEa0a377b6f3EFa0730f827
//     └─ ← [Return] 1082 bytes of code

//   [516505] → new ERC20Mock@0x951B20DBbfA3e0546c484711b398cC5823d5fd38
//     ├─ emit Transfer(from: 0x0000000000000000000000000000000000000000, to: 0x553199572773F818170afF2e523Dc5Ef8B4D9512, value: 1000000000000000000000000000000000000 [1e36])
//     └─ ← [Return] 2117 bytes of code

//   [516505] → new ERC20Mock@0xa1edd3d9F4826822749719387a1729120A80FB76
//     ├─ emit Transfer(from: 0x0000000000000000000000000000000000000000, to: 0x553199572773F818170afF2e523Dc5Ef8B4D9512, value: 1000000000000000000000000000000000000 [1e36])
//     └─ ← [Return] 2117 bytes of code

//   [591661] → new JatStableCoin@0xfe0EDf0368FdC97978dE9121b8c1cC3043B97204
//     ├─ emit OwnershipTransferred(previousOwner: 0x0000000000000000000000000000000000000000, newOwner: 0x553199572773F818170afF2e523Dc5Ef8B4D9512)
//     └─ ← [Return] 2611 bytes of code

//   [3393454] → new JatEngine@0x06Fd0d02EF885c8CeBC11a0E7Da198473B8E30d4
//     ├─ emit OwnershipTransferred(previousOwner: 0x0000000000000000000000000000000000000000, newOwner: 0x553199572773F818170afF2e523Dc5Ef8B4D9512)
//     └─ ← [Return] 15821 bytes of code

//   [7224] JatStableCoin::transferOwnership(JatEngine: [0x06Fd0d02EF885c8CeBC11a0E7Da198473B8E30d4])
//     ├─ emit OwnershipTransferred(previousOwner: 0x553199572773F818170afF2e523Dc5Ef8B4D9512, newOwner: JatEngine: [0x06Fd0d02EF885c8CeBC11a0E7Da198473B8E30d4])
//     └─ ← [Stop] 


// ==========================

// Chain 11155111

// Estimated gas price: 13.378282114 gwei

// Estimated total gas used for script: 8540937

// Estimated amount required: 0.114263064703900818 ETH

// ==========================

// ##### sepolia
// ✅  [Success]Hash: 0x5f502d0115bb28dd95c63375609a5d36b96db903ee315a481d2137969882751f
// Contract Address: 0x8c6Cb7a3f1e4b2c147e99f5Cc45b1b373eBFF2de
// Block: 6383598
// Paid: 0.002820429492933159 ETH (446561 gas * 6.315888519 gwei)


// ##### sepolia
// ✅  [Success]Hash: 0x1a777923c9936074400940b396914c53936552581fc7b05cc2e00ee09b89ada5
// Contract Address: 0x951B20DBbfA3e0546c484711b398cC5823d5fd38
// Block: 6383598
// Paid: 0.003931356388094145 ETH (622455 gas * 6.315888519 gwei)


// ##### sepolia
// ✅  [Success]Hash: 0x9884c4a0cf9fa3afab8dd84071e84ff73d91131e638709948fee52f5287b24ed
// Contract Address: 0x06Fd0d02EF885c8CeBC11a0E7Da198473B8E30d4
// Block: 6383598
// Paid: 0.023418064082525238 ETH (3707802 gas * 6.315888519 gwei)


// ##### sepolia
// ✅  [Success]Hash: 0xee03688db851da87342b1bf6558e3929e5ff7c1ee90c9a9d4a00832b511b0e30
// Contract Address: 0xa1edd3d9F4826822749719387a1729120A80FB76
// Block: 6383598
// Paid: 0.003931356388094145 ETH (622455 gas * 6.315888519 gwei)


// ##### sepolia
// ✅  [Success]Hash: 0xa60b96f25e7a61dd6b53c76ecd537b4d3e904a2a8d15103010cb8d3bbce4416c
// Contract Address: 0xfe0EDf0368FdC97978dE9121b8c1cC3043B97204
// Block: 6383598
// Paid: 0.004393085734164159 ETH (695561 gas * 6.315888519 gwei)


// ##### sepolia
// ✅  [Success]Hash: 0x1dea68c2ed4afe974393b566cf620916c81b52a3277d6319a591dc94b88003da
// Contract Address: 0x1263706c7BAf569a6bEa0a377b6f3EFa0730f827
// Block: 6383598
// Paid: 0.002820505283595387 ETH (446573 gas * 6.315888519 gwei)


// ##### sepolia
// ✅  [Success]Hash: 0x29f8f8759cfafe1039b84c0f654c2a6dca35a19c41aa6dbaade1e5a3ff8a6d50
// Block: 6383598
// Paid: 0.000180988101400464 ETH (28656 gas * 6.315888519 gwei)

// ✅ Sequence #1 on sepolia | Total Paid: 0.041495785470806697 ETH (6570063 gas * avg 6.315888519 gwei)
                                                                                                                                                                                 

// ==========================

// ONCHAIN EXECUTION COMPLETE & SUCCESSFUL.
// ##
// Start verification for (6) contracts
// Start verifying contract `0x8c6Cb7a3f1e4b2c147e99f5Cc45b1b373eBFF2de` deployed on sepolia

// Submitting verification for [test/mocks/MockV3Aggregator.sol:MockV3Aggregator] 0x8c6Cb7a3f1e4b2c147e99f5Cc45b1b373eBFF2de.

// Submitting verification for [test/mocks/MockV3Aggregator.sol:MockV3Aggregator] 0x8c6Cb7a3f1e4b2c147e99f5Cc45b1b373eBFF2de.

// Submitting verification for [test/mocks/MockV3Aggregator.sol:MockV3Aggregator] 0x8c6Cb7a3f1e4b2c147e99f5Cc45b1b373eBFF2de.
// Submitted contract for verification:
//         Response: `OK`
//         GUID: `kfkv2ggjrnihursksasaktxhjkpdgyxxp35jgftyhs2wbmzzsx`
//         URL: https://sepolia.etherscan.io/address/0x8c6cb7a3f1e4b2c147e99f5cc45b1b373ebff2de
// Contract verification status:
// Response: `NOTOK`
// Details: `Pending in queue`
// Contract verification status:
// Response: `NOTOK`
// Details: `Already Verified`
// Contract source code already verified
// Start verifying contract `0x1263706c7BAf569a6bEa0a377b6f3EFa0730f827` deployed on sepolia

// Submitting verification for [test/mocks/MockV3Aggregator.sol:MockV3Aggregator] 0x1263706c7BAf569a6bEa0a377b6f3EFa0730f827.
// Submitted contract for verification:
//         Response: `OK`
//         GUID: `hvsm8ij3cghudiqkurm9emgkttr2hxlqlarcx3um1e3cfnejfq`
//         URL: https://sepolia.etherscan.io/address/0x1263706c7baf569a6bea0a377b6f3efa0730f827
// Contract verification status:
// Response: `NOTOK`
// Details: `Pending in queue`
// Contract verification status:
// Response: `NOTOK`
// Details: `Already Verified`
// Contract source code already verified
// Start verifying contract `0x951B20DBbfA3e0546c484711b398cC5823d5fd38` deployed on sepolia

// Submitting verification for [test/mocks/ERC20Mock.sol:ERC20Mock] 0x951B20DBbfA3e0546c484711b398cC5823d5fd38.
// Submitted contract for verification:
//         Response: `OK`
//         GUID: `t8dhtue6tfshm6vthusdesxz9zj556ehnrdddwhwpraeviix7n`
//         URL: https://sepolia.etherscan.io/address/0x951b20dbbfa3e0546c484711b398cc5823d5fd38
// Contract verification status:
// Response: `NOTOK`
// Details: `Pending in queue`
// Contract verification status:
// Response: `NOTOK`
// Details: `Already Verified`
// Contract source code already verified
// Start verifying contract `0xa1edd3d9F4826822749719387a1729120A80FB76` deployed on sepolia

// Submitting verification for [test/mocks/ERC20Mock.sol:ERC20Mock] 0xa1edd3d9F4826822749719387a1729120A80FB76.
// Submitted contract for verification:
//         Response: `OK`
//         GUID: `6khsc2ae9tba2mbakwtspdcvqphidrhmxhzurvfctykpldqd4l`
//         URL: https://sepolia.etherscan.io/address/0xa1edd3d9f4826822749719387a1729120a80fb76
// Contract verification status:
// Response: `NOTOK`
// Details: `Pending in queue`
// Contract verification status:
// Response: `NOTOK`
// Details: `Already Verified`
// Contract source code already verified
// Start verifying contract `0xfe0EDf0368FdC97978dE9121b8c1cC3043B97204` deployed on sepolia

// Submitting verification for [src/JatStableCoin.sol:JatStableCoin] 0xfe0EDf0368FdC97978dE9121b8c1cC3043B97204.
// Submitted contract for verification:
//         Response: `OK`
//         GUID: `xnweytymbnjs2hbqcjnhkqfrqqsnjdq4fsuuhji7mdktsbx4dn`
//         URL: https://sepolia.etherscan.io/address/0xfe0edf0368fdc97978de9121b8c1cc3043b97204
// Contract verification status:
// Response: `NOTOK`
// Details: `Pending in queue`
// Contract verification status:
// Response: `NOTOK`
// Details: `Already Verified`
// Contract source code already verified
// Start verifying contract `0x06Fd0d02EF885c8CeBC11a0E7Da198473B8E30d4` deployed on sepolia

// Submitting verification for [src/JatEngine.sol:JatEngine] 0x06Fd0d02EF885c8CeBC11a0E7Da198473B8E30d4.
// Submitted contract for verification:
//         Response: `OK`
//         GUID: `2frn1yzep91j4ypgd9ph7urfk75nzpspbnbkdsrmkdua6cam4b`
//         URL: https://sepolia.etherscan.io/address/0x06fd0d02ef885c8cebc11a0e7da198473b8e30d4
// Contract verification status:
// Response: `OK`
// Details: `Pass - Verified`
// Contract successfully verified
// All (6) contracts were verified!

// Transactions saved to: /home/jatique/blockchain-development/my-blockchain-projects/jat-stable-coin/broadcast/DeployJatEngine.s.sol/11155111/run-latest.json

// Sensitive values saved to: /home/jatique/blockchain-development/my-blockchain-projects/jat-stable-coin/cache/DeployJatEngine.s.sol/11155111/run-latest.json

// jatique@DESKTOP-RT2E06G:~/blockchain-development/my-blockchain-projects/jat-stable-coin$ 