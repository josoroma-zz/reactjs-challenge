import formatNumber from "./formatNumber";

const mockParamValue = "19378102";

const mockOutput = "19,378,102";

test("It should check formatNumber util behavior", () => {
  const output = formatNumber(mockParamValue);
  expect(Number(output)).toStrictEqual(Number(mockOutput));
});
