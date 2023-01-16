import express from 'express';
import next from 'next';
import cookieParser from 'cookie-parser';
import db, { connectToDB } from './db';
import buildRelations from './db/buildRelations';
import logger from './utils/logger';
import authRouter from './routes/auth';
import tokensRouter from './routes/tokens';
import recipesRouter from './routes/recipes';
import categoriesRouter from './routes/categories';
import instructionsRouter from './routes/instructions';
import nutritionRouter from './routes/nutrition';
import recipePartsRouter from './routes/recipeParts';
import ingridientsRouter from './routes/ingridients';
import createSpecialIndexes from './db/createSpecialIndexes';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

(async () => {
    try {
        await connectToDB();
        logger.log('Successfully connected to the database');

        buildRelations();

        await db.sync({ logging: false, alter: true });
        await createSpecialIndexes();
        logger.log('All models were synchronized successfully');

        const nextApp = next({ dev });
        const handle = nextApp.getRequestHandler();

        nextApp.prepare().then(() => {
            const app = express();

            app.use(express.json());
            app.use(cookieParser());

            app.use('/api/auth', authRouter);
            app.use('/api/tokens', tokensRouter);
            app.use('/api/recipes', recipesRouter);
            app.use('/api/categories', categoriesRouter);
            app.use('/api/instructions', instructionsRouter);
            app.use('/api/nutrition', nutritionRouter);
            app.use('/api/recipe-parts', recipePartsRouter);
            app.use('/api/ingridients', ingridientsRouter);

            app.all('*', (req, res) => {
                return handle(req, res);
            });

            app.listen(3000, () => {
                logger.log('Server running on port ' + port);
            });
        });
    } catch (err) {
        logger.error(err);
    }
})();
