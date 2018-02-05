# nodeserver
to test post requests to server i'v been using curl commands from shell:

create user:
curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "sha55har", "team_id": "winners"}' http://localhost:3000/users/create

delete team:
curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "winners"}' http://localhost:3000/teams/delete

and so on, according to post handlers in server_test.js


