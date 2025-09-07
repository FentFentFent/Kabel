import { Element } from '@svgdotjs/svg.js';
import Connection, { Connectable } from '../src/connection';
import eventer, { EventArgs } from '../util/eventer';
import userState from '../util/user-state';
import Field from '../src/field';
import NodeSvg from '../src/nodesvg';
import waitFrames from '../util/wait-anim-frames';
interface ConnectionV {
    conn: Connection,
    el: Element,
    args?: EventArgs
}
interface ConnectionState {
    one: null | ConnectionV,
    two: null | ConnectionV
}


const cState: ConnectionState = {
    one: null,
    two: null
}


function initConnector(el: Element, args?: EventArgs) {
    args = args as {
        connection: Connection,
        node?: NodeSvg,
        field?: Field
    };
    el.on('click', () => {
        const isPrev = args.connection.isPrevious;

        // First click → must NOT be previous
        if (!cState.one) {
            if (isPrev) {
                el.addClass('KabelConnectionBubbleHighlightWrong');
                waitFrames(10, () => {
                    el.removeClass('KabelConnectionBubbleHighlightWrong');
                })
                return;
            }
            cState.one = { conn: args.connection, el, args };
            el.addClass('KabelConnectionBubbleHighlight');
            userState.setState('connecting')
            return;
        }

        // Second click → must be previous
        if (!cState.two && (args?.node !== cState.one?.args?.node)) {
            if (!isPrev) {
                el.addClass('KabelConnectionBubbleHighlightWrong');
                waitFrames(10, () => {
                    el.removeClass('KabelConnectionBubbleHighlightWrong');
                })
                return;
            }
            if (cState.one.conn === args.connection) return; // ignore clicking the same again
            cState.two = { conn: args.connection, el, args };
            el.addClass('KabelConnectionBubbleHighlight');
        }

        // Both are filled → attempt to connect
        if (cState.one && cState.two) {
            if (cState.two.args?.node == cState.one.args?.node || cState.two.args?.node === cState.one?.args?.field?.node) {
                cState.one.el.addClass('KabelConnectionBubbleHighlightWrong');
                cState.two.el.addClass('KabelConnectionBubbleHighlightWrong');
                waitFrames(10, () => {
                    if (!cState) return;
                    if (!cState.one || !cState.two) return;
                    cState.one.el.removeClass('KabelConnectionBubbleHighlightWrong');
                    cState.two.el.removeClass('KabelConnectionBubbleHighlightWrong');
                    cState.one = null;
                    cState.two = null;
                })
                userState.removeState('connecting');
                return;
            }
            const { conn: connA } = cState.one;
            const { conn: connB } = cState.two;

            connA.disconnectTo();
            connB.disconnectFrom();

            connA.to = cState.two.args?.node;
            connB.from = cState.one.args?.node || cState.one.args?.field;

            waitFrames(2, () => {
                if (cState.one?.args?.node) {
                    cState.one.args.node.workspace?.redraw?.();
                } else if (cState.two?.args?.node) {
                    cState.two.args.node.workspace?.redraw?.();
                }
                cState.one = null;
                cState.two = null;
                userState.removeState('connecting');
            });
        }
    });
    return () => {
        el.off('click'); // removes the click listener
    };

}

eventer.registerEvent('k_connectbubble', initConnector);
