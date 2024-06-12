async function GetRootLayoutData() {
  const response = await fetch("/api/user");
  const data = await response.json();
  if (response.ok) {
    console.log(data);
    return data;
  }
}

export { GetRootLayoutData };
