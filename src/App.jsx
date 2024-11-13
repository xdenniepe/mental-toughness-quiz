import AppRouter from './router/router';

function App() {
  return (
    <div className="min-h-screen">
      <div className="flex justify-center mb-6 bg-[#0A235B] sticky top-0 m-0 w-full z-20">
        <img src="https://profitabletradie.com/wp-content/uploads/2023/03/logo.svg" alt="Logo" className="h-16 w-auto p-2 sticky top-0 m-0" />
      </div>
      <AppRouter />
    </div>
  );
}

export default App;
