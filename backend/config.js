const configs = {
    default: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'Unpredictable00',  // Your default password
        database: process.env.DB_NAME || 'SustainChain'
    },
    friend: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.FRIEND_DB_PASS || 'praneetk@2003',  // Your friend's password
        database: process.env.DB_NAME || 'SustainChain'
    }
};

// Set the config based on a USER environment variable
const currentConfig = process.env.USER === 'friend' ? configs.friend : configs.default;

module.exports = currentConfig;
