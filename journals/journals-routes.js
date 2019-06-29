const journalRouter = require('express').Router();


const db = require('./journals-model.js');

//CRUD OPERATIONS 

//GET ARTICLES
journalRouter.get('/journals',   (req, res) => {
    db.find()
    .then(journal => {
        res.status(200).json(journal);
    })
    .catch(err => {
        res.status(500).json({ success: false, message: 'The users information could not be retrieved'})
    })
})

//POST ARTICLES
journalRouter.post('/journals',  (req, res) => {
    let name = req.body
    db
    .insert(name)
    .then(article => {
        res.status(200).json({message: 'successful', article});
    })
    .catch(err => {
        res.status(err.code).json()
    })
  })

////DELETE ARTICLES
  journalRouter.delete('/journals/:id', (req, res) => {
    const {id} = req.params;
    db.
    remove(id)
    .then(journal => {
        if (journal) {
            res.status(204).end();
        } else {
            res.status(404).json({ success: false, message: "The journal with the specified ID does not exist." });
        }
    })
        .catch(err => {
            res.status(500).json({ error: "The article could not be removed" })  
    })
})

// // PUT 
journalRouter.put('/journals/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.update(id, changes)
    .then(journalUpdate => {
        if( !journalUpdate) {
            res.status(404).json({ success: false, message: 'The journal with the specified ID does not exist.' })
        }  else if ( !changes ) {
            return res.status(400).json({  success: false, errorMessage: 'Please provide info for the journal.' })

        }
         else {
            return res.status(200).json({ success: true, changes })
        }
    })
    .catch(err => {
        res.status(500).json({  success: false, error: 'The journal information could not be modified'})
    })
})


// //GET FOR A SPECIFIC USER 
// //IN REACT PORTION THE ID WILL BE DYNAMIC 
// journalRouter.get('/articles/user', (req, res) => {
//     console.log(req.body.user_id)
//     const id = req.body.user_id
//         db.getArticleList(id)
//         .then(userArticle => {
//             if(userArticle.length > 0) {
//                 res.status(200).json(userArticle)
//             } else {
//                 res.status(404).json({message: 'no articles found on user'})
//             } 
        
//         })
//         .catch(err => {
//             res.status(500).json({  success: false, error: 'error retrieving id'})
//         })
    
//   });

module.exports = journalRouter;


//  //DELETE ARTICLES
//  router.delete('/:id', (req, res) => {
//     const {id} = req.params;
//     db.
//     remove(id)
//     .then(data => {
//         if (data) {
//             res.status(204).end();
//         } else {
//             res.status(404).json({ success: false, message: "The survey with the specified ID does not exist." });
//         }
//     })
//         .catch(err => {
//             res.status(500).json({ error: "The survey could not be removed" })  
//     })
// })