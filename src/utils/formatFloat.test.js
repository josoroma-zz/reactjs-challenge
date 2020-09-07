import formatFloat from "./formatFloat";

const mockParamValue = 411.21713488;

const mockOutput = 411.22;

test("It should check formatFloat util behavior", () => {
  const output = formatFloat(mockParamValue);
  expect(Number(output)).toStrictEqual(Number(mockOutput));
});
