const Ae = require('@aeternity/aepp-sdk').Universal
const Crypto = require('@aeternity/aepp-sdk').Crypto

const config = {
  host: 'http://localhost:3001/',
  internalHost: 'http://localhost:3001/internal/',
  gas: 200000,
  ttl: 55
}

describe('Contracts', () => {
  let owner

  before(async () => {
    const ownerKeyPair = wallets[0]
    owner = await Ae({
      url: config.host,
      internalUrl: config.internalHost,
      keypair: ownerKeyPair,
      nativeMode: true,
      networkId: 'ae_devnet'
    })
  })
  describe('Buyer Contract', () => {
    it('Deploying Contracts', async () => {
      let sellerContractSource = utils.readFileRelative(
        './contracts/SellerContract.aes',
        'utf-8'
      ) // Read the aes file
      let buyerContractSource = utils.readFileRelative(
        './contracts/BuyerContract.aes',
        'utf-8'
      )
      let transportContractSource = utils.readFileRelative(
        './contracts/TransportContract.aes',
        'utf-8'
      )

      // Buyer contract
      const compiledBuyerContract = await owner.contractCompile(
        buyerContractSource,
        {
          // Compile it
          gas: config.gas
        }
      )

      const deployPromiseBuyer = compiledBuyerContract.deploy({
        // Deploy it
        options: {
          ttl: config.ttl
        }
      })

      let BuyerContract = await deployPromiseBuyer
      let addressBuyer =
        '0x' +
        Crypto.decodeBase58Check(BuyerContract.address.split('_')[1]).toString(
          'hex'
        )
      console.log(addressBuyer)
      // Seller contract
      const compiledSellerContract = await owner.contractCompile(
        sellerContractSource,
        {
          // Compile it
          gas: config.gas
        }
      )

      const deployPromiseSeller = compiledSellerContract.deploy({
        // Deploy it
        initState: `(${addressBuyer}, 2000)`,
        options: {
          ttl: config.ttl
        }
      })

      let SellerContract = await deployPromiseSeller
      let addressSeller =
        '0x' +
        Crypto.decodeBase58Check(SellerContract.address.split('_')[1]).toString(
          'hex'
        )

      // Transport contract
      const compiledTransportContract = await owner.contractCompile(
        transportContractSource,
        {
          // Compile it
          gas: config.gas
        }
      )

      const deployPromiseTransport = compiledTransportContract.deploy({
        // Deploy it
        initState: `(1548074338, "Varna")`,
        options: {
          ttl: config.ttl
        }
      })

      let TransportContract = await deployPromiseTransport
      let addressTransport =
        '0x' +
        Crypto.decodeBase58Check(
          TransportContract.address.split('_')[1]
        ).toString('hex')

      await assert.isFulfilled(
        deployPromiseBuyer,
        'Could not deploy the ExampleContract Smart Contract'
      ) // Check it is deployed

      await assert.isFulfilled(
        deployPromiseSeller,
        'Could not deploy the ExampleContract Smart Contract'
      ) // Check it is deployed

      await assert.isFulfilled(
        deployPromiseTransport,
        'Could not deploy the ExampleContract Smart Contract'
      ) // Check it is deployed

      // function "deposit_to_seller_contract"
      const CallPromiseResult = await BuyerContract.call(
        'deposit_to_seller_contract',
        {
          args: `(2000, ${addressSeller})`,
          options: { ttl: 55, amount: 2000 },
          abi: 'sophia'
        }
      )
      const result = await CallPromiseResult.decode('int')
      assert.equal(result.value, true)

      // function "seller_contract_balance"
      const CallPromiseResultSeller = await SellerContract.call(
        'seller_contract_balance',
        {
          options: { ttl: 55 },
          abi: 'sophia'
        }
      )
      const result1 = await CallPromiseResultSeller.decode('int')
      assert.equal(result1.value, 2002)

      // function "send_item"
      const CallPromiseResultSeller1 = await SellerContract.call('send_item', {
        options: { ttl: 55 },
        abi: 'sophia'
      })
      const result2 = await CallPromiseResultSeller1.decode('bool')
      assert.equal(result2.value, true)

      // function "check_item_status"
      const CallPromiseResultSeller2 = await SellerContract.call(
        'check_item_status',
        {
          options: { ttl: 55 },
          abi: 'sophia'
        }
      )
      const result3 = await CallPromiseResultSeller2.decode('string')
      assert.equal(result3.value, 'sent_to_transport_courier')

      // function "change_location"
      const CallPromiseResultTransport = await TransportContract.call(
        'change_location',
        {
          args: `(1548157482, "Burgas")`,
          options: { ttl: 55 },
          abi: 'sophia'
        }
      )
      const result4 = await CallPromiseResultTransport.decode('bool')
      assert.equal(result4.value, true)

      // function "check_courier_status" from Transport Contract
      const CallPromiseResultTransport1 = await TransportContract.call(
        'check_courier_status',
        {
          options: { ttl: 55 },
          abi: 'sophia'
        }
      )
      const result5 = await CallPromiseResultTransport1.decode('string')
      assert.equal(result5.value, 'on_way')

      // function "check_courier_location" from Transport Contract
      const CallPromiseResultTransport2 = await TransportContract.call(
        'check_courier_location',
        {
          options: { ttl: 55 },
          abi: 'sophia'
        }
      )
      const result6 = await CallPromiseResultTransport2.decode('string')
      assert.equal(result6.value, 'Burgas')

      // function "check_courier_timestamp" from Transport Contract
      const CallPromiseResultTransport3 = await TransportContract.call(
        'check_courier_timestamp',
        {
          options: { ttl: 55 },
          abi: 'sophia'
        }
      )
      const result7 = await CallPromiseResultTransport3.decode('int')
      assert.equal(result7.value, 1548157482)

      // function "delivered_item"
      const CallPromiseResultTransport4 = await TransportContract.call(
        'delivered_item',
        {
          args: `(1548157980, "Sofia")`,
          options: { ttl: 55 },
          abi: 'sophia'
        }
      )
      const result8 = await CallPromiseResultTransport4.decode('bool')
      assert.equal(result8.value, true)

      // function "check_courier_location" from Buyer Contract
      const CallPromiseResultBuyer5 = await BuyerContract.call(
        'check_courier_location',
        {
          args: `${addressTransport}`,
          options: { ttl: 55 },
          abi: 'sophia'
        }
      )
      const result9 = await CallPromiseResultBuyer5.decode('string')
      assert.equal(result9.value, 'Sofia')

      // function "check_courier_status" from Buyer Contract
      const CallPromiseResultBuyer6 = await BuyerContract.call(
        'check_courier_status',
        {
          args: `${addressTransport}`,
          options: { ttl: 55 },
          abi: 'sophia'
        }
      )
      const result10 = await CallPromiseResultBuyer6.decode('string')
      assert.equal(result10.value, 'delivered')

      // function "check_courier_timestamp" from Buyer Contract
      const CallPromiseResultBuyer7 = await BuyerContract.call(
        'check_courier_timestamp',
        {
          args: `${addressTransport}`,
          options: { ttl: 55 },
          abi: 'sophia'
        }
      )
      const result11 = await CallPromiseResultBuyer7.decode('int')
      assert.equal(result11.value, 1548157980)

      // function "received_item" from Buyer Contract
      const CallPromiseResultSeller4 = await BuyerContract.call(
        'received_item',
        {
          args: `(${addressSeller})`,
          options: { ttl: 55 },
          abi: 'sophia'
        }
      )
      const result13 = await CallPromiseResultSeller4.decode('bool')
      assert.equal(result13.value, true)

      // function "seller_contract_balance" from Seller Contract
      const ContractBalance = await SellerContract.call(
        'seller_contract_balance',
        {
          options: { ttl: 55 },
          abi: 'sophia'
        }
      )
      const result14 = await ContractBalance.decode('int')
      assert.equal(result14.value, 5)
    })
  })
})
