import html from './app.html?raw';

/**
 * 
 * @param {String} elementID 
 */
export const App = ( elementID ) =>{

// cuando la aplicacion aoo se llama   
( ()=>{  
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementID).append(app);  

})();

}