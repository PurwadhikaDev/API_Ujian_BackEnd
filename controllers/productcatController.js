const { sqlDB } = require('../databases')

module.exports = {
    getAllProductCat: (req,res) => {
        const query = `select pc.id, pc.categoryId, pc.productId,
            p.nama, c.category
            from productcat pc 
            join products p
            on pc.productId = p.id
            join categories c
            on pc.categoryId = c.id;`
        
        sqlDB.query(query, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        });
    },
    addProductCat: (req,res) => {
        let query = `WITH RECURSIVE category_path (id, category, parentId) AS
        (
          SELECT id, category, parentId
            FROM categories
            WHERE id = ${req.body.categoryId}
          UNION ALL
          SELECT c.id, c.category, c.parentId
            FROM category_path AS cp JOIN categories AS c
              ON cp.parentId = c.id
        )
        SELECT id FROM category_path;`
        sqlDB.query(query, (err,results) => {
            if(err) {
                return res.status(500).send(err)
            }
            var data = results.map((item) => {
                return [item.id, req.body.productId]
            })

            query = `INSERT INTO productcat (categoryId,productId) VALUES ? ;`

            sqlDB.query(query, [data], (err,results) => {
                if(err) {
                    return res.status(500).send(err)
                }

                res.status(200).send(results)
            })
        })
    },
    editProductCat: (req,res) => {
        const query = `UPDATE productcat SET ? WHERE id = ${sqlDB.escape(req.params.id)}`

        sqlDB.query(query, req.body, (err,results) => {
            if(err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        })
    },
    deleteProductCat: (req,res) => {
        const query = `DELETE FROM productcat WHERE productId = ${sqlDB.escape(req.params.id)}`;
        
        sqlDB.query(query,(err,results) => {
            if(err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        })
    }
}