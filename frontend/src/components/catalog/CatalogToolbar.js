import SearchProductsInput from "../common/SearchProductsInput";

const CatalogToolbar = ({ search, setSearch, onAdd }) => {
  return (
    <>
      <SearchProductsInput search={search} setSearch={setSearch} onAdd={onAdd} />       
    </>
  );
};

export default CatalogToolbar;