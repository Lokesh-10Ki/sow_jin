"use client";

import React from 'react';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
    return (
        <div>
            <h2>Something went wrong!</h2>
            <button onClick={reset}>Try again</button>
        </div>
    );
};

export default Error;