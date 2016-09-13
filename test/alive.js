var request = require('supertest');
var server  = require('../src/app');
describe('loading express', function () {
    it('responds to /', function testSlash(done) {
	request(server)
	    .get('/')
	    .expect(200, done);
    });
    it('404 everything else', function testPath(done) {
	request(server)
	    .get('/foo/bar')
	    .expect(404, done);
    });
});
