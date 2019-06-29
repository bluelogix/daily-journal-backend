const journalRouter = require('express').Router();


const db = require('./journals-model.js');

//CRUD OPERATIONS 

//GET ARTICLES
journalRouter.get('/journals',  (req, res) => {
    db.find()
    .then(journal => {
        res.status(200).json(journal);
    })
    .catch(err => {
        res.status(500).json({ success: false, message: 'The users information could not be retrieved'})
    })
})
//GET JOURNALS FOR SPECIFIC USERS
journalRouter.get('/journals/user', (req, res) => {
    console.log(req.body.user_id)
    const id = req.body.user_id
        db.getArticleList(id)
        .then(journalsArch => {
            if(journalsArch.length > 0) {
                res.status(200).json(journalsArch)
            } else {
                res.status(404).json({message: 'no journals found on user'})
            } 
        
        })
        .catch(err => {
            res.status(500).json({  success: false, error: 'error retrieving id'})
        })
    
  });

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


module.exports = journalRouter;
