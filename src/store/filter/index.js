import StoreModule from "../module";

/**
 * Ифнормация о категориях
 */
class FilterCategoryState extends StoreModule {

  initState() {
    return {
      categoryList: [],
      waiting: false,
    }
  }

  async getCategoryFilter() {
    this.setState({
        ...this.getState(),
        waiting: true
    });

    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const resultJson = await response.json();
    // console.log(resultJson)
    this.setState({
      ...this.getState(),
      categoryList: resultJson.result.items,
      waiting: false
    });
  }
}

export default FilterCategoryState;
