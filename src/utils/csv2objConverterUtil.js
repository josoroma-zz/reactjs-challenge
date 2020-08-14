function csv2objConverterUtil(csv) {
  let lines = "";
  for (let i = 0; i < csv.length; i++) {
    lines += `${csv[i].toString()}\n`;
  }

  const stringLines = lines.split("\n");

  const result = [];

  const headers = stringLines[0].split(",");

  for (let i = 1; i < stringLines.length; i++) {
    let obj = {};
    let currentline = stringLines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  return result;
}

export default csv2objConverterUtil;
