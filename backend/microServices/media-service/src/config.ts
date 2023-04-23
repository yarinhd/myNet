export const config = {
    db: {
        connectionString: `mongodb://${process.env.DB_SERVERS || 'localhost:27017'}/${process.env.DB_NAME || 'myNet'}${
            process.env.DB_REPLICA_NAME ? `?replicaSet=${process.env.DB_REPLICA_NAME}` : ''
        }`,
        port: +(process.env.DB_PORT || 27017),
    },
    server: {
        port: +(process.env.PORT || 3000),
        name: 'media-service',
    },
    cors: {
        allowedOrigins: process.env.ALLOWED_ORIGINS
            ? process.env.ALLOWED_ORIGINS.split(',')
            : ['http://localhost:3000'],
    },
    rpc: {
        port: +(process.env.RPC_PORT || 5000),
    },
};
