"use client";

import React from 'react';

interface GlobalErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

const GlobalError: React.FC<GlobalErrorProps> = ({ error, reset }) => {
    return (
        <html>
            <body>
                <h2>Something went wrong!</h2>
                <button onClick={reset}>Try again</button>
            </body>
        </html>
    );
};

export default GlobalError;