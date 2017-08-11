exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://localhost/tableTopicsDb';
                      
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
							'mongodb://localhost/tableTopicsDb_test';

exports.PORT = process.env.PORT || 8080;