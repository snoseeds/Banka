import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'TEST'
    ? process.env.DATABASE_TEST_URL : process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */
const createTables = (...args) => {
  const createClientTableQuery = `
  CREATE TABLE IF NOT EXISTS client(
    id BIGSERIAL PRIMARY KEY not null,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phoneNumber VARCHAR(14) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    type VARCHAR(10) NOT NULL DEFAULT 'client',
    noOfAccounts INTEGER NOT NULL DEFAULT 0,
    registeredDate TIMESTAMP WITH TIME ZONE NOT NULL,
    lastVisit TIMESTAMP WITH TIME ZONE NOT NULL
  )`;

  const createCashierTableQuery = `
  CREATE TABLE IF NOT EXISTS cashier(
    id BIGSERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    type VARCHAR(10) NOT NULL DEFAULT 'cashier',
    house_address TEXT NOT NULL,
    idCardType VARCHAR(2) NOT NULL,
    idCardNumber VARCHAR(50) NOT NULL,
    isAdmin BOOLEAN DEFAULT false,
    isRootAdmin BOOLEAN DEFAULT false,
    registeredDate TIMESTAMP WITH TIME ZONE NOT NULL
  )`;

  const createAdminTableQuery = `
  CREATE TABLE IF NOT EXISTS admin(
    id BIGSERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    type VARCHAR(10) NOT NULL DEFAULT 'admin',
    house_address TEXT NOT NULL,
    idCardType VARCHAR(2) NOT NULL,
    idCardNumber VARCHAR(50) NOT NULL,
    isAdmin BOOLEAN DEFAULT true,
    isRootAdmin BOOLEAN DEFAULT false,
    registeredDate TIMESTAMP WITH TIME ZONE NOT NULL
  )`;

  const createRootAdminTableQuery = `
  CREATE TABLE IF NOT EXISTS rootAdmin(
    id BIGSERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    type VARCHAR(10) NOT NULL DEFAULT 'rootAdmin',
    house_address TEXT NOT NULL,
    idCardType VARCHAR(2) NOT NULL,
    idCardNumber VARCHAR(50) NOT NULL,
    isAdmin BOOLEAN DEFAULT true,
    isRootAdmin BOOLEAN DEFAULT true,
    registeredDate TIMESTAMP WITH TIME ZONE NOT NULL
  )`;

  const createAccountTableQuery = `
  CREATE TABLE IF NOT EXISTS account(
    accountID BIGSERIAL NOT NULL,
    idCardType VARCHAR(2) NOT NULL,
    idCardNumber VARCHAR(50) NOT NULL,
    acctMobileNo VARCHAR(14) NOT NULL,
    accountNumber VARCHAR(10) PRIMARY KEY NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    createdon TIMESTAMP WITH TIME ZONE NOT NULL,
    type VARCHAR(15) NOT NULL,
    ownerID INTEGER NOT NULL REFERENCES client (id),
    status VARCHAR(10) DEFAULT 'active',
    accountBalance DECIMAL(15,2) NOT NULL DEFAULT 0.00
  )`;

  const createTransactionTableQuery = `
  CREATE TABLE IF NOT EXISTS transaction(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    createdon TIMESTAMP WITH TIME ZONE NOT NULL,
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
      console.log('abcdef');
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Tables
 */
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
      console.log(err);
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
