import { Router } from 'express';
import Index from '../controllers';
import Users from '../controllers/userController';


const router = Router();

// router.get('/', (req, res) => {
//   res.send('hello tdd');
// });

const routes = () => {
  router.get('/', Index.home);
  router.get('/api/v1', Index.v1);
  // Signup routes
  router.post('/api/v1/auth/signup', Users.signup);
};

routes();

export default router;
