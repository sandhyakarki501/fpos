function formatSearchParams(searchParams) {
  const { sort, isTableOrder, customer } = searchParams;

  let query = "";

  if (sort)
    query = `${query == "" ? "" : query + "&"}sort=${JSON.stringify(sort)}`;

  if (isTableOrder)
    query = `${query == "" ? "" : query + "&"}isTableOrder=true`;

  if (customer) query = `${query == "" ? "" : query + "&"}customer=true`;

  return query;
}

export default formatSearchParams;
