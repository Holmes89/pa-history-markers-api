var app = require('../src/app')
  , http = require('support/http');

describe('Marker API',function(){

  before(function(done){
    http.createServer(app,done);
  });

  it('GET /marker should return 200',function(done){
    request()
      .get('/marker')
      .expect(200,done);
  });

  it('GET /marker/:id should return 200',function(done){
    request()
      .get('/users/57d7f0032354ec10b03c48a0')
      .expect(200,done);
  });
});
