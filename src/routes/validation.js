module.exports = {
  validateUsers(req, res, next) {
    if(req.method === "POST") {
      req.checkBody("username", "must be at least 4 characters long").isLength({min: 4});
      req.checkBody("email", "must be valid").isEmail();
      req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6});
      req.checkBody("passConfirm", "must match password provided").matches(req.body.password);
    }
    const errors = req.validationErrors();

    if(errors) {
      req.flash("error", errors);
      return(res.redirect, req.headers.referer);
    } else {
      return next();
    }

  },
  validateCheckIns(req, res, next) {
    if(req.method === "POST") {
      req.checkBody("title", "must be at least 4 characters long").isLength({min: 4});
      req.checkBody("exercise", "must be selected").exists();
      req.checkBody("feelings", "at least one feeling must be selected").exists();
    }
    const errors = req.validationErrors();

    if(errors) {
      req.flash("error", errors);
      return(res.redirect, req.headers.referer);
    } else {
      return next();
    }

  }
}
