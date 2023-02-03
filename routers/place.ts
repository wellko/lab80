import express from "express";
import mysqlDb from "../mysqlDb";
import {items, place, placeWithOutID} from "../types";
import {ResultSetHeader} from "mysql2";

const placeRouter = express.Router();

placeRouter.get('/', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const places = await connection.query('SELECT * FROM place');
    const response = places[0] as place[];
    res.send(response);
});

placeRouter.get('/:id', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const places = await connection.query('SELECT * FROM place WHERE id = ?', [req.params.id]);
    const responses = places[0] as place[];
    const response = responses[0];
    if (!response) {
        res.status(404).send({error: 'Not found'});
    }
    res.send(response);
});

placeRouter.post('/', async (req, res) => {

    if (!req.body.name) {
        return res.status(400).send({error: 'field name required'});
    }
    const placeData: placeWithOutID = {
        name: req.body.name,
        description: req.body.description
    }
    const connection = mysqlDb.getConnection();
    const result = await connection.query(
        'INSERT INTO place (name, description) VALUES (?, ?)',
        [placeData.name, placeData.description])
    const responseInfo = result[0] as ResultSetHeader;
    res.send({...placeData, id: responseInfo.insertId} );
})

placeRouter.delete('/:id', async (req, res) => {
    const connection = mysqlDb.getConnection();
    const items = await connection.query('SELECT * FROM item WHERE place_id = ?', [req.params.id]);
    const check = items[0] as items[];
    if(check.length > 0){
        res.status(400).send({error: "can't delete this place"})
    }else {
        await connection.query('DELETE FROM category WHERE id = ?', [req.params.id]);
        res.send({response: 'place was deleted'});
    }
})


export default placeRouter;