import { useState, useEffect } from "react";

function useDebounce( value, delay ) {
    const [updateValue, setUpdateValue] = useState(value);
    useEffect(() => {
        const hanlder = setTimeout(() => setUpdateValue(value), delay);

        return () => clearTimeout(hanlder);
    }, [value]);
    return updateValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
}

export default useDebounce;