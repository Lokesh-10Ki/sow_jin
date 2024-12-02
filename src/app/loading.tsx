'use client';
import React from 'react';

const LoadingPage: React.FC = () => {
    return (
        <>
            <div className="al w-screen h-screen top-0 left-0 absolute flex items-center justify-center">
                <div className="al__bg w-full h-full"></div>
                <img className="al__img absolute" src="/loading.gif" alt="Loading...." width="100px" height="100px" />
            </div>

            <style jsx>{`
                .al {
                    z-index: 1005;
                }
                .al__bg {
                    opacity: 0.5;
                }
                .al__img {
                    width: 100px;
                    height: 100px;
                    position: relative; /* Make sure it's relative to the centered parent */
                }
            `}</style>
        </>
    );
};

export default LoadingPage;
