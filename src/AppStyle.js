/**
 * @author Nguyen Minh Dung K63-HUST
 * @description base style for app
*/

/**
 * @description merge multiple style to 1 object
 * @param {*} params all style ex: marginHori, marginVertical...
 * @returns 
 */
function AppStyle(params) {
    let res = Object.assign.apply(Object, Array.prototype.slice.call(arguments, 0));
    return res;
}

function setOverFlowY() {
    return {
        overflow: 'hidden',
        overflowY: 'scroll',
    }
}

function setOverFlowX() {
    return {
        overflow: 'hidden',
        overflowX: 'scroll'
    }
}

function background(value) {
    return {
        background : value
    }
}

function textColor(value) {
    return {
        color: value
    }
}

function width(value) {
    return {
        width: value
    }
}

function height(value) {
    return {
        height: value
    }
}

function radius(value) {
    return {
        borderRadius :value
    }
}

function fitContain(){
    return {
        objectFit: 'contain'
    }
}

function shadow(value) {
    return {
        boxShadow: '0px 0px ' + value + 'px rgba(0, 0, 0, 0.1)'
    }
}

function marginTop(value) {
    return {
        marginTop: value
    }
}

function marginStart(value) {
    return {
        marginLeft: value
    }
}

function margin(value) {
    return {
        marginLeft: value,
        marginTop: value,
        marginRight: value,
        marginBottom: value
    }
}

function padding(value) {
    return {
        paddingTop: value,
        paddingRight: value,
        paddingBottom: value,
        paddingLeft: value
    }
}

function paddingVerti(value) {
    return {
        paddingTop: value,
        paddingBottom: value
    }
}

function paddingTop(value) {
    return {
        paddingTop: value
    }
}

function paddingBottom(value) {
    return {
        paddingBottom: value
    }
}


function paddingHori(value) {
    return {
        paddingRight: value,
        paddingLeft: value
    }
}

function paddingStart(value) {
    return {
        paddingLeft: value
    }
}

function paddingEnd(value) {
    return {
        paddingRight: value
    }
}


function marginEnd(value) {
    return {
        marginRight: value
    }
}

function marginBottom(value) {
    return {
        marginBottom: value
    }
}

function marginHori(value) {
    return {
        marginLeft: value,
        marginRight: value
    }
}

function marginVertical(value) {
    return {
        marginTop: value,
        marginBottom: value
    }
}

function weightItem(value) {
    return {
        flexGrow: value
    }
}

function flexHori() {
    return {
        display: 'flex',
        flexDirection: 'row'
    }
}

function flexVerti() {
    return {
        display: 'flex',
        flexDirection: 'column'
    }
}

function flexCenter() {
    return {
        alignItems: 'center'
    }
}

function flexCenterInParent() {
    return {
        alignItems: 'center',
        justifyContent: 'center'
    }
}

function baseText() {
    return {
        margin: 0
    }
}



function semiBold(size) {
    return AppStyle(baseText(),{
        fontWeight: 500,
        fontStyle: 'normal',
        fontSize: size
    })
}

function bold(size) {
    return AppStyle(baseText(), {
        fontWeight: 600,
        fontStyle: 'normal',
        fontSize: size
    })
}

function regular(size) {
    return AppStyle(baseText(),{
        fontWeight: 400,
        fontStyle: 'normal',
        fontSize: size
    })
}

function textWeight(_weight) {
    return AppStyle(baseText(),{
        fontWeight: _weight,
        fontStyle: 'normal'
    })
}

function border(color) {
    return {
        border: '1px solid ' + color
    }
}
function circleImage(value){
    return {
        width: value,
        height: value,
        borderRadius :value/2

    }
}

export {
    AppStyle,

    // sizing
    width,
    height,
    radius,
    shadow,
    background,

    // margin css
    margin,
    marginTop,
    marginBottom,
    marginHori,
    marginVertical,
    marginStart,
    marginEnd,

    // padding css
    padding,
    paddingHori,
    paddingVerti,
    paddingStart,
    paddingEnd,
    paddingTop,
    paddingBottom,


    // flex-box css
    flexHori,
    flexVerti,
    flexCenter,
    flexCenterInParent,
    weightItem,

    // text
    semiBold,
    bold,
    regular,
    textColor,
    textWeight,

    // border
    border,

    // list utils
    setOverFlowY,
    setOverFlowX,
    //image util
    circleImage,
    fitContain
}