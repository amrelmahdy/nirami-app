

export const isTokenExpired = (expiresAt) =>  {
  const now = Date.now() / 1000; // in seconds
  return expiresAt < now;
}