import rp from 'request-promise';

class ResourceManager {

  constructor(domain,token) {
    this.domain = domain;
    this.token = token;
  }

  bearerHeader() {
    return {"Authorization": `Bearer ${this.token}`};
  }

  async createResourceServer(name, identifier, scopes=["link:identity", "chnage:password", "reset:password" ]) {
    const scopesValues = scopes.map(s=>{
      return {value:s, description:s.replace(":"," ")};
    });
    return await rp( {
      method: 'POST',
      url: `https://${this.domain}/api/v2/resource-servers`,
      headers: this.bearerHeader(),
      json: {name,identifier,scopes:scopesValues}
    });
  }

  async createClient(name) {
    return await rp( {
      method: 'POST',
      url: `https://${this.domain}/api/v2/clients`,
      headers: this.bearerHeader(),
      json: {name}
    });
  }

  async createClientGrant(clientId,audience,scope) {
    return await rp( {
      method: 'POST',
      url: `https://${this.domain}/api/v2/client-grants`,
      headers: this.bearerHeader(),
      json: {
        client_id:clientId,
        audience,
        scope
      }
    });
  }

  async createResources(){
    const backendClientName = 'Self Service Backend',
    apiIdentifier = apiAudience = 'http://selfservice.auth0.com/ldap',
    validScope = ["link:identity", "chnage:password", "reset:password"];

    console.log(`creating backend client...`);
    let backendClient = await this.createClient(backendClientName);
    console.log(`creating api...`);
    let backendApi = await this.createResourceServer(apiIdentifier,apiAudience,scope);
    console.log(`create api grant...`);
    let grant = await this.createClientGrant(backendClient.client_id, backendApi.identifier, scope);

    return {
      clientId: backendClient.client_id,
      clientSecret: backendClient.client_secret
    };
  }
}

export default ResourceManager;
