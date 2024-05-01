import express from 'express';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';

const PORT = process.env.PORT ?? 3000;
const app = express();

const limiter = rateLimit({
	windowMs: 1000,
	limit: 50,
	statusCode: 429,
	handler: (req, res, next, optionsUsed) => {
		res.status(optionsUsed.statusCode).send(`Query index: ${req.query.index}`);
	},
});

app.use('/api', cors(), limiter);

app.get('/api', (req, res) => {
	const delay = Math.floor(Math.random() * 1000) + 1;
	const requestIndex = req.query.index;

	setTimeout(() => {
		res.status(200).send(`Query index: ${requestIndex}`);
	}, delay);
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
