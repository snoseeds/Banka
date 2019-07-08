import { pool, logger } from './connectToDb';

const createTables = (...args) => {
  const createClientTableQuery = `
  CREATE TABLE IF NOT EXISTS client(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    mobileNo VARCHAR(14) UNIQUE NOT NULL,
    noOfAccounts INTEGER NOT NULL DEFAULT 0,
    registeredDate TIMESTAMP WITH TIME ZONE DEFAULT NOW()::timestamp,
    lastVisit TIMESTAMP WITH TIME ZONE DEFAULT NOW()::timestamp
  )`;

  const createCashierTableQuery = `
  CREATE TABLE IF NOT EXISTS cashier(
    id BIGSERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    mobileNo VARCHAR(14) UNIQUE,
    houseAddress TEXT NOT NULL,
    idCardType VARCHAR(2) NOT NULL,
    idCardNumber VARCHAR(50) NOT NULL,
    isAdmin BOOLEAN DEFAULT false,
    isRootAdmin BOOLEAN DEFAULT false,
    registeredDate TIMESTAMP WITH TIME ZONE DEFAULT NOW()::timestamp,
    lastVisit TIMESTAMP WITH TIME ZONE DEFAULT NOW()::timestamp
  )`;

  const createAdminTableQuery = `
  CREATE TABLE IF NOT EXISTS admin(
    id BIGSERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mobileNo VARCHAR(14) UNIQUE,
    password TEXT NOT NULL,
    houseAddress TEXT NOT NULL,
    idCardType VARCHAR(2) NOT NULL,
    idCardNumber VARCHAR(50) NOT NULL,
    isAdmin BOOLEAN DEFAULT true,
    isRootAdmin BOOLEAN DEFAULT false,
    registeredDate TIMESTAMP WITH TIME ZONE DEFAULT NOW()::timestamp,
    lastVisit TIMESTAMP WITH TIME ZONE DEFAULT NOW()::timestamp
  )`;

  const createRootAdminTableQuery = `
  CREATE TABLE IF NOT EXISTS rootAdmin(
    id BIGSERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mobileNo VARCHAR(14) UNIQUE,
    password TEXT NOT NULL,
    houseAddress TEXT NOT NULL,
    idCardType VARCHAR(2) NOT NULL,
    idCardNumber VARCHAR(50) NOT NULL,
    isAdmin BOOLEAN DEFAULT true,
    isRootAdmin BOOLEAN DEFAULT true,
    registeredDate TIMESTAMP WITH TIME ZONE DEFAULT NOW()::timestamp,
    lastVisit TIMESTAMP WITH TIME ZONE DEFAULT NOW()::timestamp
  )`;

  const createAccountTableQuery = `
  CREATE TABLE IF NOT EXISTS account(
    accountID BIGSERIAL NOT NULL,
    ownerID INTEGER NOT NULL REFERENCES client (id),
    email VARCHAR(255) NOT NULL REFERENCES client (email),
    accountNumber VARCHAR(10) PRIMARY KEY NOT NULL,
    type VARCHAR(15) NOT NULL,
    idCardType VARCHAR(2) NOT NULL,
    idCardNumber VARCHAR(50) NOT NULL,
    acctMobileNo VARCHAR(14) NOT NULL,
    createdon TIMESTAMP WITH TIME ZONE DEFAULT NOW()::timestamp,
    status VARCHAR(10) DEFAULT 'active',
    accountBalance DECIMAL(15,2) NOT NULL DEFAULT 0.00
  )`;

  const createTransactionTableQuery = `
  CREATE TABLE IF NOT EXISTS transaction(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    createdon TIMESTAMP WITH TIME ZONE DEFAULT NOW()::timestamp,
    accountnumber VARCHAR(10) NOT NULL REFERENCES account (accountNumber),
    amount DECIMAL(15,2) NOT NULL,
    cashier VARCHAR(255) NOT NULL,
    type VARCHAR(6) NOT NULL,
    oldbalance DECIMAL(15,2) NOT NULL,
    newbalance DECIMAL(15,2) NOT NULL
  )`;

  const objOfTablesInArgs = {
    client: createClientTableQuery,
    cashier: createCashierTableQuery,
    admin: createAdminTableQuery,
    rootAdmin: createRootAdminTableQuery,
    account: createAccountTableQuery,
    transaction: createTransactionTableQuery,
  };
  const queryTextsArr = args.length > 0
    ? args.map(tableOwner => objOfTablesInArgs[tableOwner])
    : Object.values(objOfTablesInArgs);

  const queryTextsString = `${queryTextsArr.join(';\n')};`;
  pool.query(queryTextsString)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      logger(err);
      pool.end();
    });
};

const dropTables = (...args) => {
  const dropClientTableQuery = 'DROP TABLE IF EXISTS client';
  const dropCashierTableQuery = 'DROP TABLE IF EXISTS cashier';
  const dropAdminTableQuery = 'DROP TABLE IF EXISTS admin';
  const dropRootAdminTableQuery = 'DROP TABLE IF EXISTS rootAdmin';
  const dropAccountTableQuery = 'DROP TABLE IF EXISTS account';
  const dropTransactionTableQuery = 'DROP TABLE IF EXISTS transaction';

  // Hierarchy of deletion done to ensure that referential integrity isn't violated
  const objOfTablesInArgs = {
    transaction: dropTransactionTableQuery,
    account: dropAccountTableQuery,
    client: dropClientTableQuery,
    cashier: dropCashierTableQuery,
    admin: dropAdminTableQuery,
    rootAdmin: dropRootAdminTableQuery,
  };
  const queryTextsArr = args.length > 0
    ? args.map(tableOwner => objOfTablesInArgs[tableOwner])
    : Object.values(objOfTablesInArgs);

  pool.query(`${queryTextsArr.join(';\n')};`)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      logger(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables,
};

require('make-runnable');
