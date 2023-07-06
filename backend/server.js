import express from 'express';
import cors from 'cors';

const server = express();
server.use(express.json());
server.use(cors());

const products = [];

server.get('/products', (req, res) => {
    console.log("Products are returned.");
    res.send(JSON.stringify(products));
});

server.get('/products/:id', (req, res) => {
    const index = search(products, req.params.id);

    if(index == -1){
        console.log("ID is unavailable.");
        res.send("ID not found.");
    }else{
        const returnProduct = JSON.stringify(Object.values(products[index]));
        console.log(returnProduct);
        res.send(returnProduct);
    }
});

server.post('/create', (req, res) => {
    const newProduct = req.body;
    let idNumber = products.length;
    const id = (idNumber + "--" + newProduct.name.trim().toLowerCase())
    products.push({[id]: newProduct});
    console.log(products);
    res.send(`New product ${JSON.stringify(newProduct)} has been added.`);
});

server.put('/update/:id', (req, res) => {
    const index = search(products, req.params.id);
    const newId = req.params.id.split("--")[0] + "--" + req.body.name;
    products[index] = { [newId] : req.body }

    console.log("Update completed.");
    res.send(`Product was updated successfully.`);
});

server.delete('/delete/:id', (req, res) => {
    const index = search(products, req.params.id);
    products.splice(index, index);
    console.log("Delete completed.");
    res.send(`Product successfully removed!`);
});

server.listen("8080", () => {
    console.log("Server is listening on port 8080")
});

function search(array, id){
    const index = array.map( e => Object.keys(e)[0])
        .findIndex( i => i == id);
    return index;
}
