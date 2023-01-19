import Content from './Componenet/Content';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Product from './Componenet/Product';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element = {<Content />} />
        <Route path='/product' element = {<Product />} />
      </Routes>
    </div>
  );
}

export default App;
