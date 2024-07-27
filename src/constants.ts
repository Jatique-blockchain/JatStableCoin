export const JATENGINE_CONTRACT_ADDRESS = "0xeeb64e8A9c1C1efBbBeB43b083E3BB003A9eED11" as `0x${string}`;
//testing
// export const JATENGINE_CONTRACT_ADDRESS = "0xe1DA8919f262Ee86f9BE05059C9280142CF23f48" as `0x${string}`;







// jatique @DESKTOP-RT2E06G: ~/blockchain-development/my - blockchain - projects / jat - stable - coin$ make deploy ARGS = "--network sepolia"
// [⠢] Compiling...
// No files changed, compilation skipped
// Traces:
// [5974830] DeployJatEngine:: run()
//     ├─[0] VM:: envUint("PRIVATE_KEY")[staticcall]
//     │   └─ ←[Return] < env var value>
//     ├─[0] VM:: startBroadcast(<pk>)
//     │   └─ ←[Return]
//     ├─[372255] → new MockV3Aggregator@0xc41c353debecFD291401842183b3Bb18c2cD8d10
//     │   └─ ←[Return] 1082 bytes of code
//     ├─[372255] → new MockV3Aggregator@0x5B5Cbe5F7c7Daa9B5C92F4778dBfc179b2c77688
//     │   └─ ←[Return] 1082 bytes of code
//     ├─[516505] → new ERC20Mock@0x024db3Ba5D3C6701dFeb2483bEab19c5650c43f9
//     │   ├─ emit Transfer(from: 0x0000000000000000000000000000000000000000, to: 0x553199572773F818170afF2e523Dc5Ef8B4D9512, value: 1000000000000000000000000000000000000[1e36])
//     │   └─ ←[Return] 2117 bytes of code
//     ├─[0] console:: log("this is the collateral address for wethMock", ERC20Mock: [0x024db3Ba5D3C6701dFeb2483bEab19c5650c43f9])[staticcall]
//     │   └─ ←[Stop]
//     ├─[516505] → new ERC20Mock@0x7520F7BaeC39b21C3a7D02724f8DCD7F19aE5052
//     │   ├─ emit Transfer(from: 0x0000000000000000000000000000000000000000, to: 0x553199572773F818170afF2e523Dc5Ef8B4D9512, value: 1000000000000000000000000000000000000[1e36])
//     │   └─ ←[Return] 2117 bytes of code
//     ├─[0] console:: log("this is the address for wbtc mock", ERC20Mock: [0x7520F7BaeC39b21C3a7D02724f8DCD7F19aE5052])[staticcall]
//     │   └─ ←[Stop]
//     ├─[591661] → new JatStableCoin@0x7a8153b6e7dB830C7De155e98d1cB1C7Ff1259eb
//     │   ├─ emit OwnershipTransferred(previousOwner: 0x0000000000000000000000000000000000000000, newOwner: 0x553199572773F818170afF2e523Dc5Ef8B4D9512)
//     │   └─ ←[Return] 2611 bytes of code
//     ├─[3393454] → new JatEngine@0xeeb64e8A9c1C1efBbBeB43b083E3BB003A9eED11
//     │   ├─ emit OwnershipTransferred(previousOwner: 0x0000000000000000000000000000000000000000, newOwner: 0x553199572773F818170afF2e523Dc5Ef8B4D9512)
//     │   └─ ←[Return] 15821 bytes of code
//     ├─[2424] JatStableCoin:: transferOwnership(JatEngine: [0xeeb64e8A9c1C1efBbBeB43b083E3BB003A9eED11])
//     │   ├─ emit OwnershipTransferred(previousOwner: 0x553199572773F818170afF2e523Dc5Ef8B4D9512, newOwner: JatEngine: [0xeeb64e8A9c1C1efBbBeB43b083E3BB003A9eED11])
//     │   └─ ←[Stop]
//     ├─[0] VM:: stopBroadcast()
//     │   └─ ←[Return]
//     └─ ←[Return] JatStableCoin: [0x7a8153b6e7dB830C7De155e98d1cB1C7Ff1259eb], JatEngine: [0xeeb64e8A9c1C1efBbBeB43b083E3BB003A9eED11], Config({ wethUsdPriceFeed: 0xc41c353debecFD291401842183b3Bb18c2cD8d10, wbtcUsdPriceFeed: 0x5B5Cbe5F7c7Daa9B5C92F4778dBfc179b2c77688, weth: 0x024db3Ba5D3C6701dFeb2483bEab19c5650c43f9, wbtc: 0x7520F7BaeC39b21C3a7D02724f8DCD7F19aE5052, interestRate: 5 })


