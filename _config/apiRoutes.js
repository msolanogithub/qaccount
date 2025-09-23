const moduleName = 'iaccount';
const moduleVersion = 'v1';
const urlBase = `/${moduleName}/${moduleVersion}`;

export default {
  urlBase: urlBase,
  version: moduleVersion,
  accounts: `${urlBase}/accounts`,
  documentTypes: `${urlBase}/document-types`,
  accountTypes: `${urlBase}/account-types`,
};
