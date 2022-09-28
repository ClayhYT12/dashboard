import Juno from 'juno-api';

const juno = new Juno({
    clientId: 'gshCSPafsLX6mrdL',
    clientSecret: 'eEP#sI{0+8r|+Oo~S!tnnZ9xXEOO&,,1',
});
  
const token = await juno.authorization.accessToken();
export default token;

  

