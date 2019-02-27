'use strict';

const { ContractInteract, Setup } = require('@openstfoundation/mosaic.js');
const UtilityBrandedToken = require('../ContractInteract/UtilityBrandedToken');

const setup = async (
  originWeb3,
  auxiliaryWeb3,
  auxiliaryOrganizationConfig,
  auxiliaryOrganizationTxOptions,
  auxiliaryUBTConfig,
  auxiliaryTxUBTOptions,
  originGatewayConfig,
  auxiliaryGatewayConfig,
  originGatewayTxOptions,
  auxiliaryCoGatewayTxOptions,
  auxiliaryUBTSetCoGatewayTxOptions,
) => {
  const auxiliaryOrganization = await ContractInteract.Organization.setup(
    auxiliaryWeb3,
    auxiliaryOrganizationConfig,
    auxiliaryOrganizationTxOptions,
  );

  const utilityBrandedToken = await UtilityBrandedToken.deploy(
    auxiliaryWeb3,
    auxiliaryUBTConfig.valueToken,
    auxiliaryUBTConfig.symbol,
    auxiliaryUBTConfig.name,
    auxiliaryUBTConfig.decimal,
    auxiliaryUBTConfig.organization,
    auxiliaryTxUBTOptions,
  );

  const [originGateway, auxiliaryCoGateway] = await Setup.gateways.setup(
    originGatewayConfig,
    auxiliaryGatewayConfig,
    originGatewayTxOptions,
    auxiliaryCoGatewayTxOptions,
  );

  await utilityBrandedToken.setCoGateway(
    auxiliaryCoGateway.address,
    auxiliaryUBTSetCoGatewayTxOptions,
  );

  return {
    auxiliaryOrganization,
    utilityBrandedToken,
    originGateway,
    auxiliaryCoGateway,
  };
};

module.exports = setup;