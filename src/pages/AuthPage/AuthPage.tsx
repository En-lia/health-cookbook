import React, { FC, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Field } from 'react-final-form';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { useQueryClient } from 'react-query';
import classes from './AuthPage.module.scss';
import HCInput from '../../components/UI/Input/HCInput';
import HCButton from '../../components/UI/Button/HCButton';
import { LOGIN_ROUTE, MAIN_PAGE_ROUTE, REGISTRATION_ROUTE } from '../../utils/const';
import { useRegistration, useLogin } from '../../service/user/userHooks';
import { Context } from '../../components/App/App';
import { isEmailValid } from '../../utils/validate';
import { UserType } from '../../service/user/UserAPI';
import { OpenNotificationType } from '../../utils/types';

const AuthPage:FC = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.isAuth) {
            navigate(MAIN_PAGE_ROUTE);
        }
    }, []);

    const location = useLocation();
    const isRegistration = location.pathname === REGISTRATION_ROUTE;

    const [api, contextHolder] = notification.useNotification();
    const openNotification = ({ message, duration, description, type = 'info', onClose }: OpenNotificationType) => {
        api[type]({
            message,
            description,
            type,
            placement: 'bottom',
            onClose,
            duration,
        });
    };

    const client = useQueryClient();
    const { mutate: registration } = useRegistration(
        {
            onSuccess: () => {
                client.invalidateQueries('user');
                user.setIsAuth(true);
                openNotification({
                    message: 'Регистрация прошла успешно. Вы будете перенаправлены на главную страницу...',
                    type: 'success',
                    onClose: () => navigate(MAIN_PAGE_ROUTE),
                    duration: 1.5,
                });
            },
            onError: (e) => {
                const { message } = e.response.data;
                openNotification({ message, type: 'error' });
            },
        });

    const { mutate: login } = useLogin(
        {
            onSuccess: () => {
                client.invalidateQueries('user');
                user.setIsAuth(true);
                navigate(MAIN_PAGE_ROUTE);
            },
            onError: (e) => {
                const { message } = e.response.data;
                openNotification({ message, type: 'error' });
            },
        });

    const onSubmit = async ({ email, password, name }: Omit<UserType, 'id'>) => {
        if (isRegistration) {
            registration({ email, password, name });
        } else {
            login({ email, password });
        }
    };

    const validate = (values: Omit<UserType, 'id'>) => {
        const errors: {
            email?: string,
            password?: string,
            name?: string,
        } = {};
        if (!values.email) {
            errors.email = 'Поле не может быть пустым';
        }

        if (!isEmailValid(values.email)) {
            errors.email = 'Некорректные данные почты';
        }

        if (!values.password) {
            errors.password = 'Поле не может быть пустым';
        }

        if (values.password?.length < 8) {
            errors.password = 'Пароль должен содержать не менее 8 символов';
        }

        if (isRegistration && !values.name) {
            errors.name = 'Поле не может быть пустым';
        }

        if (isRegistration && values.name?.length > 25) {
            errors.name = 'Имя не должно содержать больше 25 символов';
        }

        return errors;
    };

    return (
        <div className={classes.authPage}>
            {contextHolder}
            <div className={classes.authPageWrapper}>
                <h2 className={classes.authPageTitle}>{isRegistration ? 'Регистрация' : 'Авторизация'}</h2>
                <Form
                    initialValues={{ email: '', password: '', name: '' }}
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <div className={classes.authPageBody}>
                                { isRegistration && (
                                    <Field name="name">
                                        {({ input, meta }) => (
                                            <div>
                                                <div className={classes.authPageBodyTitle}>
                                                    Имя
                                                </div>
                                                <HCInput {...input} placeholder="Имя" />
                                                {meta.error && meta.submitFailed
                                                && (
                                                    <div className={classes.authPageErrorMsg}>
                                                        {meta.error}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                )}

                                <Field name="email">
                                    {({ input, meta }) => (
                                        <div>
                                            <div className={classes.authPageBodyTitle}>Почта</div>
                                            <HCInput {...input} placeholder="Email" />
                                            {meta.error && meta.submitFailed
                                                && (
                                                    <div className={classes.authPageErrorMsg}>
                                                        {meta.error}
                                                    </div>
                                                )}
                                        </div>
                                    )}
                                </Field>

                                <Field name="password">
                                    {({ input, meta }) => (
                                        <div>
                                            <div className={classes.authPageBodyTitle}>Пароль</div>
                                            <HCInput {...input} type="password" placeholder="Пароль" />
                                            {meta.error && meta.submitFailed
                                                && (
                                                    <div className={classes.authPageErrorMsg}>
                                                        {meta.error}
                                                    </div>
                                                )}
                                        </div>
                                    )}
                                </Field>

                            </div>

                            <div className={classes.authPageButtonsContainer}>
                                {isRegistration
                                    ? (
                                        <div className={classes.authPageAccountButton}>
                                            Есть аккаунт?
                                            <NavLink to={LOGIN_ROUTE}> Войдите!</NavLink>
                                        </div>
                                    )
                                    : (
                                        <div className={classes.authPageAccountButton}>
                                            Нет аккаунта?
                                            <NavLink to={REGISTRATION_ROUTE}> Зарегистрируйся!</NavLink>
                                        </div>
                                    )}
                                <HCButton type="submit" className={classes.authPageEnterButton}>{isRegistration ? 'Регистрация' : 'Войти'}</HCButton>
                            </div>
                        </form>
                    )}
                />
            </div>
        </div>
    );
});

export default AuthPage;