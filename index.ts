import express = require("express");
import cors = require("cors");
import mysqlDb from "./mysqlDb";
import categoryRouter from "./routers/category";
import placeRouter from "./routers/place";
import itemsRouter from "./routers/items";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use('/categories', categoryRouter);
app.use('/places', placeRouter);
app.use('/items', itemsRouter);
app.use(express.static('public'));

const run = async () => {
	await mysqlDb.init();
	app.listen(port, () => {
		console.log(`Server started on ${port} port!`);
	});
};

run().catch(console.error);