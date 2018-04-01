import { h, Component } from 'preact';
import style from './style.less';
import Month from './../month'
import moment from 'moment'

const months = moment.months()

export default class Calendar extends Component {
    constructor(props) {
        super(props)
    }
    render({ onSelectMonth, selectedMonth, eventCycle, events }) {
        return (
            <section>
                <h1 className={style.header} > {moment().format('YYYY')} </h1>
                <div className={style.container}>
                    {months.map(month =>
                        <Month
                            className={style.border}
                            month={month}
                            onSelectMonth={onSelectMonth}
                            selectedMonth={selectedMonth}
                            eventCycle={eventCycle}
                            events={events}
                        />
                    )}
                </div>
            </section>
        );
    }
}
