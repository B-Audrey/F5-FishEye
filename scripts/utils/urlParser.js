export const urlParser = () => {
    const outputParams = {}
    const paramsSearcher = new URLSearchParams(window.location.search);
    const paramsEntries = [...paramsSearcher.entries()];
    for(const[key, value] of paramsEntries) {
      outputParams[key] = value;
    }
    //parse data as needed
    outputParams.id ? outputParams.id = +outputParams.id : null; //if id is in params parse, else, null
    return outputParams
}