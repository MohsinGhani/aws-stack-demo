const usePrevious = (useRef, useEffect, value) => {
    // return usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
    // }˝
};


export {
    usePrevious
};
