var http = require('http');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.listen(port);

var user_num = 1;
var team_num = 1;

var arr_users = {
}

var arr_teams = {
}

function userMake(name, id, team_id)
{
  this.name = name;
  this.id = id;
  this.team_id = team_id;
}

function teamMake(name, team_id)
{
  this.name = name;
  this.team_id = team_id;
  this.team_user_num = 0;
}

function getTeamUsers(team_name)
{
  for(var key in arr_users)
  {
    if (arr_users[key].team_id === team_name)
    {
        arr_teams[team_name]['user'+arr_users[key].id] = arr_users[key];
        ++arr_teams[team_name].team_user_num;
    }
  }
}

function updateTeam(team_name, user)
{
  arr_teams[team_name]['user'+user.id] = user;
  ++arr_teams[team_name].team_user_num;
}

function isTeam(team_name)
{
  for(var key in arr_teams)
  {
    if (arr_teams[key].name === team_name)
    {
        return(true);
    }
  }
  return(false);
}

function removeFromTeam(user)
{
  for(var key in arr_teams)
  {
    if (key === user.team_id)
    {
        delete arr_teams[key]['user'+user.id];
        --arr_teams[key].team_user_num;
    }
  }
}

function createNewUser(user, team_id)
{
  user = new userMake(user, user_num, team_id);
  arr_users['user'+user.id] = user;
  if(isTeam(team_id))
  {
    updateTeam(team_id, user);
  }
  ++user_num;
}

function updateUser(user_name, id)
{
  var getid = "user" + id;
  arr_users[getid].name = user_name;
}

function deleteUser(user)
{
    var getid = "user" + user.id;
    removeFromTeam(arr_users[getid]);
    delete arr_users[getid];
}

function createNewTeam(name)
{
  var id = name;
  team = new teamMake(name, team_num);
  arr_teams[id] = team;
  getTeamUsers(name);
  ++team_num;
}

function containsObject(obj, list) {
    for(var key in list)
    {
      if (list[key].name === obj) {
          return true;
      }
    }
    return false;
}

function deleteTeam(team)
{
  delete arr_teams[team.name];
}

app.post('/teams/create', function(req, res) {

    var name = req.body.name;
    createNewTeam(name);
    res.send('new team ' + name + ' created');
});

app.post('/teams/delete', function(req, res) {

    var name = req.body.name;
    deleteTeam(arr_teams[name]);
    res.send('team ' + name + ' deleted');
});

app.post('/users/create', function(req, res) {

    var name = req.body.name;
    var team_id = req.body.team_id;
    createNewUser(name, team_id);
    res.send('new user ' + name + ' created');
});

app.post('/users/update', function(req, res) {

    var id = req.body.id;
    var name = req.body.name;
    updateUser(name, id);
    res.send('user ' + id + ' updated');
});

app.post('/users/delete', function(req, res) {

    var id = req.body.id;
    deleteUser(arr_users['user'+id]);
    res.send('user ' + id + ' deleted');
});

app.param('name', function(req, res, next, name) {

    var check = containsObject(name.toString(), arr_users);
    if(check == true)
    {
      req.name = name;
    }
    else
    {
      req.name = "no such name";
    }
    next();
});

app.get('/users', function(req, res) {
    res.send(
        arr_users
    );
  });

app.get('/teams', function(req, res) {
    res.send(
        arr_teams
    );
  });

app.get('/users/:name', function(req, res) {
      res.send(req.name);
  });


//something to put inside
createNewUser("hello1", "winners");
createNewUser("world2", "loosers");
createNewTeam("winners");
createNewTeam("loosers");



updateUser("hello hello" , 1);
