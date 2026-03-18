import React = require('react');
import s from './Loading.module.css';

export const Loading = () => {
    return (
        <div className={s.loader}>
            <div className={`${s.square} ${s.sq1}`}></div>
            <div className={`${s.square} ${s.sq2}`}></div>
            <div className={`${s.square} ${s.sq3}`}></div>
            <div className={`${s.square} ${s.sq4}`}></div>
            <div className={`${s.square} ${s.sq5}`}></div>
            <div className={`${s.square} ${s.sq6}`}></div>
            <div className={`${s.square} ${s.sq7}`}></div>
            <div className={`${s.square} ${s.sq8}`}></div>
            <div className={`${s.square} ${s.sq9}`}></div>
        </div>
    );
};