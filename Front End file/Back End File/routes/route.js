//const { response, request } = require("express");
//const { request } = require("express");
const express = require("express");
const router = express.Router();
const signUpTemplateCopy = require("../moduls/SignUpModuls");
const Joi = require("joi");

const { userRegVadilation } = require("../helper");

router.post("/signup", async (request, response) => {
  const { error } = userRegVadilation(request.body);
  // let error;
  if (error) {
    // console.log(error);
    return response.json({ seccess: false, messeg: error.details[0].message });
  } else {
    const signedUpUser = await new signUpTemplateCopy({
      fullName: request.body.fullName,
      username: request.body.username,
      email: request.body.email,
      password: request.body.password,
    });

    await signedUpUser.save();
    try {
      await signedUpUser.save().then((data2) => {
        response.json({ seccess: true, messeg: "done" });
      });
    } catch (error) {
      response.json({ seccess: false, messeg: error });
    }
  }
});

router.get("/signup", (request, response) => {
  response.send("sdsds");
});

router.post("/login", async (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  const user = await signUpTemplateCopy.findOne({ email: email });

  if (user) {
    if (user.password == password) {
      response.json({ success: true, messeg: user });
    } else {
      response.json({ success: false, messeg: "in valid password" });
    }
  } else {
    response.json({ success: false, messeg: "user is not registered" });
  }
});

router.get("/Login", (request, response) => {
  response.send("sdsds");
});

module.exports = router;
