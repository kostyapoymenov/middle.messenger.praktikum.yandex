export const queryStringify = <D = XMLHttpRequestBodyInit>(data: D): string => {
  if (!data || typeof data !== 'object') {
    return '';
  }
  const params = Object.entries(data).map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key}=${value.join(',')}`;
    }
    return `${key}=${value}`;
  });
  return '?' + params.join('&');
};