// Script ran successfully.

// == Return ==
//     0: contract JatStableCoin 0x7a8153b6e7dB830C7De155e98d1cB1C7Ff1259eb
// 1: contract JatEngine 0xeeb64e8A9c1C1efBbBeB43b083E3BB003A9eED11
// 2: struct DeployJatEngine.Config Config({ wethUsdPriceFeed: 0xc41c353debecFD291401842183b3Bb18c2cD8d10, wbtcUsdPriceFeed: 0x5B5Cbe5F7c7Daa9B5C92F4778dBfc179b2c77688, weth: 0x024db3Ba5D3C6701dFeb2483bEab19c5650c43f9, wbtc: 0x7520F7BaeC39b21C3a7D02724f8DCD7F19aE5052, interestRate: 5 })

//     == Logs ==
//     this is the collateral address for wethMock 0x024db3Ba5D3C6701dFeb2483bEab19c5650c43f9
//   this is the address for wbtc mock 0x7520F7BaeC39b21C3a7D02724f8DCD7F19aE5052

// ## Setting up 1 EVM.
// ==========================
// Simulated On-chain Traces:

//   [372255] → new MockV3Aggregator@0xc41c353debecFD291401842183b3Bb18c2cD8d10
//     └─ ← [Return] 1082 bytes of code

//   [372255] → new MockV3Aggregator@0x5B5Cbe5F7c7Daa9B5C92F4778dBfc179b2c77688
//     └─ ← [Return] 1082 bytes of code

//   [516505] → new ERC20Mock@0x024db3Ba5D3C6701dFeb2483bEab19c5650c43f9
//     ├─ emit Transfer(from: 0x0000000000000000000000000000000000000000, to: 0x553199572773F818170afF2e523Dc5Ef8B4D9512, value: 1000000000000000000000000000000000000 [1e36])
//     └─ ← [Return] 2117 bytes of code

//   [516505] → new ERC20Mock@0x7520F7BaeC39b21C3a7D02724f8DCD7F19aE5052
//     ├─ emit Transfer(from: 0x0000000000000000000000000000000000000000, to: 0x553199572773F818170afF2e523Dc5Ef8B4D9512, value: 1000000000000000000000000000000000000 [1e36])
//     └─ ← [Return] 2117 bytes of code

//   [591661] → new JatStableCoin@0x7a8153b6e7dB830C7De155e98d1cB1C7Ff1259eb
//     ├─ emit OwnershipTransferred(previousOwner: 0x0000000000000000000000000000000000000000, newOwner: 0x553199572773F818170afF2e523Dc5Ef8B4D9512)
//     └─ ← [Return] 2611 bytes of code

//   [3393454] → new JatEngine@0xeeb64e8A9c1C1efBbBeB43b083E3BB003A9eED11
//     ├─ emit OwnershipTransferred(previousOwner: 0x0000000000000000000000000000000000000000, newOwner: 0x553199572773F818170afF2e523Dc5Ef8B4D9512)
//     └─ ← [Return] 15821 bytes of code

//   [7224] JatStableCoin::transferOwnership(JatEngine: [0xeeb64e8A9c1C1efBbBeB43b083E3BB003A9eED11])
//     ├─ emit OwnershipTransferred(previousOwner: 0x553199572773F818170afF2e523Dc5Ef8B4D9512, newOwner: JatEngine: [0xeeb64e8A9c1C1efBbBeB43b083E3BB003A9eED11])
//     └─ ← [Stop]


// ==========================

// Chain 11155111

// Estimated gas price: 79.429147508 gwei

