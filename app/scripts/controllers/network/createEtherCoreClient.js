const mergeMiddleware = require('json-rpc-engine/src/mergeMiddleware')
const createScaffoldMiddleware = require('json-rpc-engine/src/createScaffoldMiddleware')
const createBlockReRefMiddleware = require('eth-json-rpc-middleware/block-ref')
const createRetryOnEmptyMiddleware = require('eth-json-rpc-middleware/retryOnEmpty')
const createBlockCacheMiddleware = require('eth-json-rpc-middleware/block-cache')
const createInflightMiddleware = require('eth-json-rpc-middleware/inflight-cache')
const createBlockTrackerInspectorMiddleware = require('eth-json-rpc-middleware/block-tracker-inspector')
const providerFromMiddleware = require('eth-json-rpc-middleware/providerFromMiddleware')
const createEtherCoreMiddleware = require('ethercore-json-rpc')
const BlockTracker = require('eth-block-tracker')

module.exports = createEtherCoreClient

function createEtherCoreClient ({ network, onRequest }) {
  const EtherCoreMiddleware = mergeMiddleware([
    createRequestHookMiddleware(onRequest),
    createEtherCoreMiddleware({ network, maxAttempts: 5, source: 'metamask' }),
  ])
  const EtherCoreProvider = providerFromMiddleware(EtherCoreMiddleware)
  const blockTracker = new BlockTracker({ provider: EtherCoreProvider })

  const networkMiddleware = mergeMiddleware([
    createNetworkAndChainIdMiddleware({ network }),
    createBlockCacheMiddleware({ blockTracker }),
    createInflightMiddleware(),
    createBlockReRefMiddleware({ blockTracker, provider: EtherCoreProvider }),
    createRetryOnEmptyMiddleware({ blockTracker, provider: EtherCoreProvider }),
    createBlockTrackerInspectorMiddleware({ blockTracker }),
    EtherCoreMiddleware,
  ])
  return { networkMiddleware, blockTracker }
}

function createNetworkAndChainIdMiddleware ({ network }) {
  let chainId
  let netId

  switch (network) {
    case 'mainnet':
      netId = '466'
      chainId = '0x1d2'
      break
    default:
      throw new Error(`createEtherCoreClient - unknown network "${network}"`)
  }

  return createScaffoldMiddleware({
    eth_chainId: chainId,
    net_version: netId,
  })
}

function createRequestHookMiddleware (onRequest) {
  return (req, _, next) => {
    onRequest(req)
    next()
  }
}
