const { sqlDB } = require('../databases')

module.exports = {
    getAllProduct: (req,res) => {
        const query = `SELECT * 
            FROM products;`
        
        sqlDB.query(query, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        });
    },
    addProduct: (req,res) => {
        let query = `SELECT id 
                FROM products 
                WHERE nama = ${sqlDB.escape(req.body.nama)};`;
        sqlDB.query(query, (err,results) => {
            if(err) {
                return res.status(500).send(err)
            }
            
            if(results.length > 0) {
                return res.status(500).send({ message: 'Product name already exist!'})
            }
            
            query = `INSERT INTO products SET ? ;`

            sqlDB.query(query, req.body, (err,results) => {
                if(err) {
                    return res.status(500).send(err)
                }

                res.status(200).send(results)
            })
        })    
    },
    editProduct: (req,res) => {
        const query = `UPDATE products SET ? WHERE id = ${sqlDB.escape(req.params.id)}`

        sqlDB.query(query, req.body, (err,results) => {
            if(err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        })
    },
    deleteProduct: (req,res) => {
        const query = `DELETE FROM products WHERE id = ${sqlDB.escape(req.params.id)}`;
        
        sqlDB.query(query,(err,results) => {
            if(err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        })
    }
}