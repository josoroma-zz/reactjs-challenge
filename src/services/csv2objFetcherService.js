import _orderBy from "lodash.orderby";
import _zipObject from "lodash.zipobject";

const csv2objFetcherService = (url) => {
  let response = {
    data: [],
    error: "",
    status: 0,
  };

  if (!url) {
    return response;
  }

  return fetch(url).then(async (res) => {
    if (res.status >= 400 && res.status <= 499) {
      // Previous Global approach was:
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
        const item = _zipObject(result[0], result[i]);
        converted.push(item);
      }

      const data = _orderBy(converted, ["NAME"], ["asc"]);

      response.data = data;
      response.error = "";
      response.status = res.status;
    }

    return response;
  });
};

export default csv2objFetcherService;
