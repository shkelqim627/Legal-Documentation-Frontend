# Environment Variables Setup

## Required Environment Variable

The frontend requires the following environment variable to connect to the backend API:

```
REACT_APP_API_URL=https://legal-documentation-backend-wfkp.onrender.com
```

## Setup Instructions

### For Local Development

1. Create a `.env` file in the root of the frontend directory (same level as `package.json`):

```bash
cd frontend
echo "REACT_APP_API_URL=https://legal-documentation-backend-wfkp.onrender.com" > .env
```

Or manually create `.env` with:
```
REACT_APP_API_URL=https://legal-documentation-backend-wfkp.onrender.com
```

### For Production Deployment

1. **Vercel**: Add the environment variable in your Vercel project settings:
   - Go to Project Settings → Environment Variables
   - Add `REACT_APP_API_URL` with value `https://legal-documentation-backend-wfkp.onrender.com`
   - Apply to Production, Preview, and Development environments

2. **Netlify**: Add in Site Settings → Environment Variables:
   - Key: `REACT_APP_API_URL`
   - Value: `https://legal-documentation-backend-wfkp.onrender.com`

3. **Other Platforms**: Set the environment variable in your deployment platform's configuration.

## Important Notes

- React requires environment variables to be prefixed with `REACT_APP_` to be accessible in the browser
- After adding/changing environment variables, you must **restart the development server** for changes to take effect
- For production builds, environment variables are embedded at build time
- The `.env` file should be in `.gitignore` (already configured) to avoid committing sensitive data

## Verification

After setting up the environment variable, you can verify it's working by:

1. Starting the development server: `npm start`
2. Opening the browser console
3. Checking that API calls are made to: `https://legal-documentation-backend-wfkp.onrender.com/api/generate`

## Troubleshooting

If the frontend is not connecting to the backend:

1. Verify the `.env` file exists and contains the correct variable
2. Restart the development server after creating/modifying `.env`
3. Check browser console for CORS errors (backend should allow your frontend origin)
4. Verify the backend URL is accessible: `curl https://legal-documentation-backend-wfkp.onrender.com/api/health`

