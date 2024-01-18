module.exports = async ({
  getNamedAccounts,
  hardhatArguments,
  deployments,
  ethers,
  config,
}) => {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  // Deploy DummyOracle with 1 DFI == 1 USD
  // const dummyOracle = await deploy('DummyOracle', {
  //   from: deployer,
  //   args: [ethers.BigNumber.from('100000000')],
  //   log: true,
  // })
  // oracleAddress = dummyOracle.address
  // console.log('Using DummyOracle with address: ', oracleAddress)

  const DFIDUSDOracle = await deploy('DFIUSDTOracle', {
    from: deployer,
    args: [deployer, '0xA6A853DDbfB6C85d3584E33313628555BA85753B'], //testnet State Relayer
    log: true,
  })

  oracleAddress = DFIDUSDOracle.address
  console.log('Using DFIUSDTOracle with address: ', oracleAddress)

  // 1 character names = 5000 DFI
  // 2 character names = 2500 DFI
  // 3 character names = 1000 DFI
  // 4 character names = 500 DFI
  // 5 character names or more = 100 DFI
  const prices = [
    ethers.BigNumber.from('5000000000000000000000'),
    ethers.BigNumber.from('2500000000000000000000'),
    ethers.BigNumber.from('1000000000000000000000'),
    ethers.BigNumber.from('500000000000000000000'),
    ethers.BigNumber.from('100000000000000000000'),
  ]

  await deploy('StablePriceOracle', {
    from: deployer,
    args: [oracleAddress, prices],
    log: true,
  })
}

module.exports.tags = ['StablePriceOracle']
