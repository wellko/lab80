import express from "express";
import mysqlDb from "../mysqlDb";
import {categories, categoriesData, categoriesWithOutId, items} from "../types";
import {ResultSetHeader} from "mysql2";

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const categories = await connection.query('SELECT * FROM category');
    const response = categories[0] as categories[];
    let responseData: categoriesData[] = [];
    response.map(element => {
        responseData.push({id: element.id, name: element.name})
    })
    res.send(responseData);
});

categoriesRouter.get('/:id', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const categories = await connection.query('SELECT * FROM category WHERE id = ?', [req.params.id]);
    const responses = categories[0] as categories[];
    const response = responses[0];
    if (!response) {
        res.status(404).send({error: 'Not found'});
    }
    res.send(response);
});

categoriesRouter.post('/', async (req, res) => {

    if (!req.body.name) {
        return res.status(400).send({error: 'field name required'});
    }
    const categoryData: categoriesWithOutId = {
        name: req.body.name,
        description: req.body.description
    }
    const connection = mysqlDb.getConnection();
    const result = await connection.query(
        'INSERT INTO category (name, description) VALUES (?, ?)',
        [categoryData.name, categoryData.description])
    const responseInfo = result[0] as ResultSetHeader;
    res.send({...categoryData, id: responseInfo.insertId});
})

categoriesRouter.delete('/:id', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const items = await connection.query('SELECT * FROM item WHERE category_id = ?', [req.params.id]);
    const check = items[0] as items[];
    if (check.length > 0) {
        res.status(400).send({error: "can't delete this category"})
    } else {
        await connection.query('DELETE FROM category WHERE id = ?', [req.params.id]);
        res.send({response: 'category was deleted'});
    }
})


export default categoriesRouter;