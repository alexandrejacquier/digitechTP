import React, { Component } from 'react';
import { connect } from 'react-redux';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

import { getFormulairesBySociete } from '../actions';

//import CustomDateTick from '../components/customDateTick.js';

 class SocieteGraphContainer extends Component {

    constructor(props){
        super(props);

        this.state = {
            toShow: {
                CA: true,
                FA: true,
                CS: true,
                FG: true,
                AF: true,
                EBITDA: true,
                CCT: true,
                CLT: true,
                CF: true,
                Inv: true
            }
        }
    }

    componentWillMount(){
        //this.props.dispatch(getFormulairesBySociete(this.props.match.params.societeId));
        //console.log("Searching for formulaire: "+this.props.match.params.id);
        this.props.dispatch(getFormulairesBySociete(this.props.match.params.id)).then(() => {
            //console.log("Formulaires obtenus pour la société: "+ this.props.match.params.id);
        });
        
    }

    componentWillReceiveProps(nextProps){
        //console.log('next props: ' + JSON.stringify(nextProps));

        let tmpData = nextProps.formulaires;
        //console.log('new data: ' + JSON.stringify(tmpData));

        for(let elem in tmpData)
        {
            tmpData[elem].date = new Date(tmpData[elem].date).toLocaleDateString();
        }

        this.setState({...this.state, data:tmpData});
    }

    handleFieldSelect(e){
        /*this.setState({
            toShow: {
                CA: true,
                FA: true,
                CS: true,
                FG: true,
                AF: true,
                EBITDA: false,
                CCT: false,
                CLT: false,
                CF: false,
                Inv: false
            }
        })*/

        /*for(elem in this.state.toShow){

        }*/

        let tmpState = this.state;

        tmpState.toShow[e.target.name] = e.target.checked;

        //console.log(tmpState);

        this.setState(tmpState);
    }

    renderFieldSelect(){

        let formFields = Object.keys(this.state.toShow).map(elem => {
            return(
                <div className="CheckboxesGraphElem" key={elem}>
                    <label>{elem} : </label>
                    <input
                    type="checkbox"
                    name={elem}
                    checked={this.state.toShow[elem]}
                    onChange={(e) => this.handleFieldSelect(e)}
                    />
                </div>
            );
        })

        return(
            <div className="CheckboxesGraph">
                {formFields}
            </div>
        );
    }

    renderGraph(){

        const linesColor = {
            CA: '#800000',
            FA: '#000075',
            CS: '#f032e6',
            FG: '#3cb44b',
            AF: '#ffe119',
            EBITDA: '#42d4f4',
            CCT: '#f58231',
            CLT: '#0000ff',
            CF: '#000000',
            Inv: '#ff0000'
        }

        const renderLines = Object.keys(this.state.toShow).map((elem, i) => {
            return(
                this.state.toShow[elem] ? 
                    <Line key={i} type="monotone" dataKey={elem} stroke={linesColor[elem]} />
                :
                    null
            );
        })

        return(
            this.props.formulaires ?
                <div className="FormGraph">
                    <ResponsiveContainer width="100%" aspect={2.2}>
                        <LineChart width={600} height={300} data={this.state.data}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="date" />
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            {renderLines}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            : null
        );
    }

    render() {
        return (
            <div className="GraphContainer">
                {this.renderFieldSelect()}
                {this.renderGraph()}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        formulaires: state.formulaires.list
    }
}

export default connect(mapStateToProps)(SocieteGraphContainer);