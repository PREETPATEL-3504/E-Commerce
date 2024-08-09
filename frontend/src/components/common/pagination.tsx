export const paginate = (items: any, itemsPerPage: any, currentPage: any) => {
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  return items.slice(start, end);
};

export const getPageCount = (items: any, itemsPerPage: any) => {
  return Math.ceil(items.length / itemsPerPage);
};
