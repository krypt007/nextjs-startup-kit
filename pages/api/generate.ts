// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
  

  res.status(200).json({ result: 'welcome' });
  // res.status(200).json({ result: response.data.choices });
}