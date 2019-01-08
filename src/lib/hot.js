import React, {Component} from 'react';

const childs = {};

class Gon extends Component {
    render() {
        return (
            process.env.NODE_ENV === 'development'
                ? <React.Fragment>
                    <span onClick={() => console.log(1)} style={styles.span}> </span>
                    {<childs.p/>}
                </React.Fragment>
                : <childs.p/>
        );
    }
}

const Hot = (p) => {
    childs.p = p;
    return Gon;
};
const styles = {
    span: {
        float: 'left',
        width: 10,
        background: 'green',
        opacity: .2,
        height: 10,
        marginRight: -10,
        cursor: 'pointer',
    }
};

export default Hot;
