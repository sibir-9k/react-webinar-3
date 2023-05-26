import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: []
    }
  }

  async getAllLoad(){
    try {
      const responce = await fetch('api/v1/articles?limit=*')
      const result = await responce.json()
      return result.result.items.length
    } catch (error) {
      console.log(error)
    }
  }

  async load(limit, skip) {
    try {
      const response = await fetch(`api/v1/articles?limit=${limit}&skip=${skip}`);
      const json = await response.json();
      this.setState({
         ...this.getState(),
         list: json.result.items
      }, 'Загружены товары из АПИ');  
    } catch (error) {
      console.log('Ошибка блять запроса!!', error)
    }
  }
}

export default Catalog;
