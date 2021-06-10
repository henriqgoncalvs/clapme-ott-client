const parseLongString = (str: string) => {
  return str.length < 60 ? str : str.slice(0, 61) + '...';
};

export default parseLongString;
