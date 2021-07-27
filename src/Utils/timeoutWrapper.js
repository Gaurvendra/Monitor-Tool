const timeOutWrapper = (fn, delay, safeMode) => {
    if (safeMode) {
        setTimeout(async () => {
            fn();
        }, delay);
    } else {
        fn();
    }
};

export default timeOutWrapper;