import {reactLocalStorage} from 'reactjs-localstorage';

reactLocalStorage.setObject('userKeys', {});
reactLocalStorage.setObject('userInfo', {});
reactLocalStorage.setObject('userToken', {});
reactLocalStorage.setObject('hasToken', false);

// reactLocalStorage.get('var', true);
// reactLocalStorage.setObject('var', {'test': 'test'});
// reactLocalStorage.getObject('var');