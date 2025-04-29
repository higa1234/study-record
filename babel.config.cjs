module.exports = {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      ['@babel/preset-react', { runtime: 'automatic' }],
      [
        'babel-preset-vite',
        {
          env: true,   // Vite 用の import.meta.env などを展開
          glob: false, // import.meta.glob は使わないなら false
        },
      ],
    ],
    plugins: ['babel-plugin-transform-import-meta'],
  };
  