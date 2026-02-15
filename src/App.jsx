import { BrowserRouter, Routes, Route } from 'react-router';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import RecipeBuilder from './pages/RecipeBuilder';
import User from './pages/User';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="recipebuilder" element={<RecipeBuilder />} />
                    <Route path="user" element={<User />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
