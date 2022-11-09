export const space3xReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'GET_DATA_FROM_SPACE3X':
            return action.payload
        default:
            break;
    }

}

