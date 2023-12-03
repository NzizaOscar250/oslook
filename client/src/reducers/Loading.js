export default function Loading(state=true,action){

    switch (action.type) {
        case 'Not Loading':            
            return action.payload;
        default:
            return state;
          
    }

}