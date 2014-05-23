var express = require('express');
var router = express.Router();

var postController = require('../controllers/post_controller');
var userController = require('../controllers/user_controller');
var sessionController = require('../controllers/session_controller');
var commentController = require('../controllers/comment_controller');
var attachmentController = require('../controllers/attachment_controller');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

/* Rutas de sesiones */

router.get('/login',  sessionController.new); 
                     // obtener el formulario a rellenar para hacer login. 
router.post('/login', sessionController.create); 
                     // enviar formulario para crear la sesión.
router.get('/logout', sessionController.destroy); 
                     // destruir la sesión actual.

/* Autoloading */

router.param('postid',postController.load);  // autoload :postid
router.param('userid', userController.load); // autoload :userid
router.param('commentid', commentController.load); // autoload :commentid
router.param('attachmentid', attachmentController.load); // autoload :attachmentid

/* Rutas de las imagenes adjuntas */

router.get('/posts/:postid([0-9]+)/attachments', 
  attachmentController.index);

router.get('/posts/:postid([0-9]+)/attachments/new', 
  sessionController.loginRequired,
  postController.loggedUserIsAuthor,
  attachmentController.new);

router.post('/posts/:postid([0-9]+)/attachments', 
   sessionController.loginRequired,
   postController.loggedUserIsAuthor,
   attachmentController.create);

router.delete('/posts/:postid([0-9]+)/attachments/:attachmentid([0-9]+)', 
     sessionController.loginRequired,
     postController.loggedUserIsAuthor,
     attachmentController.destroy);

/* Rutas de Comentarios */

router.get('/posts/:postid([0-9]+)/comments', 
  commentController.index);

router.get('/posts/:postid([0-9]+)/comments/new', 
  sessionController.loginRequired,
  commentController.new);

router.get('/posts/:postid([0-9]+)/comments/:commentid([0-9]+)',
  commentController.show);

router.post('/posts/:postid([0-9]+)/comments', 
   sessionController.loginRequired,
   commentController.create);

router.get('/posts/:postid([0-9]+)/comments/:commentid([0-9]+)/edit', 
  sessionController.loginRequired,
  commentController.loggedUserIsAuthor,
  commentController.edit);

router.put('/posts/:postid([0-9]+)/comments/:commentid([0-9]+)', 
  sessionController.loginRequired,
  commentController.loggedUserIsAuthor,
  commentController.update);

router.delete('/posts/:postid([0-9]+)/comments/:commentid([0-9]+)', 
     sessionController.loginRequired,
     commentController.loggedUserIsAuthor,
     commentController.destroy);

/* Rutas de Posts */

router.get('/posts',  postController.paginateIndex,
                      postController.index);
router.get('/posts/new', sessionController.loginRequired,
                         postController.new);
router.get('/posts/:postid([0-9]+)', postController.paginateShow,
                                     postController.show);
router.post('/posts', sessionController.loginRequired,
                      postController.create);
router.get('/posts/:postid([0-9]+)/edit', sessionController.loginRequired,
                                          postController.loggedUserIsAuthor,
                                          postController.edit);
router.put('/posts/:postid([0-9]+)', sessionController.loginRequired,
                                     postController.loggedUserIsAuthor,
                                     postController.update);
router.delete('/posts/:postid([0-9]+)', sessionController.loginRequired,
                                        postController.loggedUserIsAuthor,
                                        postController.destroy);

/* Rutas de Users */

router.get('/users',  userController.paginateIndex,
                      userController.index);
router.get('/users/new', userController.new);
router.get('/users/:userid([0-9]+)', userController.show);
router.post('/users', userController.create);
router.get('/users/:userid([0-9]+)/edit', sessionController.loginRequired,
                                          userController.loggedUserIsUser,
                                          userController.edit);
router.put('/users/:userid([0-9]+)', sessionController.loginRequired,
                                     userController.loggedUserIsUser,
                                     userController.update);
// router.delete('/users/:userid([0-9]+)', sessionController.loginRequired,
//                                         userController.destroy);



module.exports = router;
