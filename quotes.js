const express = require('express');
const { quotes } = require('./data');

quotesRouter = express.Router();

quotesRouter.get('/random', (req, res, next) => {
    res.send({quote:quotes[Math.floor((Math.random()*quotes.length)-1)]});
});

quotesRouter.get('/', (req, res, next) => {
    req.query.person ? res.send({quotes: quotes.filter(element => element.person === req.query.person)} ) : res.send({quotes});   
});

quotesRouter.post('/', (req, res, next) => {
    if(req.query.quote && req.query.person){
        const receivedQuote = {
            'quote' : req.query.quote,
            'person': req.query.person
        }   
        quotes.push(receivedQuote);
        res.status(201).send({quote: receivedQuote});
    } else {
        res.status(400).send();
    }

});

module.exports = quotesRouter;