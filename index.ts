import express = require("express");
import cors = require("cors");
import mysqlDb from "./mysqlDb";
import categoryRouter from "./routers/category";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use('/categories', categoryRouter);
app.use(express.static('public'));

const run = async () => {
	await mysqlDb.init();
	app.listen(port, () => {
		console.log(`Server started on ${port} port!`);
	});
};

run().catch(console.error);