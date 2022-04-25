import { Box,  Button,  makeStyles } from '@material-ui/core'

import './index.css'
import { Provider } from 'react-redux';
import { AppRouter } from './Routes/AppRouter';
import { store } from './Redux/store';
import { QueryClient, QueryClientProvider } from 'react-query';


const useStyles = makeStyles((theme) => ({
    root:{
      backgroundColor : theme.palette.primary.main
    }
}))
 
const queryClient = new QueryClient()
function App() {

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </Provider>
  )
}

export default App
