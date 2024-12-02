import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return res.status(200).json({ message: "API is working!", password: "MockPassword123!" });
    }
    res.status(405).json({ error: "Method not allowed" });
}
