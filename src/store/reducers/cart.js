const  initialstate={
    product:[]
};

const cardReducer = (state = initialstate, action) =>{
    switch(action.type){
        case "product_add_cart":
            return{
                ...state,
                product:[...state.product,action.product]
            };
            default:
                return state;

    }
};


export default cardReducer;