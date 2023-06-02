import { useNavigate, NavigateFunction } from 'react-router-dom';
import React, { FC } from 'react';

export let globalNavigate: NavigateFunction;

export const GlobalHistory: FC = () => {
    globalNavigate = useNavigate();

    return null;
};