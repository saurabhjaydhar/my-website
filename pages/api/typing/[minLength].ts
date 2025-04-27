import type { NextApiRequest, NextApiResponse } from 'next';

interface QuoteResponse {
  quote: string;
  authorSlug: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuoteResponse | { error: string }>
) {
  const minLength = req.query.minLength?.toString() || '100'; // Default to 100 if not provided
  
  try {
    const response = await fetch(`https://api.quotable.io/random?minLength=${minLength}`);
    const data = await response.json();
    res.status(200).json({ quote: data.content, authorSlug: data.authorSlug });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
}