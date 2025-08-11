import { useEffect, useState } from 'react';

// LoadingScreen component - Currently disabled in App.jsx but preserved for future use
// To re-enable: uncomment the import and usage in App.jsx
const LoadingScreen = ({ onComplete }) => {
    const [text, setText] = useState("");
    const fullText = "Let's Create";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.substring(0, index));
            index++;

            if (index > fullText.length) {
                clearInterval(interval);

                setTimeout(() => {
                    onComplete();
                }, 1000);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 text-gray-100 flex flex-col items-center justify-center">
            <div className="mb-4 text-4xl font-mono font-bold text-maindark">
                {text} <span className="animate-blink ml-1"> | </span>
            </div>
        <div className="w-[200px] h-[2px] bg-maingrey rounded relative overflow-hidden">
            <div className="w-[40%] h-full bg-mainteal shadow-[0_0_15px_#3b82f6] animate-loading-bar">
                {" "}
            </div>
        </div>
        </div>
    );
};

export default LoadingScreen;
