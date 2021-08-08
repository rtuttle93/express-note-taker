const store = require('../db/store');
const router = require('express').Router();
const fs =  require('fs')



// GET /api/notes should read the db.json file and return all saved notes as JSON.
   router.get('/notes', (req, res) => {
        store
        .getNotes()
        .then(notes => {
            return res.json(notes)
        })
        .catch(err => res.status(500).json(err))
    })

//POST /api/notes should receive a new note to save on the request body, add it to the db.json file

router.post('/notes', (req, res) => {
    store
        .addNotes(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;