module.exports = {
  target: 'node',
  mode: 'development',
  entry: './server.js',
  resolve: {
    modules: ['backend', 'node_modules'],
  },
};
