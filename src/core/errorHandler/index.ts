type DataAndError<TData = unknown, TError = string> = [TData, TError];

export const withTryCatch = <TData = unknown, TError = string>(
  promise: Promise<unknown>,
  skipError = false
): Promise<DataAndError<TData, TError>> => {
  return promise
    .then((data) => {
      return [data, null];
    })
    .catch((error) => {
      error = JSON.parse(error);
      const message = error
        ? [error.error, error.reason].join(' ')
        : 'Неизвестная ошибка';
      if (!skipError) {
        alert(message);
      }
      return [null, message];
    }) as Promise<DataAndError<TData, TError>>;
};
