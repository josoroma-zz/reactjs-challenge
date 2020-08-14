/**
 * Attempts:
 *   (1) import { default as converterService } from "../utils/csv2objConverterUtil";
 *   (2) import * as converterService from "papaparse";
 *   (3) import zipObject from "lodash.zipobject";
 */
import _orderBy from "lodash.orderby";
import _zipObject from "lodash.zipobject";

const csv2objConverterService = (url: "") =>
  fetch(url).then(async (res) => {
    const result = await res.json();

    let converted = [];
    for (let i = 1; i < result.length; i++) {
      converted.push(_zipObject(result[0], result[i]));
    }

    const data = _orderBy(converted, ["NAME"], ["asc"]);

    const response = {
      data: res.status === 200 ? data : null,
      status: res.status,
    };

    return response;
  });

export default csv2objConverterService;
