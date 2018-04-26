import React from 'react';
import { connect } from 'react-redux';

import fp from 'lodash/fp';
import u from 'updeep';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const debug = require('debug')('aotds:command');

const grid = 8;



import FireconGroup from './FireconGroup';

class Weaponry extends React.Component {

    constructor(props) {
        super(props);

        this.state = { firecons: [] }
    }

    firecon_weapons = () => {
        let { firecons, weapons } = this.props.weaponry;

        let grouped = fp.groupBy( w => w.firecon_id || 0 )( weapons );

        [ 0, ...firecons.map( f => f.id ) ]
            .filter( id => !grouped[id])
            .forEach( id => grouped[id] = [] )

        debug(grouped);

        return grouped;
    };

    onDragEnd = result => {
        // dropped outside the list
        if (!result.destination) { return; }

        this.props.weapon_firecon( result.draggableId, parseInt( result.destination.droppableId ) );
    }


    render() { 
        let grouped = this.firecon_weapons();

        return <fieldset legend="weaponry">
                <legend>weaponry</legend>

                <DragDropContext onDragEnd={this.onDragEnd}>

    {
        [ 0, ...(this.props.weaponry.firecons.map( f => f.id ) ) ]
            .map( id => 
                <FireconGroup 
                    key={id}
                    firecon_id={ id } weapons={ grouped[id] } /> ) }


            </DragDropContext>

            </fieldset>
    }

} 

import Actions from '../../../store/actions';

export default connect(
    null,
    (dispatch,ownProps) => ({
        weapon_firecon: (weapon_id, firecon_id) => dispatch( Actions.weapon_firecon(
            ownProps.bogey_id, weapon_id, firecon_id
        ) )
    }),
)(Weaponry);
    
                // <fieldset><legend>unassigned</legend>
                //     <div>Beam class 1</div>
                //     <div>Beam class 2</div>
                // </fieldset>

                // <fieldset><legend>firecon 1</legend>
                //     <div>target: <select><option>siduri</option></select></div>
                //     <div>Beam class 1</div>
                // </fieldset>
    //           {this.state.items.map((item, index) => (
    //           ))}