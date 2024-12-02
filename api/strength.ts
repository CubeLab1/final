import { NextApiRequest, NextApiResponse } from 'next';

function testPasswordStrength(password: string): { score: number; feedback: string[] } {
    let score = 0;
    const feedback = [];

    // Criteria for password strength
    if (password.length >= 12) score++;
    else feedback.push('Increase password length to at least 12 characters.');

    if (/[A-Z]/.test(password)) score++;
    else feedback.push('Add uppercase letters.');

    if (/[a-z]/.test(password)) score++;
    else feedback.push('Add lowercase letters.');

    if (/\d/.test(password)) score++;
    else feedback.push('Add numbers.');

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    else feedback.push('Add special characters.');

    if (!/(.)\1{2,}/.test(password)) score++;
    else feedback.push('Avoid using repeated characters.');

    return { score, feedback };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Only GET requests are allowed.' });
    }

    const { password } = req.query;

    if (!password || typeof password !== 'string') {
        return res.status(400).json({ error: 'Password parameter is required and must be a string.' });
    }

    const result = testPasswordStrength(password);
    return res.status(200).json(result);
}
