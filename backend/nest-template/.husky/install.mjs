// 在 CI 环境中跳过 Husky 的安装
if (process.env.CI) {
  process.exit(0);
}
const husky = (await import('husky')).default;
husky();