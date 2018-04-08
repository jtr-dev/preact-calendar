import { h, Component } from 'preact'
import style from './style.less'
import _ from 'lodash'
import moment from 'moment'

export default class Back extends Component {

    state = {
        newEvents: [],
        newEvent: false,
        event: { color: '#00ffff', eventText: '', eventDate: '' }
    }
    shouldComponentUpdate(p, s) {
        // imo: this should be default
        return p !== this.props || s !== this.state || s.event !== this.state.event
    }
    componentDidUpdate() {

    }
    addNewEvent = (date) => {
        this.setState(prevState => ({
            event: { ...prevState.event, eventDate: `${date}` },
            newEvent: !this.state.newEvent
        }))
    }
    handleEventChange = (e) => {
        this.setState(prevState => ({
            event: {
                ...prevState.event,
                eventText: `${e.target.value}`
            }
        }))
    }
    handleEventColorChange = (e) => {
        this.setState(prevState => ({
            event: {
                ...prevState.event,
                color: `${e.target.value}`
            }
        }))
    }
    submitForm = (e) => {
        e.preventDefault();
        this.props.eventCycle([this.state.event])
        this.setState({
            newEvent: !this.state.newEvent,
            event: {
                eventText: '',
                color: this.state.event.color
            }
        })
    }

    render({ year, month, day, onBack, events }, { newEvent, event }) {
        const momentStr = `${year}-${month}-${day}`,
            momentDate = moment(momentStr, 'YYYY-MMMM-DD'),
            date = momentDate.format('dddd').toString();

        return (
            <div className={style.content}>
                <a onClick={onBack}><i className="fa fa-mail-reply edit" aria-hidden="true"></i></a>
                <div style={{ textAlign: 'center', marginTop: '-20px' }}>
                    {date}, {month} {day}
                </div>
                <hr />

                <div>
                    {events.length > 0 && (events.map(event =>
                        event.eventDate === momentStr &&
                        <div style={{ boxShadow: `-2px 0px 0px 0px ${event.color}`, marginBottom: '5px' }}>
                            {event.eventText}
                        </div>
                    ))}
                </div>

                <button onClick={this.addNewEvent.bind(this, momentStr)} className={`${style.btn}`} href="javascript:void();"><i className="fa fa-plus"></i> Add Event </button>

                <div>
                    {(newEvent &&
                        <form onSubmit={this.submitForm}>
                            <div>
                                <input type="text"
                                    value={event.eventText}
                                    onChange={this.handleEventChange}
                                    className={style.eventText}
                                />
                            </div>
                            <div>
                                <input type="color"
                                    value={event.color}
                                    onChange={this.handleEventColorChange}
                                    className={style.eventText}
                                />
                            </div>

                            <div>
                                <button className={style.btn} onSubmit={this.submitForm} onClick={this.submitForm}>Submit</button>
                            </div>
                        </form>
                    )}
                </div>

            </div>
        )
    }
}