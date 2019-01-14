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
    it('Test get_year', async () => {
      const array = [
        { year: 1974, timestamp: 126230400 },
        { year: 1982, timestamp: 410227199 },
        { year: 1988, timestamp: 599615999 },
        { year: 2004, timestamp: 1104537599 },
        { year: 2018, timestamp: 1514764800 },
        { year: 2025, timestamp: 1767225599 },
        { year: 2032, timestamp: 1956528000 },
      ]

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

      async function withdrawYear(item) {
        const result = await contract.call('get_year', {
          args: `(${item.timestamp})`,
          options: { ttl: config.ttl },
          abi: 'sophia',
        })
        return result
      }

      async function decodeYear(item) {
        const result = await item.decode('int')
        return result
      }

      async function processArray(array) {
        let years = []
        let results = []

        for (const item of array) {
          results.push(await withdrawYear(item))
        }

        for (const res of results) {
          years.push(await decodeYear(res))
        }

        return years.map(el => el.value)
      }
      const decodedYears = await processArray(array)
      const mockupYears = array.map(item => item.year)

      assert.deepEqual(decodedYears, mockupYears)
    })
  })

  describe('Call Date Time', () => {
    it('Test get_month', async () => {
      const array = [
        { month: 12, timestamp: 63071999 },
        { month: 2, timestamp: 65750400 },
        { month: 7, timestamp: 18316799 },
        { month: 6, timestamp: 13046400 },
        { month: 8, timestamp: 84153599 },
      ]

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

      async function withdrawMonth(item) {
        const result = await contract.call('get_month', {
          args: `(${item.timestamp})`,
          options: { ttl: config.ttl },
          abi: 'sophia',
        })
        return result
      }

      async function decodeMonths(item) {
        const result = await item.decode('int')
        return result
      }

      async function processArray(array) {
        let months = []
        let results = []

        for (const item of array) {
          results.push(await withdrawMonth(item))
        }

        for (const res of results) {
          months.push(await decodeMonths(res))
        }

        return months.map(el => el.value)
      }
      const decodedMonths = await processArray(array)
      const mockupMonths = array.map(item => item.month)

      assert.deepEqual(decodedMonths, mockupMonths)
    })
  })

  describe('Call Date Time', () => {
    it('Test get_day', async () => {
      const array = [
        { day: 14, timestamp: 1547476268 },
        { day: 4, timestamp: 1507075200 },
        { day: 7, timestamp: 581644800 },
        { day: 26, timestamp: 1458950400 },
        { day: 30, timestamp: 1209513600 },
      ]

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

      async function withdrawDay(item) {
        const result = await contract.call('get_day', {
          args: `(${item.timestamp})`,
          options: { ttl: config.ttl },
          abi: 'sophia',
        })
        return result
      }

      async function decodeDays(item) {
        const result = await item.decode('int')
        return result
      }

      async function processArray(array) {
        let days = []
        let results = []

        for (const item of array) {
          results.push(await withdrawDay(item))
        }

        for (const res of results) {
          days.push(await decodeDays(res))
        }

        return days.map(el => el.value)
      }
      const decodedDays = await processArray(array)
      const mockupDays = array.map(item => item.day)

      assert.deepEqual(decodedDays, mockupDays)
    })
  })

  describe('Call Date Time', () => {
    it('Test get_hour', async () => {
      const array = [
        { hour: 6, timestamp: 63093600 },
        { hour: 10, timestamp: 63111599 },
        { hour: 17, timestamp: 63136799 },
        { hour: 20, timestamp: 63147599 },
        { hour: 22, timestamp: 63154799 },
      ]

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

      async function withdrawHour(item) {
        const result = await contract.call('get_hour', {
          args: `(${item.timestamp})`,
          options: { ttl: config.ttl },
          abi: 'sophia',
        })
        return result
      }

      async function decodeHours(item) {
        const result = await item.decode('int')
        return result
      }

      async function processArray(array) {
        let hours = []
        let results = []

        for (const item of array) {
          results.push(await withdrawHour(item))
        }

        for (const res of results) {
          hours.push(await decodeHours(res))
        }

        return hours.map(el => el.value)
      }
      const decodedHours = await processArray(array)
      const mockupHours = array.map(item => item.hour)

      assert.deepEqual(decodedHours, mockupHours)
    })
  })

  describe('Call Date Time', () => {
    it('Test get_second', async () => {
      const array = [
        { second: 59, timestamp: 63071999 },
        { second: 6, timestamp: 63072006 },
        { second: 17, timestamp: 63072017 },
        { second: 23, timestamp: 63072023 },
        { second: 28, timestamp: 63072028 },
      ]

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

      async function withdrawSecond(item) {
        const result = await contract.call('get_second', {
          args: `(${item.timestamp})`,
          options: { ttl: config.ttl },
          abi: 'sophia',
        })
        return result
      }

      async function decodeSeconds(item) {
        const result = await item.decode('int')
        return result
      }

      async function processArray(array) {
        let seconds = []
        let results = []

        for (const item of array) {
          results.push(await withdrawSecond(item))
        }

        for (const res of results) {
          seconds.push(await decodeSeconds(res))
        }

        return seconds.map(el => el.value)
      }
      const decodedSeconds = await processArray(array)
      const mockupSeconds = array.map(item => item.second)

      assert.deepEqual(decodedSeconds, mockupSeconds)
    })
  })

  describe('Call Date Time', () => {
    it('Test weekday', async () => {
      const array = [
        { weekday: 3, timestamp: 67737599 },
        { weekday: 5, timestamp: 67824000 },
        { weekday: 0, timestamp: 68083199 },
        { weekday: 2, timestamp: 68169600 },
        { weekday: 4, timestamp: 68342400 },
      ]

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

      async function withdrawWeekday(item) {
        const result = await contract.call('get_weekday', {
          args: `(${item.timestamp})`,
          options: { ttl: config.ttl },
          abi: 'sophia',
        })
        return result
      }

      async function decodeWeekdays(item) {
        const result = await item.decode('int')
        return result
      }

      async function processArray(array) {
        let weekdays = []
        let results = []

        for (const item of array) {
          results.push(await withdrawWeekday(item))
        }

        for (const res of results) {
          weekdays.push(await decodeWeekdays(res))
        }

        return weekdays.map(el => el.value)
      }
      const decodedWeekdays = await processArray(array)
      const mockupWeekdays = array.map(item => item.weekday)

      assert.deepEqual(decodedWeekdays, mockupWeekdays)
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
