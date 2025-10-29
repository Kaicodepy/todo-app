
/**
 * 
 * @param {String} elementID 
 */
export const App = ( elementID ) =>{

// cuando la aplicacion aoo se llama   
( ()=>{  
    const app = document.createElement('div');
    app.innerHTML = '<h1>Hola Mundo</h1>';
    document.querySelector(elementID).append(app);  

})();

}