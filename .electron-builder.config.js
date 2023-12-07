if (process.env.VITE_APP_VERSION === undefined) {
  const now = new Date;
  process.env.VITE_APP_VERSION = `${now.getUTCFullYear() - 2000}.${now.getUTCMonth() + 1}.${now.getUTCDate()}-${now.getUTCHours() * 60 + now.getUTCMinutes()}`;
}

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  directories: {
    output: 'dist',
    buildResources: 'buildResources',
  },
  files: [
    'packages/**/dist/**',
  ],
  extraMetadata: {
    version: process.env.VITE_APP_VERSION,
  },
  mac: {
    target: [ // 要打的包的格式类型设置
        'dmg',
        'zip' // 这里注意更新的时候，mac只认zip格式的包
    ], 
  },
  win: {
    target: [
        {
          // 打包成一个独立的 exe 安装程序
          target: 'nsis',
          // 这个意思是打出来32 bit + 64 bit的包，但是要注意：这样打包出来的安装包体积比较大，所以建议直接打32的安装包。
          arch: [
          // 'x64',
            'ia32'
          ]
        }
    ],
  },
};

module.exports = config;
