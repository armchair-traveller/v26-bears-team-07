export async function query(secret, { query, variables = {} }) {
  /** Fauna GQL query utility for browser. Wraps your GraphQL query and returns response.*/
  const result = await fetch("https://graphql.fauna.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret}`,
      "X-Schema-Preview": "partial-update-mutation",
    },
    body: JSON.stringify({ query, variables }),
  }).then((response) => response.json());

  // You can handle errors here if needed
  //    They'll be on result.errors
  if (process.env.NODE_ENV == "development") {
    console.log(result);
  }

  return result.data;
}

export function optProps(obj) {
  /** Utility that creates optional GQL fields for a query.
   * Accepts an object containing fields and their strings.
   * Creates fields only if its str is non-empty.
   * It's only suited for String types at the moment, but can be adjusted to check other types later.
   */
  var str = "";
  for (const [key, value] of Object.entries(obj)) {
    if (value) str += `\n${key}: "${value}"`;
  }
  return str;
}
