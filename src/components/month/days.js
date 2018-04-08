import { h, Component } from 'preact'
import style from './style.less'
import ReactHintFactory from 'react-hint'
const ReactHint = ReactHintFactory({ createElement: h, Component })

export default class Days extends Component {

    shouldComponentUpdate(props, state) {
        return props.selectedDate !== this.props.selectedDate || state !== this.state || props.day !== typeof Number
    }

    // event.eventDate: "2018-June-9"
    render({ day, month, year, selectDate, selectedDate, events }) {
        const momentStr = `${year}-${month}-${day}`,
            momentStrInEvents = events.find(event => event.eventDate === momentStr),
            eventExists = (momentStrInEvents && momentStrInEvents.eventDate === momentStr)

        const eventsColor = {
            backgroundImage: `radial-gradient(circle at center, ${eventExists && momentStrInEvents.color} 2px, transparent 1px)`
        }

        const renderEventList = () => (
            <div className={style.eventList}>
                {eventExists && events.length > 0 && (events.slice(0, 5).map((event, i) =>
                    event.eventDate === momentStr &&
                    <div style={{ boxShadow: `-2px 0px 0px 0px ${event.color}`, marginBottom: '5px' }}>
                        {event.eventText}
                    </div>
                ))}
            </div>
        )

        return (
            <th
                className={`${(day === selectedDate) && style.selectedDay} ${eventExists && style.eventsExist}`}
                style={eventExists && eventsColor}
                onClick={selectDate.bind(this, day)}
                data-rh={eventExists && renderEventList()}
            >
                {day}
            </th>
        )
    }
}