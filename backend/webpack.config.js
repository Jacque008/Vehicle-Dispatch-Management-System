module.exports = function (options, webpack) {
  return {
    ...options,
    externals: {
      // Exclude bcrypt (native module) and its optional dependencies
      'bcrypt': 'commonjs bcrypt',
      '@mapbox/node-pre-gyp': 'commonjs @mapbox/node-pre-gyp',
      'mock-aws-s3': 'commonjs mock-aws-s3',
      'aws-sdk': 'commonjs aws-sdk',
      'nock': 'commonjs nock',
    },
    module: {
      ...options.module,
      rules: [
        ...options.module.rules,
        {
          // Ignore HTML files in node-pre-gyp
          test: /\.html$/,
          type: 'asset/source',
        },
      ],
    },
  };
};
