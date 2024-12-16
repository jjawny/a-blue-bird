type DebouncedFunction<T extends (...args: any[]) => Promise<any>> = {
  (...args: Parameters<T>): Promise<ReturnType<T>>;
  cancel: () => void;
};

export const debounce = <T extends (...args: any[]) => Promise<any>>(func: T, wait: number): DebouncedFunction<T> => {
  let timeout: NodeJS.Timeout;

  const debouncedFunc: DebouncedFunction<T> = (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise((resolve, reject) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args)
          .then(resolve)
          .catch(reject);
      }, wait);
    });
  };

  debouncedFunc.cancel = () => {
    clearTimeout(timeout); // Clears the timeout to prevent the function from being called
  };

  return debouncedFunc;
};
