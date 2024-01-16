const ReadJWTData = (token: string) => {
  if (!token) return undefined;
  const payload = token.split(".")?.[1];
  if (!!payload) {
    return JSON.parse(atob(payload));
  }
};

export default ReadJWTData;
