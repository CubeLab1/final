import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Only GET requests are allowed.' });
    }

    const { input, algorithm = 'sha256' } = req.query;

    if (!input || typeof input !== 'string') {
        return res.status(400).json({ error: 'Input parameter is required and must be a string.' });
    }

    const supportedAlgorithms = ['sha256', 'sha1', 'md5'];
    if (!supportedAlgorithms.includes(algorithm as string)) {
        return res.status(400).json({
            error: `Invalid algorithm. Supported algorithms are: ${supportedAlgorithms.join(', ')}.`,
        });
    }

    try {
        const hash = crypto.createHash(algorithm as string).update(input).digest('hex');
        return res.status(200).json({
            input,
            algorithm,
            hash,
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to generate hash.' });
    }
}
