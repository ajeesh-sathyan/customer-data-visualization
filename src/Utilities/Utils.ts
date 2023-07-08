export const convertCSVToJson = (csvText: string) => {
  const lines = [...csvText.split("\n").slice(0, -1)];
  const headers = lines[0].split(",");

  const data = [];
  debugger;
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    const entry: any = {};
    for (let j = 0; j < headers.length; j++) {
      const value = values[j];
      entry[headers[j].trim()] = /^\d+$/.test(value)
        ? Number(value)
        : value.trim();
    }
    data.push(entry);
  }

  return data;
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getRange = (val: number): string => {
  if (val >= 10000 && val <= 25000) {
    return "10000-25000";
  } else if (val >= 26000 && val <= 50000) {
    return "26000-50000";
  } else if (val >= 51000 && val <= 75000) {
    return "51000-75000";
  } else if (val >= 76000 && val <= 100000) {
    return "val-100000";
  } else if (val > 100000) {
    return "100000+";
  }
  return "";
};
