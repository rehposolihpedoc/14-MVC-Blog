const router = require('express').Router();
const { User } = require('../../models');

//NEW USER
router.post('/', async (req, res) => {
 try {
     //OBJECTS CREATED & STORED IN DB
    const userDataDB = await User.create(req.body);
  // SESSIONS SETUP 
  req.session.save(() => {
    req.session.user_id = userDataDB.id;
    req.session.logged_in = true;
    
    res.status(200).json(userDataDB);
  });
} catch (err) {
    res.status(400).json(err);
}
});


//LOGIN
router.post('/login', async (req, res) => {
    try {
        // look up user in database
        const userDataDB = await User.findOne({
          where: {
            email: req.body.email,
          },
        });
        if (!userDataDB) {
          res.status(400).json({ message: 'Please try again! Incorrect email or password' });
          return;
        }
        const validPassword = await userDataDB.checkPassword(req.body.password);

        if(!validPassword) {
            res.status(400).json({ message: 'Please try again! Incorrect email or password' });
            return;
        }
          // UPON SUCCESSFUL LOGIN: set up logged_in status in sessions
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.status(200).json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
});   




//LOGOUT
router.post('/logout', (req, res) => {
if (req.session.logged_in) {
    req.session.destroy(() => {
        res.status(200).end();
    });
} else {
 res.status(404).end();
}

}); 


module.exports = router;