export async function fetchPersons() {
  console.log("Fetching personS");
  const response = await fetch("https://api.lagtinget.ax/api/persons.json");
  return await response.json();
}

export async function fetchPerson(personId) {
  console.log("Fetching person");
  const response = await fetch(
    "https://api.lagtinget.ax/api/persons/" + personId + ".json",
  );
  return await response.json();
}

export async function fetchOrganization(organization) {
  console.log("Fetching Org");
  const response = await fetch(
    "https://api.lagtinget.ax/api/organizations/" + organization + ".json",
  );
  return await response.json();
}

export async function fetchRole(role) {
  console.log("Fetching role");
  const response = await fetch(
    "https://api.lagtinget.ax/api/roles/" + role + ".json",
  );
  return await response.json();
}
