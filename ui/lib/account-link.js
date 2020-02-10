module.exports = function (address, network, rpcPrefs) {
  if (rpcPrefs && rpcPrefs.blockExplorerUrl) {
    return `${rpcPrefs.blockExplorerUrl}/address/${address}`
  }

  const net = parseInt(network)
  let link
  switch (net) {
    case 466: // main net
      link = `https://explorer.ethercore.org/address/${address}`
      break
    default:
      link = `https://explorer.ethercore.org/address/${address}`
      break
  }

  return link
}
