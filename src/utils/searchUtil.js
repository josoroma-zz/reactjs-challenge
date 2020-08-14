import _filter from "lodash.filter";
import _flow from "lodash.flow";
import _identity from "lodash.identity";
import _values from "lodash.values";
import _join from "lodash.join";
import _toLower from "lodash.tolower";
import _partialRight from "lodash.partialright";
import _includes from "lodash.includes";

function searchUtil(array, substr) {
  return _filter(
    array,
    _flow(
      _identity,
      _values,
      _join,
      _toLower,
      _partialRight(_includes, _toLower(substr))
    )
  );
}

export default searchUtil;
