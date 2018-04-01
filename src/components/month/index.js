import { h, Component } from 'preact';
import style from './style.less';

import Weeks from './weeks'
import DatePanel from './datePanel'
import Back from './back'

import moment from 'moment';
import _ from 'lodash'

const months = moment.months();

const MonthScale = {
    transform: 'translatez(60px) scale(1.9)',
    backfaceVisibilty: 'hidden'
}

const CalendarScale = {
    width: "267px",
    transform: 'translatez(60px) scale(0.9)',
    left: 'calc(25% - 200px)',
    top: 'calc(25vh - 100px)'
}

const renderMonth = (month) => {
    const now = moment();
    const year = now.format('YYYY').toString()
    const monthId = months.indexOf(month) + 1
    const daysInMonth = moment(`${year}-${monthId}`, "YYYY-MM").daysInMonth()
    const startOfMonth = moment(`${year}-${monthId}`).startOf('month').format('d');

    return { year, monthId, daysInMonth, startOfMonth }
}

const renderDate = (year, month, day) => {
    const momentStr = `${year}-${month}-${day}`
    const momentDate = moment(momentStr, 'YYYY-MMMM-DD')
    return { momentDate }
}

export default class Month extends Component {
    constructor(props) {
        super(props)
        const { onSelectMonth } = this.props
        this.onSelectMonth = onSelectMonth
    }
    state = {
        year: 0,
        monthId: 0,
        daysInMonth: 0,
        cardBack: false,
        selectedDate: 0,
        momentDate: ''
    }
    toggleCard = () => {
        let cardBack = this.state.cardBack
        this.setState({
            cardBack: !cardBack
        })
    }
    selectDate = (date) => {
        this.setState({
            selectedDate: date
        })
    }
    shouldComponentUpdate(p, s) {
        return p !== this.props || s !== this.state
    }
    componentDidMount() {
        if (this.props.month) {
            const { year, monthId, daysInMonth, startOfMonth } = renderMonth(this.props.month)
            this.setState({ year, monthId, daysInMonth, startOfMonth })
        }

        if (this.props.selectDate !== 0) {
            const { momentDate } = renderDate(this.props.year, this.props.month, this.props.selectDate)
            this.setState({ momentDate })
        }
    }
    render({ month, onSelectMonth, selectedMonth, onBlurChange, eventCycle, events }, { year, daysInMonth, startOfMonth, cardBack, selectedDate }) {
        return (
            <div tabindex="0" onBlur={onBlurChange} className={`${style.container}`} style={(selectedMonth === '') ? CalendarScale : MonthScale}>
                <div onClick={(selectedMonth === '')
                    && onSelectMonth.bind(this, month)}
                    className={`${style.card} ${(cardBack && style.flipped)}`}>
                    <div className={style.front}>
                        <div className={style.monthTitle}>{month}</div>
                        <div className={`${style.content} ${(cardBack && style.contentFlipped)}`}>
                            <div className={style.month}>
                                <Weeks
                                    month={month}
                                    year={year}
                                    start={startOfMonth}
                                    end={daysInMonth}
                                    selectDate={this.selectDate.bind(this)}
                                    selectedDate={selectedDate}
                                    events={events}
                                />
                            </div>
                            {selectedMonth !== '' &&
                                <DatePanel year={year} month={selectedMonth} day={selectedDate} events={events} toggleCard={this.toggleCard.bind(this)} />
                            }
                        </div>
                    </div>
                    <div className={`${style.back}`}>
                        <Back
                            year={year}
                            month={selectedMonth}
                            day={selectedDate}
                            onBack={this.toggleCard.bind(this)}
                            eventCycle={eventCycle}
                            events={events}
                        />
                    </div>
                </div>
            </div>
        );
    }
}