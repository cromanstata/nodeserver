var tools = require('../server_test');

describe('tets', function() {
  tools.createNewUser("hello1", "winners");
  tools.createNewUser("world2", "loosers");
  tools.createNewTeam("winners");
  tools.createNewTeam("loosers");



  tools.updateUser("hello hello" , 1);
});
