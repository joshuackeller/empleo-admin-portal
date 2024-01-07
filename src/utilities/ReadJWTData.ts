const ReadJWTData = (token: string) => {
  const payload = token.split(".")?.[1];
  if (!!payload) {
    return JSON.parse(atob(payload));
  }
};

export default ReadJWTData;
