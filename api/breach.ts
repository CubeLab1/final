import { NextApiRequest, NextApiResponse } from 'next';

// Example dataset of breached emails (replace with a real database in production)
const breachedEmails = new Set([
    'example1@gmail.com',
    'test.user@yahoo.com',
    'breached@domain.com',
]);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Only GET requests are allowed.' });
    }

    const { email } = req.query;

    if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'Email parameter is required and must be a valid string.' });
    }

    const isBreached = breachedEmails.has(email.toLowerCase());

    return res.status(200).json({
        email,
        breached: isBreached,
        message: isBreached
            ? 'This email has been found in a data breach. Consider changing your password.'
            : 'This email is not found in known breaches.',
    });
}
