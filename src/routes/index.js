import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializedb from '../db';
import restaurant from '../controller/foodtruck';

//instance of express
let router = express();

//connect to db
//a function is created inside initializedb called db
initializedb(db=>{
  //internal middlewares
  //after connecting to the database create routes
  //this route goes to the restaurant controller and runs the function in there
  router.use('/foodtruck', restaurant({config,db}));

});

export default router;

//same thing as writing

// initializedb(function(db){
//
// })
