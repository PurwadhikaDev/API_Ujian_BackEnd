const { sqlDB } = require('../databases')

module.exports = {
    getAllCategory: (req,res) => {
        const query = `SELECT * 
            FROM category_complete;`
        
        sqlDB.query(query, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        });
    },
    getAllLeafCategory: (req,res) => {
        const query = `SELECT
            c1.id, c1.category
        FROM
            categories c1
                LEFT JOIN
            categories c2 ON c2.parentId = c1.id
        WHERE
            c2.id IS NULL;`
        
        sqlDB.query(query, (err, results) => {
            if (err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        });
    },
    addCategory: (req,res) => {
        let query = `SELECT id 
                FROM categories 
                WHERE category = ${sqlDB.escape(req.body.category)};`;
        sqlDB.query(query, (err,results) => {
            if(err) {
                return res.status(500).send(err)
            }
            
            if(results.length > 0) {
                return res.status(500).send({ message: 'Category name already exist!'})
            }
            
            query = `INSERT INTO categories SET ? ;`

            sqlDB.query(query, req.body, (err,results) => {
                if(err) {
                    return res.status(500).send(err)
                }

                res.status(200).send(results)
            })
        })    
    },
    editCategory: (req,res) => {
        const query = `UPDATE categories SET ? WHERE id = ${sqlDB.escape(req.params.id)}`

        sqlDB.query(query, req.body, (err,results) => {
            if(err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        })
    },
    deleteCategory: (req,res) => {
        const query = `DELETE FROM categories WHERE id = ${sqlDB.escape(req.params.id)}`;
        
        sqlDB.query(query,(err,results) => {
            if(err) {
                return res.status(500).send(err)
            }

            res.status(200).send(results)
        })
    }
}