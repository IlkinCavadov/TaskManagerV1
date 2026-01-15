import React, { useEffect } from 'react'

interface useDetectOutsideProps {
    ref: React.RefObject<HTMLElement | null>;
    callback : () => void;
}

function useDetectOutside({ref, callback}: useDetectOutsideProps) {
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
  return ref;
}

export default useDetectOutside