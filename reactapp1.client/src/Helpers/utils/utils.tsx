function ConvertCategory(category: number): string {
  switch (category) {
    case 1:
      return "Méz";
    // break;

    default:
      return "Méhészeti termékek";
    // break;
  }
}

function ConvertPackaging(packaging: number): string {
  switch (packaging) {
    case 1:
      return "250g";
    // break;
    case 2:
      return "500g";
    // break;

    default:
      return "750g";
    // break;
  }
}

export { ConvertCategory, ConvertPackaging };
