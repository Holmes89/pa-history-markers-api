var server = require('../src/app')
, request = require('supertest');

describe('Marker API',function(){
    it('GET /markers should return 200',function(done){
	this.timeout(50000);
    request(server)
      .get('/markers')
      .expect(200,done);
  });

  it('GET /marker/:id should return 200',function(done){
    request(server)
      .get('/markers/57d7f0032354ec10b03c48a0')
      .expect(200,done);
  });
});
