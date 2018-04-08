import { h, Component } from 'preact'
import style from './style.less'
import moment from 'moment'

export default class DatePanel extends Component {

    state = {
        year: 2018,
        month: '',
        date: '',
        day: ''
    }

    shouldComponentUpdate(props, state) {
        return props !== this.props
    }

    componentDidUpdate() {

    }

    render({ year, month, day, events, toggleCard }) {

        const momentStr = `${year}-${month}-${day}`,
            momentDate = moment(momentStr, 'YYYY-MMMM-DD'),
            momentStrInEvents = events.find(event => event.eventDate === momentStr),
            eventExists = (momentStrInEvents && momentStrInEvents.eventDate === momentStr)

        return ((day === 0) ? (
            <div className={style.date}>
                <div className={style.datecont}>
                    <div className={style.dateCont}> {moment().format('DD').toString()} </div>
                    <div className={style.dayCont}> {moment().format('dddd').toString()} </div>
                    <div className={style.monthCont}> {moment().format('MMMM').toString()} / {moment().format('YYYY').toString()}</div>
                </div>
            </div>
        ) : (
                <div className={style.date}>
                    <div className={style.datecont}>
                        <div className={style.dateCont}> {day} </div>
                        <div className={style.dayCont}> {momentDate.format('dddd').toString()} </div>
                        <div className={style.monthCont}>
                            {month} / {year}
                        </div>
                        <a onClick={toggleCard}><i className="fa fa-pencil edit" aria-hidden="true"></i></a>
                    </div>
                </div>
            )
        )
    }
} 