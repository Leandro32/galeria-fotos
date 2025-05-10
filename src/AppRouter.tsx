import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { withErrorHandling } from './components/routing/withErrorHandling';

const AppRouter = () => {
  return withErrorHandling(<RouterProvider router={router} />);
};

export default AppRouter; 