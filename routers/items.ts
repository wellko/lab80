import express from "express";
import mysqlDb from "../mysqlDb";
import {categories, items, itemsData, itemsWithOutId, place} from "../types";
import {imagesUpload} from "../multer";
import {ResultSetHeader} from "mysql2";

const itemsRouter = express.Router();

itemsRouter.get('/', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const items = await connection.query('SELECT * FROM item');
    const response = items[0] as items[];
    let responseData: itemsData[] = [];
    response.map(element => {
        responseData.push({
            id: element.id,
            name: element.name,
            category_id: element.category_id,
            place_id: element.place_id
        })
        res.send(responseData);
    })
});

itemsRouter.get('/:id', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const places = await connection.query('SELECT * FROM item WHERE id = ?', [req.params.id]);
    const responses = places[0] as place[];
    const response = responses[0];
    if (!response) {
        res.status(404).send({error: 'Not found'});
    }
    res.send(response);
});

itemsRouter.post('/', imagesUpload.single('photo'), async (req, res) => {
    const connection = mysqlDb.getConnection();
    if (!req.body.name) {
        return res.status(400).send({error: 'field name required'});
    }
    if (!req.body.category_id) {
        return res.status(400).send({error: 'field category required'});
    }
    if (!req.body.place_id) {
        return res.status(400).send({error: 'field place required'});
    }
    const itemsData: itemsWithOutId = {
        name: req.body.name,
        category_id: req.body.category_id,
        place_id: req.body.place_id,
        description: req.body.description,
        photo: req.file ? req.file.filename : null,
    }

    const result = await connection.query(
        'INSERT INTO item (name, description, category_id, place_id, photo) VALUES (?, ?, ? ,? ,?)',
        [itemsData.name, itemsData.description, itemsData.category_id, itemsData.place_id, itemsData.photo]);
    const responseInfo = result[0] as ResultSetHeader;
    res.send({...itemsData, id: responseInfo.insertId});
});

itemsRouter.delete('/:id', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const item = await connection.query('SELECT * FROM item WHERE id = ?', [req.params.id]);
    const foundItems = item[0] as items[];
    const foundItem = foundItems[0];
    const categories = await connection.query('SELECT * FROM category WHERE id = ?', [foundItem.category_id]);
    const categoryCheck = categories[0] as categories[];
    const places = await connection.query('SELECT * FROM place WHERE id = ?', [foundItem.place_id]);
    const placeCheck = places[0] as place[];
    if (categoryCheck.length > 0) {
        res.status(404).send({error: 'Cant delete this item'});
    } else if (placeCheck.length > 0){
        res.status(404).send({error: 'Cant delete this item'});
    }else {
        await connection.query('DELETE FROM category WHERE id = ?' , [req.params.id]);
        res.send({response: 'Item was deleted'});
    }
});

export default itemsRouter