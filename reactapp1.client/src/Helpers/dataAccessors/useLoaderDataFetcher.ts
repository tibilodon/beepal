async function GetRootLayoutData() {
  const response = await fetch("/api/user");
  const data = await response.json();
  if (response.ok) {
    return data;
  }
}

export { GetRootLayoutData };
