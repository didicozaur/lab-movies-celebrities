const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

router.post("/celebrities/create", (req, res, next) => {
  const newCelebrity = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };

  Celebrity.create(newCelebrity)
    .then(() => {
      console.log("celebrity created successfully");
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log("Error creating celebrity");
      res.render("celebrities/new-celebrity.hbs");
    });
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesArr) => {
      res.render("celebrities/celebrities.hbs", {
        celebrity: celebritiesArr,
      });
    })
    .catch((err) => {
      console.log(`Error finding celebrities:`, err);
    });
});

module.exports = router;
