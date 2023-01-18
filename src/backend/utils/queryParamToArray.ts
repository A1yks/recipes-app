function queryParamToArray(queryParam?: string, toNumber?: true): number[] | undefined;
function queryParamToArray(queryParam?: string, toNumber?: false): string[] | undefined;
function queryParamToArray(queryParam?: string, toNumber = false) {
    return queryParam?.split(',').map((value) => (toNumber ? +value : value));
}

export default queryParamToArray;
