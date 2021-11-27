import fs from "fs"
import matter from "gray-matter"

import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
	res.status(200).json({ name: 'John Doe' })
}
