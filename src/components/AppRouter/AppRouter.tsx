import React, { FC, useState, useContext, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Layout from '../Layout/Layout';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import { authRoutes, publicRoutes } from '../../router/routes';
import { Context } from '../App/App';
import HCLoader from '../UI/Loader/HCLoader';
import { LOGIN_ROUTE } from '../../utils/const';
import { useCheckUser } from '../../service/user/userHooks';
import CreateRecipeModal from '../Modals/CreateRecipeModal/CreateRecipeModal';

export const ModalContext = createContext(null);

const AppRouter: FC = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const [isRecipeModalVisible, setIsRecipeModalVisible] = useState(false);
    const [recipeModalRecipeId, setRecipeModalRecipeId] = useState(null);
    const [recipeModalOnClose, setRecipeModalOnClose] = useState(() => () => { setIsRecipeModalVisible(false); setRecipeModalRecipeId(null); });

    const { isLoading } = useCheckUser({
        onSuccess: (data) => {
            user.setIsAuth(true);
        },
        onError: () => {
            if (!user.isAuth) navigate(LOGIN_ROUTE);
        },
    });

    if (isLoading) {
        return <div style={{ height: '100vh' }}><HCLoader /></div>;
    }
    return (
        <ModalContext.Provider value={{
            recipeModal: {
                visible: isRecipeModalVisible,
                id: recipeModalRecipeId,
                setIsRecipeModalVisible,
                setRecipeModalRecipeId,
                setRecipeModalOnClose,
            } }}
        >
            <Routes>
                { publicRoutes.map(({ path, element, index }) => (
                    <Route key={path} index={index} path={path} element={element} />
                ))}
                { user.isAuth && (
                    <Route path="/" element={<Layout />}>
                        { authRoutes.map(({ path, element, index }) => (
                            <Route key={path} index={index} path={path} element={element} />
                        ))}
                    </Route>
                )}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <CreateRecipeModal visible={isRecipeModalVisible} recipeId={recipeModalRecipeId} onClose={recipeModalOnClose} />
        </ModalContext.Provider>
    );
});

export default AppRouter;