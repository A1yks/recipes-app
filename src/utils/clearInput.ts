import React from 'react';

function clearInput(setterFunction: React.Dispatch<React.SetStateAction<string>>, timeout = 300) {
    setTimeout(() => {
        setterFunction('');
    }, timeout);
}

export default clearInput;
