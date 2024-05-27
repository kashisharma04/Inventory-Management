import React from 'react';
import Admin from './Components/Admin';
import User from './Components/User';
import Product from './Components/Product';

function App() {
  const [selectedComponent, setSelectedComponent] = React.useState(null);

  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <button onClick={() => handleSelectComponent('admin')}>Admin</button>
        <button onClick={() => handleSelectComponent('user')}>User</button>
        <button onClick={() => handleSelectComponent('product')}>Product</button>
      </nav>
      {selectedComponent === 'admin' && <Admin />}
      {selectedComponent === 'user' && <User />}
      {selectedComponent === 'product' && <Product />}
      <h2>Categories</h2>
      {/* Render your categories component here */}
      <h2>Total Products: {/* Render your total products count here */}</h2>
      <h2>Low Stock: {/* Render your low stock products here */}</h2>
    </div>
  );
}

export default App;