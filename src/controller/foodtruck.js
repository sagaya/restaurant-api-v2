import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../model/foodtruck';
import Review from '../model/review';


export default ({config,db}) =>{
  let api = Router()
  // for v1/foodtruck/add
  //CREATE-
  api.post('/add', (req,res)=>{
    let newFoodTruck = new FoodTruck();
    newFoodTruck.name = req.body.name;
    newFoodTruck.foodtype = req.body.foodtype;
    newFoodTruck.avgCost = req.body.avgCost;
    newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;
    newFoodTruck.save(err=>{
      if (err) {
        res.send(err);
      }else {
        res.json({message: 'FoodTruck saved successfully'});
      }
    })
  })

  //read- part /v1/foodtruck
  api.get('/', (req,res)=>{
    FoodTruck.find({}, (err,foodtrucks)=>{
      if (err) {
        res.send(err);
      }else {
        res.json(foodtrucks);
      }
    });
  });

  //search
  //read- /v1/foodtruck/:id
  api.get('/:id', (req,res)=>{
    FoodTruck.findById(req.params.id, (err,foodtruck)=>{
      if (err) {
        res.send(err)
      }else {
        res.json(foodtruck);
      }
    });

  });

  //PUT- /V1/foodtruck/:ID
  api.put('/:id', (req,res)=>{
    FoodTruck.findById(req.params.id, (err,foodtruck)=>{
      if (err) {
        res.send(err);
      }else {
        foodtruck.name = req.body.name;
        foodtruck.save(err => {
          if (err) {
            res.send(err)
          }else{
            res.json({message:"FoodTruck info updated"});
          }
        });
      }
    })
  });
  //DELETE- V1/FoodTruck/:ID
  api.delete('/:id', (req,res)=>{
    FoodTruck.remove({
      _id: req.params.id
    },(err, foodtruck)=>{
      if (err) {
        res.send(err)
      }else {
        res.json({message:`FoodTruck  successfully removed`})
      }

    });
  });
  //add a review for a specific foodtruck
  // v1/foodtruck/reviews/add/:id
  api.post('/reviews/add/:id', (req,res)=>{
    FoodTruck.findById(req.params.id, (err,foodtruck)=>{
      if (err) {
        res.send(err)
      }else {
        let newReview = new Review();
        newReview.title = req.body.title
        newReview.text = req.body.text
        newReview.foodtruck = foodtruck._id
        newReview.save((err, review)=>{
          if (err) {
            res.send(err);
          }else {
            //push the review to the review array for a particular foodtruck
            foodtruck.reviews.push(newReview);
            foodtruck.save((err)=>{
              if (err) {
                res.send(err);
              }else {
                res.json({message: "Foodtruck review saved"});
              }
            });
          }
        });
      }
    })
  });

  //get review for a specifc foodtruck id
  // v1/foodtruck/reviews/:id

  api.get('/reviews/:id', (req,res)=>{
    // will find the foodtruck of the id
    Review.find({foodtruck: req.params.id}, (err, reviews)=>{
      if (err) {
        res.send(err);
      }else {
        res.json(reviews)
      }
    })
  });
  //get all foodtruck with a particular type
  api.get('/foodtype/:foodtype', (req,res)=>{
    FoodTruck.find({foodtype: req.params.foodtype}, (err, foodtruck)=>{
      if (err) {
        res.send(err);
      }else {
        res.json(foodtruck)
      }
    })
  })

  return api;
}
