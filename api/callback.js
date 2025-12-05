export default async function handler(req, res) {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).json(data);
    }

    // Test if the token actually works by making a test API call
    const testResponse = await fetch('https://api.github.com/repos/simpscar/yearbook.simpsonscarborough.com', {
      headers: {
        'Authorization': `token ${data.access_token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    const testResult = await testResponse.json();
    
    // Log for debugging (will show in Vercel logs)
    console.log('Token test result:', testResponse.status, testResult);

    // Return success page with token that posts message back to opener
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authorization Complete</title>
        </head>
        <body>
          <script>
            (function() {
              function receiveMessage(e) {
                window.opener.postMessage(
                  'authorization:github:success:${JSON.stringify(data)}',
                  e.origin
                );
                window.removeEventListener("message", receiveMessage, false);
              }
              window.addEventListener("message", receiveMessage, false);
              window.opener.postMessage("authorizing:github", "*");
            })();
          </script>
          <p>Authorizing... Token test status: ${testResponse.status}</p>
          <p style="font-size: 10px;">Debug: ${JSON.stringify(testResult).substring(0, 200)}</p>
        </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
