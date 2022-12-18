
function handleQuery(query: string | string[] | undefined ){
  if(!query){
    return "";
  }
  if( typeof query == "string"){
    return query
  }
  if(Array.isArray(query) && query.length >= 1){
    return query[0];
  }
  return query.toString();
}
function handleQueryArray(query: string | string[] | undefined ){
  if(!query){
    return [];
  }
  if( typeof query == "string"){
    return [query]
  }
  if(Array.isArray(query) && query.length >= 1){
    return query;
  }
  return [];
}

export {handleQuery,handleQueryArray}