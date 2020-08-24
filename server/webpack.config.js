module.exports = {
  target: 'node',
  mode: 'development',
  entry: './server.js',
  resolve: {
    modules: ['server', 'node_modules'],
  },
};