// Estimated total gas used for script: 8540920

// Estimated amount required: 0.67839799453402736 ETH

// ==========================

// ##### sepolia
// ✅  [Success]Hash: 0xa7a9605d94405c57ed90a17723f038bca2ddd7fe6477f0b84d7f6b716f943287
// Contract Address: 0x5B5Cbe5F7c7Daa9B5C92F4778dBfc179b2c77688
// Block: 6379735
// Paid: 0.017220175580147928 ETH (446573 gas * 38.560718136 gwei)


// ##### sepolia
// ✅  [Success]Hash: 0x3fca9034d58161b1f140edf914a76a68f39fe4d087745640bb32c3b32269090c
// Contract Address: 0xc41c353debecFD291401842183b3Bb18c2cD8d10
// Block: 6379735
// Paid: 0.017219712851530296 ETH (446561 gas * 38.560718136 gwei)


// ##### sepolia
// ✅  [Success]Hash: 0x4eb91e17f53e5854de16b04ec05dfda1f466802a5f37b17eed449bf4849c05eb
// Contract Address: 0xeeb64e8A9c1C1efBbBeB43b083E3BB003A9eED11
// Block: 6379737
// Paid: 0.134580243750496362 ETH (3707802 gas * 36.296502281 gwei)


// ##### sepolia
// ✅  [Success]Hash: 0x4c1fd151511a9a47c91a448bcd662e7e8b3f0d1305202db50bf2666a95268f44
// Block: 6379737
// Paid: 0.001039677011336964 ETH (28644 gas * 36.296502281 gwei)


// ##### sepolia
// ✅  [Success]Hash: 0x584c067f74f5d05ea80a72ebdb00f1e970e021e650258e01aa042fb45f904454
// Contract Address: 0x7a8153b6e7dB830C7De155e98d1cB1C7Ff1259eb
// Block: 6379737
// Paid: 0.025246431423074641 ETH (695561 gas * 36.296502281 gwei)


// ##### sepolia
// ✅  [Success]Hash: 0x9d3850e2fda99c27c51da88cb56a424bc5ab8198bd01ca422a0e760d3fd771aa
// Contract Address: 0x7520F7BaeC39b21C3a7D02724f8DCD7F19aE5052
// Block: 6379737
// Paid: 0.022592939327319855 ETH (622455 gas * 36.296502281 gwei)


// ##### sepolia
// ✅  [Success]Hash: 0x85d403023aae722fa453bd6c9afeafd96fee4c49348ad3ecd28edb8bf51c1d35
// Contract Address: 0x024db3Ba5D3C6701dFeb2483bEab19c5650c43f9
// Block: 6379737
// Paid: 0.022592939327319855 ETH (622455 gas * 36.296502281 gwei)

// ✅ Sequence #1 on sepolia | Total Paid: 0.240492119271225901 ETH (6570051 gas * avg 36.943421096 gwei)


// ==========================

// ONCHAIN EXECUTION COMPLETE & SUCCESSFUL.
// ##
// Start verification for (6) contracts
// Start verifying contract `0xc41c353debecFD291401842183b3Bb18c2cD8d10` deployed on sepolia

// Submitting verification for [test/mocks/MockV3Aggregator.sol:MockV3Aggregator] 0xc41c353debecFD291401842183b3Bb18c2cD8d10.
// Submitted contract for verification:
//         Response: `OK`
//         GUID: `4ty9ugfwzv3t9u485p6eqphj5gfu7k1vn7qhgqdx7rz4wut3wu`
//         URL: https://sepolia.etherscan.io/address/0xc41c353debecfd291401842183b3bb18c2cd8d10
// Contract verification status:
// Response: `OK`
// Details: `Pass - Verified`
// Contract successfully verified
// Start verifying contract `0x5B5Cbe5F7c7Daa9B5C92F4778dBfc179b2c77688` deployed on sepolia

