module.exports = function (address, network) {
  const net = parseInt(network)
  let link
  switch (net) {
    case 1: // main net
      link = `https://explorer.ethercore.org/address/${address}`
      break
    default:
      link = `https://explorer.ethercore.org/address/${address}`
      break
  }

  return link
}
