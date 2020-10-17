import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../../../store/action";

export default function Home() {
    const dispatch = useDispatch();
    const { user } = useSelector(({ authReducer }) => authReducer);

    return (
        <>
            <h1>Hello {user?.name}</h1>
            <button onClick={() => dispatch(authAction.logout())}>logout</button>
        </>
    );
}
