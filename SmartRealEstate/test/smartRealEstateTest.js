const Ae = require('@aeternity/aepp-sdk').Universal
const Crypto = require('@aeternity/aepp-sdk').Crypto

const config = {
  host: 'http://localhost:3001/',
  internalHost: 'http://localhost:3001/internal/',
  gas: 200000,
  ttl: 55
}

// We have to have function to deploy our contract
async function deployContract (contractName) {
  // const [owner, gas, deployObj] = [params[0],params[1],params[2]]
  const contractSource = utils.readFileRelative(
    `./contracts/${contractName}.aes`,
    'utf-8'
  )
  const compileContract = await owner.contractCompile(contractSource, gas)
  const deployPromiseContract = await compileContract.deploy(deployObj)
  return deployPromiseContract
}

// TODO!!! Have to be not contract address!!! Key address
function decodeAddress (key) {
  const decoded58addres = Crypto.decodeBase58Check(key.split('_')[1]).toString(
    'hex'
  )
  return `0x${decoded58addres}`
}

async function callContract (contract, functionName, args, decodeType = 'int') {
  const result = await contract.call(functionName, args)
  const decodedResult = await result.decode(decodeType)
  return decodedResult.value
}

describe('SmartRealEstate Contract', () => {
  let owner
  let SmartRealEstateContract

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

  describe('Deploy contract', () => {
    it('should deploy SmartRealEstate contract', async () => {
      const gas = { gas: config.gas }
      const deployObj = {
        initState: `(1000, "Bohemian apartment", "Varna, 36 Str. Ikonomov")`,
        options: { ttl: config.ttl }
      }
      SmartRealEstateContract = await deployContract(
        'SmartRealEstate',
        owner,
        gas,
        deployObj
      )
      // ............... Still have to be something
    })
  })

  describe('Interact with the contract', () => {
    let ownerAddress

    before(() => {
      ownerAddress = decodeAddress(owner.keypair[1])
    })

    it('should delete owner', async () => {
      const args = {
        options: { ttl: 55 },
        abi: 'sophia'
      }
      const result = await callContract(SellerContract, 'delete_owner', args)
      assert.equal(result, true)
    })

    // TODO: not sure
    it("should try to delete owner that does't exist", async () => {
      const args = {
        options: { ttl: 55 },
        abi: 'sophia'
      }
      const result = await callContract(SellerContract, 'delete_owner', args)
      assert.equal(result, 'Owner does not exist')
    })

    it('should creat owner', async () => {
      const args = {
        args: `("Villa Maria", 2000, "Sofia, 4 Str. K")`,
        options: { ttl: 55 },
        abi: 'sophia'
      }
      const result = await callContract(SellerContract, 'add_owner', args)
      assert.equal(result, true)
    })

    it('should delete property', async () => {
      const args = {
        args: `("Villa Maria")`,
        options: { ttl: 55 },
        abi: 'sophia'
      }
      const result = await callContract(SellerContract, 'delete_property', args)
      assert.equal(result, true)
    })

    // TODO: not sure
    it('should delete property', async () => {
      const args = {
        args: `("Stoyna house")`,
        options: { ttl: 55 },
        abi: 'sophia'
      }
      const result = await callContract(SellerContract, 'delete_property', args)
      assert.equal(result, 'Property does not exist')
    })

    it('should add property', async () => {
      const args = {
        args: `("Artur apartment", 1000, "Varna, 123 Str. A")`,
        options: { ttl: 55 },
        abi: 'sophia'
      }
      const result = await callContract(SellerContract, 'add_property', args)
      assert.equal(result, 'true')
    })

    // TODO: Not sure the address!!
    it('should get property address', async () => {
      const args = {
        args: `(${addressSeller}, "Artur apartment")`,
        options: { ttl: 55 },
        abi: 'sophia'
      }
      const result = await callContract(
        SellerContract,
        'get_property_address',
        args
      )
      assert.equal(result, 'Varna, 123 Str. A')
    })

    // TODO: Not sure the address!!
    it("should get property's paymentstatus", async () => {
      const args = {
        args: `(${addressSeller}, "Artur apartment")`,
        options: { ttl: 55 },
        abi: 'sophia'
      }
      const result = await callContract(
        SellerContract,
        'get_payment_status',
        args
      )
      assert.equal(result, 'false')
    })

    // TODO: The address ${addressSeller} has to be different format
    it("should get property's tenant", async () => {
      const args = {
        args: `(${addressSeller}, "Artur apartment")`,
        options: { ttl: 55 },
        abi: 'sophia'
      }
      const result = await callContract(
        SellerContract,
        'get_payment_status',
        args
      )
      assert.equal(result, `${addressSeller}`)
    })

    // TODO: Not sure the address!!
    it('should get price of the property', async () => {
      const args = {
        args: `(${addressSeller}, "Artur apartment")`,
        options: { ttl: 55 },
        abi: 'sophia'
      }
      const result = await callContract(SellerContract, 'get_price', args)
      assert.equal(result, 1000)
    })

    it('should change the price of the property', async () => {
      const args = {
        args: `("Artur apartment", 3000)`,
        options: { ttl: 55 },
        abi: 'sophia'
      }
      const result = await callContract(SellerContract, 'change_price', args)
      assert.equal(result, 'true')
    })

    // TODO: Not sure the address!!
    it('should get the new price of the property', async () => {
      const args = {
        args: `(${addressSeller}, "Artur apartment")`,
        options: { ttl: 55 },
        abi: 'sophia'
      }
      const result = await callContract(SellerContract, 'get_price', args)
      assert.equal(result, 3000)
    })

    it('should change the address of the property', async () => {
      const args = {
        args: `("Artur apartment", 'Sofia, 321 Str. B')`,
        options: { ttl: 55 },
        abi: 'sophia'
      }
      const result = await callContract(SellerContract, 'change_price', args)
      assert.equal(result, 'true')
    })

    // TODO: Not sure the address!!
    it('should get the new address of the property', async () => {
      const args = {
        args: `(${addressSeller}, "Artur apartment")`,
        options: { ttl: 55 },
        abi: 'sophia'
      }
      const result = await callContract(
        SellerContract,
        'get_property_address',
        args
      )
      assert.equal(result, 'Sofia, 321 Str. B')
    })

    it('should pay the rent', async () => {
      const args = {
        args: `(${addressSeller}, "Artur apartment")`,
        options: { ttl: 55, amount: 3000 },
        abi: 'sophia'
      }
      const result = await callContract(
        SellerContract,
        'get_property_address',
        args
      )
      assert.equal(result, 'Sofia, 321 Str. B')
    })
  })
})
