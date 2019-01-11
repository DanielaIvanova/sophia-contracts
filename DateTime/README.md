# Date and Time Sophia smart contract

## Sophia Date and Time smart contract overview
Sophia contract which implements utilities that eases the work with date-time related job. There is a functionality for getting year, month, day, hour, minute, second and weekday from timestamp and vice versa. 
The contract is made using [forgAE project](https://github.com/aeternity/aepp-forgae-js) with tests included.

## Prerequisites
Ensure that you have installed [forgAE project](https://github.com/aeternity/aepp-forgae-js)

## Clone this repository
```
git clone https://github.com/DanielaIvanova/sophia-contracts.git
cd DateTime
```

## How to start the node localy
`forgae node`

## How to deploy the contract
`forgae deploy`

This command will deploy the contract in the local network.
The configuration of deployment is written in `deploy.js` file.

In our case the output is:
```
===== Contract: DateTime.aes has been deployed =====
{ owner: 'ak_2mwRmUeYmfuW93ti9HMSUJzCk1EYcQEfikVSzgo6k2VghsWhgU',
  transaction: 'th_RT3BTt6eiVNKkgjw2vW1pjFFvQ99SwM4ogQHMDcL5Zdawdnn2',
  address: 'ct_HVb6d4kirgqzY1rShmzRTRwukcsXobjHcpLVD2EggoHmn6wt2',
  call: [Function],
  callStatic: [Function],
  createdAt: 2019-01-11T08:11:11.236Z }
Your deployment script finished successfully!
```

## How to run tests
`forgae test`

All tests should be passing.

## Implemented functionality
The library contains:
1. `parse_timestamp(timestamp)`
The function takes as argument a timestamp and return a date_time structure. Return type of the function is `(int, int, int, int, int, int, int, int)`.
2. `get_year(timestamp)`
The function takes as argument a timestamp and return the year of the given timestamp. Return type of the function is `int`.
3. `get_month(timestamp)`
The function takes as argument a timestamp and return the month of the given timestamp. Return type of the function is `int`.
4. `get_day(timestamp)`
The function takes as argument a timestamp and return the day of the given timestamp. Return type of the function is `int`.
5. `get_hour(timestamp)`
The function takes as argument a timestamp and return the hour of the given timestamp. Return type of the function is `int`.
6. `get_minute(timestamp)`
The function takes as argument a timestamp and return the minute of the given timestamp. Return type of the function is `int`.
7. `get_second(timestamp)`
The function takes as argument a timestamp and return the second of the given timestamp. Return type of the function is `int`.
8. `get_weekday(timestamp)`
The function takes as argument a timestamp and return the weekday of the given timestamp. Return type of the function is `int`.
9. `to_timestamp(year, month, day, hour, minute, second)`
The function takes as arguments year, month, day, hour, minute, second and return the timestamp. Return type of the function is `int`.
