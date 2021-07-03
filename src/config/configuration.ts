const { JWT_SECRET_KEY, PORT, AUTH_MODE } = process.env;

export default () => ({
  PORT: parseInt(PORT, 10) || 4000,
  JWT_SECRET_KEY: JWT_SECRET_KEY ?? 'secret-key',
  AUTH_MODE: AUTH_MODE === 'true',
});
