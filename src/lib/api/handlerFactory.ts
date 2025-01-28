// lib/api/handlerFactory.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { apiRateLimiter } from './rateLimit';

type Handler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void> | void;

interface HandlerConfig {
  methods: string[];
  authenticated?: boolean;
}

export function createHandler(
  handler: Handler,
  config: HandlerConfig = { methods: ['GET'], authenticated: false }
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Rate limiting
    const allow = await apiRateLimiter(req, res);
    if (!allow) return;

    // Method check
    if (!config.methods.includes(req.method!)) {
      res.setHeader('Allow', config.methods);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    // Authentication check
    if (config.authenticated) {
      const session = await getSession({ req });
      if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    }

    // Error handling
    try {
      await handler(req, res);
    } catch (error) {
      console.error('API Error:', error);
      Sentry.captureException(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}