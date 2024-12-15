export const debounce = <T extends (...args: any[]) => Promise<any>>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    return new Promise((resolve, reject) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args)
          .then(resolve)
          .catch(reject);
      }, wait);
    });
  };
};
