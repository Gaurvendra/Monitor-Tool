import React from "react";
import {useSelector} from 'react-redux';
import './loading.css'
import load from "../../Assets/Icons/loading.png";
const Loading = () => {
    const {loading, loadingMessage} = useSelector(state=>state);
    if(!loading) return <></>;
    return (
        <div className="loading d-flex flex-column">
            <img src={load} alt="icon" />
            <h5>
                <i>{loadingMessage}</i>
            </h5>
        </div>
    );
};

export default Loading;
