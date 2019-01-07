'use strict';

const Web3 = require('web3');
const AbiBinProvider = require('../libs/AbiBinProvider');
let abProvider = new AbiBinProvider();

class Contracts {
  constructor(originWeb3, auxiliaryWeb3) {
    const oThis = this;

    oThis.originWeb3 = originWeb3;
    oThis.auxiliaryWeb3 = auxiliaryWeb3;
  }

  BrandedToken(address, options) {
    const oThis = this;
    let web3 = oThis.originWeb3;
    return Contracts.GetBrandedToken(web3, address, options);
  }

  GatewayComposer() {
    const oThis = this;
    let web3 = oThis.originWeb3;
    return Contracts.GetGatewayComposer(web3, address, options);
  }

  UtilityBrandedToken() {
    const oThis = this;
    let web3 = oThis.auxiliaryWeb3;
    return Contracts.GetUtilityBrandedToken(web3, address, options);
  }

  static GetBrandedToken(web3, address, options) {
    web3 = Contracts._getWeb3(web3);
    let jsonInterface = abProvider.getABI('BrandedToken');
    let contract = new web3.eth.Contract(jsonInterface, address, options);
    return contract;
  }

  static GetGatewayComposer(web3, address, options) {
    web3 = Contracts._getWeb3(web3);
    let jsonInterface = abProvider.getABI('GatewayComposer');
    let contract = new web3.eth.Contract(jsonInterface, address, options);
    return contract;
  }

  static GetUtilityBrandedToken(web3, address, options) {
    web3 = Contracts._getWeb3(web3);
    let jsonInterface = abProvider.getABI('UtilityBrandedToken');
    let contract = new web3.eth.Contract(jsonInterface, address, options);
    return contract;
  }

  static _getWeb3(web3) {
    if (web3 instanceof Web3) {
      return web3;
    }
    if (typeof web3 === 'string') {
      return new Web3(web3);
    }
    throw 'Invalid web3. Please provide an instanceof Web3(version: ' + Web3.version + ' )';
  }
}