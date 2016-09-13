var server = require('../src/app')
, request = require('supertest');

describe('Marker API',function(){
    it('GET /marker should return 200',function(done){
	this.timeout(50000);
    request(server)
      .get('/marker?filter[simple][county]=Montour')
      .expect(200,done);
  });

  it('GET /marker/:id should return 200',function(done){
    request(server)
      .get('/marker/57d7f0032354ec10b03c48a0')
      .expect(200,done);
  });
});
