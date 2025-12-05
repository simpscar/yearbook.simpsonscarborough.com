export default async function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  
  if (!clientId) {
    return res.status(500).json({ error: 'OAuth not configured' });
  }

  // Request both repo and read:org scopes to ensure org access
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,read:org&redirect_uri=${encodeURIComponent('https://yearbook.simpsonscarborough.com/api/callback')}`;
  
  res.redirect(authUrl);
}
