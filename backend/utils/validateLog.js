module.exports = function validateLog(log) {
  const requiredFields = [
    'level', 'message', 'resourceId', 'timestamp',
    'traceId', 'spanId', 'commit', 'metadata'
  ];

  const validLevels = ['error', 'warn', 'info', 'debug'];

  for (let field of requiredFields) {
    if (!(field in log)) {
      return false;
    }
  }

  if (!validLevels.includes(log.level)) {
    return false;
  }

  return true;
};
