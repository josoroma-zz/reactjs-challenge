import _orderBy from "lodash.orderby";
import _zipObject from "lodash.zipobject";

const csv2objFetcherService = (url = "") =>
  fetch(url).then(async (res) => {
    let response = {
      data: [],
      error: "",
      status: 0,
    };

    if (res.status >= 400 && res.status <= 599) {
      // Old approach was: `throw new Error("API Client Error");`
      // history.replace(history.location.pathname, {
      //   errorStatusCode: res.status,
      // });
      response.data = [];
      response.error = res.statusText;
      response.status = res.status;
    }

    if (res.status === 200) {
      const result = await res.json();
      let converted = [];

      // CSV Respose to Object
      for (let i = 1; i < result.length; i++) {
        converted.push(_zipObject(result[0], result[i]));
      }

      const data = _orderBy(converted, ["NAME"], ["asc"]);

      response.data = data;
      response.error = "";
      response.status = res.status;
    }

    return response;
  });

export default csv2objFetcherService;
