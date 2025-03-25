import express from 'express';
import cors from 'cors';
import { users } from './users';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/users', (_req, res) => {
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});