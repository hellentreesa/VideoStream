// keyVault.js
const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');

// Replace with your Azure Key Vault URL
const keyVaultUrl = 'https://videostream.vault.azure.net/';

// Create an instance of the SecretClient
const secretClient = new SecretClient(keyVaultUrl, new DefaultAzureCredential());

// Access secrets
async function getSecret(secretName) {
  const secret = await secretClient.getSecret(secretName);
  return secret.value;
}

module.exports = {
  getSecret,
};