// Submitting verification for [test/mocks/MockV3Aggregator.sol:MockV3Aggregator] 0x5B5Cbe5F7c7Daa9B5C92F4778dBfc179b2c77688.
// Submitted contract for verification:
//         Response: `OK`
//         GUID: `bs7yefle5erkqdu7624nrfbzyypdqcdcydj8ppuavdkz7m2m9p`
//         URL: https://sepolia.etherscan.io/address/0x5b5cbe5f7c7daa9b5c92f4778dbfc179b2c77688
// Contract verification status:
// Response: `NOTOK`
// Details: `Pending in queue`
// Contract verification status:
// Response: `NOTOK`
// Details: `Already Verified`
// Contract source code already verified
// Start verifying contract `0x024db3Ba5D3C6701dFeb2483bEab19c5650c43f9` deployed on sepolia

// Submitting verification for [test/mocks/ERC20Mock.sol:ERC20Mock] 0x024db3Ba5D3C6701dFeb2483bEab19c5650c43f9.
// Submitted contract for verification:
//         Response: `OK`
//         GUID: `nrzzdwhysgr8pu1emcumhhzttdjbtkw3wtencr1nrhnnjnpszt`
//         URL: https://sepolia.etherscan.io/address/0x024db3ba5d3c6701dfeb2483beab19c5650c43f9
// Contract verification status:
// Response: `NOTOK`
// Details: `Pending in queue`
// Contract verification status:
// Response: `OK`
// Details: `Pass - Verified`
// Contract successfully verified
// Start verifying contract `0x7520F7BaeC39b21C3a7D02724f8DCD7F19aE5052` deployed on sepolia

// Submitting verification for [test/mocks/ERC20Mock.sol:ERC20Mock] 0x7520F7BaeC39b21C3a7D02724f8DCD7F19aE5052.
// Submitted contract for verification:
//         Response: `OK`
//         GUID: `sqjn65r67qcx5hjnenec2vcfm1ulaeqtcaj7j8maw7jcbucg4m`
//         URL: https://sepolia.etherscan.io/address/0x7520f7baec39b21c3a7d02724f8dcd7f19ae5052
// Contract verification status:
// Response: `NOTOK`
// Details: `Already Verified`
// Contract source code already verified
// Start verifying contract `0x7a8153b6e7dB830C7De155e98d1cB1C7Ff1259eb` deployed on sepolia

// Submitting verification for [src/JatStableCoin.sol:JatStableCoin] 0x7a8153b6e7dB830C7De155e98d1cB1C7Ff1259eb.
// Submitted contract for verification:
//         Response: `OK`
//         GUID: `9temrvde16a6wtzajvncev15gvcbwtnehnwxpqipu67fzqasc2`
//         URL: https://sepolia.etherscan.io/address/0x7a8153b6e7db830c7de155e98d1cb1c7ff1259eb
// Contract verification status:
// Response: `NOTOK`
// Details: `Pending in queue`
// Contract verification status:
// Response: `OK`
// Details: `Pass - Verified`
// Contract successfully verified
// Start verifying contract `0xeeb64e8A9c1C1efBbBeB43b083E3BB003A9eED11` deployed on sepolia

// Submitting verification for [src/JatEngine.sol:JatEngine] 0xeeb64e8A9c1C1efBbBeB43b083E3BB003A9eED11.
// Submitted contract for verification:
//         Response: `OK`
//         GUID: `t2uagfukkafgu6c95ggb1946v631dhbqm3yiqpndcauucqlmam`
//         URL: https://sepolia.etherscan.io/address/0xeeb64e8a9c1c1efbbbeb43b083e3bb003a9eed11
// Contract verification status:
// Response: `NOTOK`
// Details: `Pending in queue`
// Contract verification status:
// Response: `OK`
// Details: `Pass - Verified`
// Contract successfully verified
// All (6) contracts were verified!

// Transactions saved to: /home/jatique/blockchain-development/my-blockchain-projects/jat-stable-coin/broadcast/DeployJatEngine.s.sol/11155111/run-latest.json

// Sensitive values saved to: /home/jatique/blockchain-development/my-blockchain-projects/jat-stable-coin/cache/DeployJatEngine.s.sol/11155111/run-latest.json

// jatique@DESKTOP-RT2E06G:~/blockchain-development/my-blockchain-projects/jat-stable-coin$