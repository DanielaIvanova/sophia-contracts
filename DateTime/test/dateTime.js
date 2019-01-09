const Ae = require('@aeternity/aepp-sdk').Universal

const config = {
  host: 'http://localhost:3001/',
  internalHost: 'http://localhost:3001/internal/',
  gas: 200000,
  ttl: 55,
}

describe('Date Time', () => {
  let owner
  let contractSource = utils.readFileRelative(
    './contracts/DateTime.aes',
    'utf-8'
  )

  before(async () => {
    const ownerKeyPair = wallets[0]
    owner = await Ae({
      url: config.host,
      internalUrl: config.internalHost,
      keypair: ownerKeyPair,
      nativeMode: true,
      networkId: 'ae_devnet',
    })
  })

  describe('Call Date Time', () => {
    it('Test parse_timestamp function', async () => {
      const year = 2016
      const month = 3
      const day = 7
      const hour = 8
      const minute = 58
      const second = 47
      const weekday = 1
      const timestamp = 1457341127

      const compiledContract = await owner.contractCompile(contractSource, {
        gas: config.gas,
      })

      const deployPromise = compiledContract.deploy({
        options: {
          ttl: config.ttl,
        },
      })
      assert.isFulfilled(
        deployPromise,
        'Could not deploy the ExampleContract Smart Contract'
      )

      let contract = await deployPromise
      const callWithdraw = await contract.call('parse_timestamp', {
        args: `(${timestamp})`,
        options: { ttl: config.ttl },
        abi: 'sophia',
      })
      const decodedWithdraw = await callWithdraw.decode(
        '(int, int, int, int, int, int, int, int)'
      )
      const decodedWithdrawValues = decodedWithdraw.value.map(
        item => item.value
      )
      assert.deepEqual(decodedWithdrawValues, [
        year,
        month,
        day,
        hour,
        minute,
        second,
        weekday,
        timestamp,
      ])
    })
  })

  describe('Call Date Time', () => {
    it('Test all get functions', async () => {
      const year = 1988
      const month = 5
      const day = 5
      const hour = 2
      const minute = 31
      const second = 04
      const timestamp = 578802664

      const compiledContract = await owner.contractCompile(contractSource, {
        gas: config.gas,
      })

      const deployPromise = compiledContract.deploy({
        options: {
          ttl: config.ttl,
        },
      })
      assert.isFulfilled(
        deployPromise,
        'Could not deploy the ExampleContract Smart Contract'
      )

      let contract = await deployPromise
      // year
      const callWithdrawYear = await contract.call('get_year', {
        args: `(${timestamp})`,
        options: { ttl: config.ttl },
        abi: 'sophia',
      })

      const decodedWithdrawYear = await callWithdrawYear.decode('int')
      assert.equal(decodedWithdrawYear.value, year)
      // month
      const callWithdrawMonth = await contract.call('get_month', {
        args: `(${timestamp})`,
        options: { ttl: config.ttl },
        abi: 'sophia',
      })

      const decodedWithdrawMonth = await callWithdrawMonth.decode('int')
      assert.equal(decodedWithdrawMonth.value, month)
      // day
      const callWithdrawDay = await contract.call('get_day', {
        args: `(${timestamp})`,
        options: { ttl: config.ttl },
        abi: 'sophia',
      })

      const decodedWithdrawDay = await callWithdrawDay.decode('int')
      assert.equal(decodedWithdrawDay.value, day)
      // hour
      const callWithdrawHour = await contract.call('get_hour', {
        args: `(${timestamp})`,
        options: { ttl: config.ttl },
        abi: 'sophia',
      })

      const decodedWithdrawHour = await callWithdrawHour.decode('int')
      assert.equal(decodedWithdrawHour.value, hour)
      // minute
      const callWithdrawMinute = await contract.call('get_minute', {
        args: `(${timestamp})`,
        options: { ttl: config.ttl },
        abi: 'sophia',
      })
      const decodedWithdrawMinute = await callWithdrawMinute.decode('int')
      assert.equal(decodedWithdrawMinute.value, minute)
      // second
      const callWithdrawSecond = await contract.call('get_second', {
        args: `(${timestamp})`,
        options: { ttl: config.ttl },
        abi: 'sophia',
      })
      const decodedWithdrawSecond = await callWithdrawSecond.decode('int')
      assert.equal(decodedWithdrawSecond.value, second)
    })
  })

  describe('Call Date Time', () => {
    it('Test to_timestamp function', async () => {
      const year = 2006
      const month = 7
      const day = 4
      const hour = 9
      const minute = 43
      const second = 7
      const timestamp = 1152006187

      const compiledContract = await owner.contractCompile(contractSource, {
        gas: config.gas,
      })

      const deployPromise = compiledContract.deploy({
        options: {
          ttl: config.ttl,
        },
      })
      assert.isFulfilled(
        deployPromise,
        'Could not deploy the ExampleContract Smart Contract'
      )

      let contract = await deployPromise
      const callWithdraw = await contract.call('to_timestamp', {
        args: `(${year}, ${month}, ${day}, ${hour}, ${minute}, ${second})`,
        options: { ttl: config.ttl },
        abi: 'sophia',
      })
      const decodedWithdraw = await callWithdraw.decode('int')

      assert.equal(decodedWithdraw.value, timestamp)
    })
  })

  describe('Deploying contract', () => {
    it('Deploying Date Time', async () => {
      const compiledContract = await owner.contractCompile(contractSource, {
        gas: config.gas,
      })

      const deployPromise = compiledContract.deploy({
        options: {
          ttl: config.ttl,
        },
      })

      assert.isFulfilled(
        deployPromise,
        'Could not deploy the ExampleContract Smart Contract'
      )
    })
  })
})
