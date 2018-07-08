app.factory('AppService', function () {
    var objects = {};
   
    var AppService = {
        push: function (id, obj){
            objects[id] = {...obj}
        },
        pull: function (id){
            var result = {};            
            if(id !== null){
                result = {...objects[id]};
                //console.log(objects[id]);
                objects[id] = null;                
            } 
            return result;          
        }        
    }
    return AppService;
})