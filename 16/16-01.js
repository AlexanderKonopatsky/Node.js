const http = require('http');
const {graphql, buildSchema} = require('graphql');
const schema = buildSchema(require('fs').readFileSync('./schema.gql').toString());
const { DB } = require('./DB/DB');
const resolver = require('./resolver');

const server = http.createServer();

const context = DB((err, connect) => {
    if (err) {
        console.error('Database connection failed');
    }
    else {
        console.log('Database connection successful');
        server.listen(3000, () => {
            console.log('Server running at http://localhost:3000/')})
            .on('error', (err) => { console.log('Error:', err.code); })
            .on('request', handler);
    }
});

const handler = (request, response) => {
    if (request.method === 'POST') {
        let result = '';
        request.on('data', (data) => { result += data; });
        request.on('end', () => {
            try {
                let obj = JSON.parse(result);
                if (obj.query) {
                    graphql(schema, obj.query, resolver, context, obj.variables)
                        .then((result) => {
                                if (result.errors) {
                                response.statusCode = 400;
                            }
                            response.end(JSON.stringify(result, null, '  '));
                        })
                }
                if (obj.mutation) {
                    graphql(schema, obj.mutation, resolver, context, obj.variables)
                        .then((result) => {
                            if (result.errors) {
                                response.statusCode = 400;
                            }
                            response.end(JSON.stringify(result, null, '  '));
                        })
                }
            }
            catch (e) {
                response.statusCode = 400;
            }
        })
    }
};